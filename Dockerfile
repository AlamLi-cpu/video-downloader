FROM caddy:2 AS caddy
FROM ghcr.io/alexta69/metube:latest

# Keep upstream MeTube and its yt-dlp/FFmpeg runtime; add a reverse proxy.
COPY --from=caddy /usr/bin/caddy /usr/local/bin/caddy
COPY Caddyfile /etc/caddy/Caddyfile
COPY start.py /opt/render/start.py
COPY zh-cn.js localize.py /opt/render/
RUN python3 /opt/render/localize.py

ENV PORT=10000 \
    MAX_CONCURRENT_DOWNLOADS=1 \
    DEFAULT_OPTION_PLAYLIST_ITEM_LIMIT=1 \
    ALLOW_YTDL_OPTIONS_OVERRIDES=false \
    ALLOW_PRIVATE_ADDRESSES=false \
    DOWNLOAD_DIRS_INDEXABLE=false

EXPOSE 10000
HEALTHCHECK --interval=30s --timeout=5s --start-period=90s --retries=3 \
    CMD curl --fail --silent "http://127.0.0.1:${PORT}/healthz" || exit 1
ENTRYPOINT ["/usr/bin/tini", "-g", "--", "python3", "/opt/render/start.py"]
