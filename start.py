"""Supervise MeTube and its HTTP proxy in one Render container."""

import os
import signal
import subprocess
import sys
import time
import urllib.error
import urllib.request


def checked_environment(source):
    """Validate the public port before either server is started."""
    env = dict(source)
    port = env.get("PORT", "10000")
    if not port.isascii() or not port.isdigit() or not 1024 <= int(port) <= 65535:
        raise ValueError("PORT must be an integer from 1024 through 65535")
    if int(port) in (8081, 18012, 18013, 19099):
        raise ValueError("PORT conflicts with the internal service or a Render reserved port")
    env["PORT"] = str(int(port))
    return env


def stop_children(children):
    # Kill complete process groups: upstream MeTube starts background helpers.
    for child in children:
        try:
            os.killpg(child.pid, signal.SIGTERM)
        except ProcessLookupError:
            pass
    deadline = time.monotonic() + 8
    for child in children:
        try:
            child.wait(timeout=max(0.01, deadline - time.monotonic()))
        except subprocess.TimeoutExpired:
            pass
    # The group can outlive its leader, so always attempt final group cleanup.
    for child in children:
        try:
            os.killpg(child.pid, signal.SIGKILL)
        except ProcessLookupError:
            pass
        child.wait()


def main():
    try:
        env = checked_environment(os.environ)
    except ValueError as error:
        print(f"Configuration error: {error}", file=sys.stderr, flush=True)
        return 2

    children = []
    stopping = False

    def request_stop(_signum, _frame):
        nonlocal stopping
        stopping = True

    signal.signal(signal.SIGTERM, request_stop)
    signal.signal(signal.SIGINT, request_stop)
    try:
        subprocess.run(["caddy", "validate", "--config", "/etc/caddy/Caddyfile",
                        "--adapter", "caddyfile"], env=env, check=True)
        backend_env = dict(env)
        # Enforce loopback-only backend: the proxy is the only public listener.
        backend_env.update(HOST="127.0.0.1", PORT="8081", HTTPS="false",
                           URL_PREFIX="/", PUBLIC_HOST_URL="download/",
                           PUBLIC_HOST_AUDIO_URL="audio_download/",
                           ALLOW_YTDL_OPTIONS_OVERRIDES="false",
                           ALLOW_PRIVATE_ADDRESSES="false",
                           DOWNLOAD_DIRS_INDEXABLE="false")
        # MeTube/yt-dlp never need the web-login credentials.
        backend_env.pop("APP_USERNAME", None)
        backend_env.pop("APP_PASSWORD_HASH", None)
        backend = subprocess.Popen(["/app/docker-entrypoint.sh"], cwd="/app",
                                   env=backend_env, start_new_session=True)
        children.append(backend)

        # Do not advertise a healthy public endpoint before MeTube can answer.
        ready = False
        opener = urllib.request.build_opener(urllib.request.ProxyHandler({}))
        deadline = time.monotonic() + 90
        while not stopping and time.monotonic() < deadline and backend.poll() is None:
            try:
                with opener.open("http://127.0.0.1:8081/", timeout=2) as response:
                    ready = response.status == 200
                if ready:
                    break
            except (urllib.error.URLError, TimeoutError, OSError):
                pass
            time.sleep(0.5)
        if stopping:
            return 0
        if not ready:
            print("MeTube did not become ready within 90 seconds", file=sys.stderr, flush=True)
            return 1

        proxy = subprocess.Popen(["caddy", "run", "--config", "/etc/caddy/Caddyfile",
                                  "--adapter", "caddyfile"], env=env, start_new_session=True)
        children.append(proxy)
        print("Video downloader is starting", flush=True)
        while not stopping:
            for name, child in (("MeTube", backend), ("Caddy", proxy)):
                if child.poll() is not None:
                    print(f"{name} exited; stopping container", file=sys.stderr, flush=True)
                    return 1
            time.sleep(0.5)
        return 0
    except (OSError, subprocess.CalledProcessError) as error:
        print(f"Startup failed: {type(error).__name__}", file=sys.stderr, flush=True)
        return 1
    finally:
        stop_children(children)


if __name__ == "__main__":
    sys.exit(main())
