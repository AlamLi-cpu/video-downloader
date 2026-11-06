"""Use the public mobile share page with a fresh, anonymous site session."""
import json
import re

from yt_dlp.extractor.tiktok import DouyinIE
from yt_dlp.utils import ExtractorError


class DouyinGuestIE(DouyinIE, plugin_name='anonymous_share'):
    _MOBILE_HEADERS = {
        'User-Agent': 'Mozilla/5.0 (iPhone; CPU iPhone OS 17_2 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) EdgiOS/121.0.2277.107 Version/17.0 Mobile/15E148 Safari/604.1',
        'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8',
        'Accept-Language': 'zh-CN,zh;q=0.9',
        'Referer': 'https://www.douyin.com/',
    }

    @staticmethod
    def _share_item(html, video_id):
        match = re.search(r'window\._ROUTER_DATA\s*=\s*(.*?)</script>', html, re.S)
        if not match:
            return None
        try:
            data = json.loads(match.group(1).strip().rstrip(';'))
        except (ValueError, TypeError):
            return None
        for page in (data.get('loaderData') or {}).values():
            if not isinstance(page, dict):
                continue
            for item in (page.get('videoInfoRes') or {}).get('item_list', []):
                if str(item.get('aweme_id')) == video_id and item.get('video'):
                    return item
        return None

    def _real_extract(self, url):
        video_id = self._match_id(url)
        self._download_webpage('https://www.iesdouyin.com/', video_id,
                               note='建立抖音匿名访问会话', headers=self._MOBILE_HEADERS)
        for attempt in range(2):
            html = self._download_webpage(
                f'https://www.iesdouyin.com/share/video/{video_id}/', video_id,
                note='读取抖音公开视频信息', headers=self._MOBILE_HEADERS)
            item = self._share_item(html, video_id)
            if item:
                video = item['video']
                addresses = (video.get('play_addr') or {}).get('url_list') or []
                formats = [{'url': address, 'format_id': f'share-{index}', 'ext': 'mp4',
                            'width': video.get('width'), 'height': video.get('height')}
                           for index, address in enumerate(addresses)
                           if isinstance(address, str) and address.startswith(('https://', 'http://'))]
                if not formats:
                    continue
                return {'id': video_id, 'title': item.get('desc') or f'抖音视频 {video_id}',
                        'uploader': (item.get('author') or {}).get('nickname'),
                        'duration': (video.get('duration') or 0) / 1000,
                        'formats': formats, 'http_headers': self._MOBILE_HEADERS}
        raise ExtractorError('抖音分享页没有返回可下载的视频信息，可能受平台访问限制；请稍后重试。', expected=True)
