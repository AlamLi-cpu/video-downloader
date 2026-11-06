# 个人视频下载网站 · Render 免费部署包

MeTube 提供网页和 yt-dlp 下载能力，Caddy 为网页、API、视频文件和 Cookie 上传提供统一密码保护。只有 `/healthz` 不需要登录，返回固定的 `ok`。未配置有效用户名和密码哈希时，服务拒绝启动。

本文件夹是待部署源码，**并不代表已经上线**。抖音、B 站在 yt-dlp 的支持列表中，但具体视频可能需要账号 Cookie，也可能受云服务器 IP、地区或平台风控影响，必须上线后分别实测。

## 部署

1. 将本文件夹内容作为一个 GitHub 仓库的根目录上传，保留 `Dockerfile`、`Caddyfile`、`start.py` 和 `render.yaml`。
2. 在本机安装了 Docker 的终端运行 `docker run --rm -it caddy:2 caddy hash-password`。交互输入一个专用于本网站的强密码，保存输出的完整 bcrypt 哈希（以 `$2` 开头）。不要把密码或 Cookie 提交到仓库。
3. Render → New → Blueprint → 选择该仓库。配置两个必填值：`APP_USERNAME`（3–64 位英文字母、数字、下划线或短横线）和 `APP_PASSWORD_HASH`（完整 bcrypt 哈希，成本 10–14；Caddy 默认输出符合要求）。
4. 确认计划为 **Free / $0**，再部署。若账户要求绑卡或免费选项不可用，先停止，不切换到付费套餐。
5. 等状态为 Live，打开 Render 提供的 **HTTPS** 地址。浏览器登录框输入第 3 步用户名和第 2 步原始密码。哈希仅放在 Render 环境变量中，不能用于登录。
6. 先分别测试一条较短的 B 站视频和抖音视频；完成后点击下载到本机。不要在网页运行内核更新，更新时重新构建服务即可。

也可 New → Web Service → Git 仓库 → Docker 手工部署：地区 Singapore（若不可选，用任一可用免费地区）、计划 Free、端口环境变量 `PORT=10000`、健康检查 `/healthz`，并填入上述两项认证环境变量。

## 验收

- 未登录访问首页、`/download/` 和 API 应返回 HTTP 401；`/healthz` 返回 200。
- 正确密码能打开页面并下载；错误密码无法访问。
- 下载任务完成后，文件能保存到本机，并可正常播放。
- Render 显示 Free，未创建付费磁盘或数据库。

## 免费版实际限制

- Render Free 为 512 MB 内存、0.1 CPU；默认只运行一个下载，播放列表默认只取一项。优先试短视频，避免转码和大批量任务。
- 15 分钟无访问会休眠；重启、重新部署或休眠会清空下载文件、历史和上传 Cookie。及时保存到本机，需要时重新配置 Cookie。
- 流量额度与下载消耗受 Render 账户限制，大量外发流量可能被暂停。此包未添加付费资源，也未实现自动保活。
- 登录信息属于同一个个人账户；能登录的人可以看到本实例的下载及配置。

## 构建与维护

`Dockerfile` 使用官方 `caddy:2` 和项目官方 `ghcr.io/alexta69/metube:latest` 镜像。重新构建会获取这些标签当时的内容；成功验收后可以将镜像标签替换为对应 SHA256 digest 固定版本。

`start.py` 在启动前验证认证和端口配置，验证 Caddy 配置，等待 MeTube 就绪后才启动公共入口。MeTube 只监听 `127.0.0.1:8081`。任一主进程退出或收到停止信号，监督程序会清理两个进程组。

当前交付已通过 Python 语法检查、10 项有效/无效认证与端口配置检查，以及 UTF-8 无 BOM 检查。此 Windows 环境未检测到 Docker，也没有 YAML 解析库，尚未完成 Caddy 配置运行验证、完整 Blueprint 校验、镜像构建、云端部署或平台下载测试。

来源：[MeTube](https://github.com/alexta69/metube)、[yt-dlp 平台列表](https://github.com/yt-dlp/yt-dlp/blob/master/supportedsites.md)、[Caddy 认证](https://caddyserver.com/docs/caddyfile/directives/basic_auth)、[Render 免费限制](https://render.com/docs/free)、[Render Blueprint](https://render.com/docs/blueprint-spec)。
