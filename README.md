# 视频下载网站 · Render 免费部署

MeTube 提供网页下载功能，Caddy 作为反向代理。按站点所有者要求，所有业务页面无需用户名和密码即可访问。

任何访问者均可使用同一个实例，并查看下载记录和文件。请勿上传私人 Cookie。默认单个下载任务，禁用私网地址访问及自定义 yt-dlp 参数覆盖。

部署：将本仓库导入 Render，使用 Docker，选择 Free，设置 PORT=10000，健康检查路径 /healthz。也可使用 render.yaml 创建 Blueprint。不需要认证环境变量。

免费实例休眠或重启会丢失下载文件，请及时保存到电脑。平台解析受 Cookie、服务器 IP 和平台规则影响。

来源：https://github.com/alexta69/metube
