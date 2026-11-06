from pathlib import Path
import shutil

pages = list(Path('/app/ui/dist/metube').rglob('index.html'))
if not pages:
    raise RuntimeError('MeTube index.html not found')
for page in pages:
    html = page.read_text()
    html = html.replace('lang="en"', 'lang="zh-CN"')
    html = html.replace('<title>MeTube</title>', '<title>视频下载站</title>')
    html = html.replace('</body>', '<script src="share-url.js" defer></script><script src="zh-cn.js" defer></script></body>')
    page.write_text(html)
    shutil.copyfile('/opt/render/zh-cn.js', page.parent / 'zh-cn.js')
    shutil.copyfile('/opt/render/share-url.js', page.parent / 'share-url.js')
