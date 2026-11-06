(() => {
  'use strict';
  const dictionary = {
    'MeTube': '视频下载站',
    'Enter video, channel, or playlist URL': '粘贴视频、频道或播放列表链接',
    'Download': '下载', 'Subscribe': '订阅', 'Download or subscribe': '下载或订阅',
    'More download actions': '更多下载操作', 'Browse…': '浏览…', 'Browse...': '浏览…',
    'Type': '类型', 'Video': '视频', 'Audio': '音频', 'Subtitles': '字幕', 'Captions': '字幕',
    'Thumbnail': '封面', 'Thumbnails': '封面', 'Codec': '编码', 'Format': '格式',
    'Quality': '画质', 'Auto': '自动', 'Best': '最佳', 'Worst': '最低',
    'Default': '默认', 'Original': '原始', 'None': '无', 'All': '全部',
    'Advanced Options': '高级选项', 'Downloading': '正在下载', 'Completed': '已完成',
    'Subscriptions': '订阅列表', 'Cancel selected': '取消选中任务',
    'Download selected': '下载选中项', 'Download Selected': '下载选中项',
    'Clear selected': '清除选中项', 'Clear completed': '清除已完成',
    'Clear failed': '清除失败项', 'Retry failed': '重试失败项',
    'Newest first': '最新优先', 'Oldest first': '最早优先',
    'Speed': '速度', 'ETA': '剩余时间', 'File Size': '文件大小',
    'Downloaded': '下载时间', 'Codec / Format': '编码 / 格式', 'Status': '状态',
    'Actions': '操作', 'Name': '名称', 'Title': '标题', 'URL': '链接',
    'Cancel': '取消', 'Close': '关闭', 'Save': '保存', 'Delete': '删除',
    'Remove': '移除', 'Clear': '清除', 'Retry': '重试', 'Pause': '暂停',
    'Resume': '继续', 'Start': '开始', 'Stop': '停止', 'Edit': '编辑',
    'Confirm': '确认', 'Yes': '是', 'No': '否', 'OK': '确定', 'Apply': '应用',
    'Select all': '全选', 'Deselect all': '取消全选', 'Select All': '全选',
    'Copy URL': '复制链接', 'Open URL': '打开链接', 'Open': '打开',
    'Adding...': '正在添加…', 'Canceling...': '正在取消…', 'Subscribing...': '正在订阅…',
    'Loading...': '正在加载…', 'Connecting to server...': '正在连接服务器…',
    'Cancel adding URL': '取消添加链接', 'Light': '浅色', 'Dark': '深色', 'System': '跟随系统',
    'Language': '语言', 'Languages': '语言', 'Tags': '标签', 'Subtitle Source': '字幕来源',
    'Manual': '手动', 'Automatic': '自动', 'Manual only': '仅人工字幕',
    'Auto-generated': '自动生成', 'English': '英语', 'Chinese': '中文',
    'Simplified Chinese': '简体中文', 'Traditional Chinese': '繁体中文',
    'Metadata': '元数据', 'Embed': '嵌入', 'Sidecar': '单独保存',
    'Output': '输出设置', 'Download Folder': '下载文件夹', 'Folder': '文件夹',
    'Custom Filename': '自定义文件名', 'Filename': '文件名', 'Custom Name': '自定义名称',
    'Split Chapters': '按章节拆分', 'Split chapters': '按章节拆分',
    'Clip start': '片段开始时间', 'Clip end': '片段结束时间',
    'Behavior': '任务设置', 'Auto Start': '自动开始', 'Items Limit': '数量上限',
    'Subscription Check (min)': '订阅检查间隔（分钟）',
    'Subscription Title Filter': '订阅标题筛选', 'Optional regex': '可选：正则表达式',
    'Skip members-only subscription videos': '跳过订阅中的会员专属视频',
    'Option Presets': '预设选项', 'Video Password': '视频密码', 'Optional': '选填',
    'Custom yt-dlp Options': '自定义下载选项', 'Tools': '工具',
    'Cookies': '登录凭据', 'Upload Cookies': '上传登录凭据',
    'Replace Cookies': '替换登录凭据', 'Remove uploaded cookies': '删除已上传的登录凭据',
    'Cookies active': '登录凭据已启用', 'No cookies configured': '未配置登录凭据',
    'Bulk Actions': '批量操作', 'Import URLs': '导入链接', 'Export URLs': '导出链接',
    'Copy URLs': '复制链接', 'Import': '导入', 'Export': '导出', 'Copy': '复制',
    'Check now': '立即检查', 'Check Now': '立即检查', 'Last checked': '上次检查',
    'Next check': '下次检查', 'Enabled': '已启用', 'Disabled': '已停用',
    'Enable': '启用', 'Disable': '停用', 'Interval': '间隔',
    'No subscriptions yet.': '暂无订阅。', 'No downloads': '暂无下载任务',
    'No items found': '未找到条目', 'Search': '搜索', 'Search...': '搜索…',
    'Select': '选择', 'Selected': '已选择', 'Pending': '等待中',
    'Queued': '排队中', 'Failed': '失败', 'Error': '错误', 'Success': '成功',
    'Download completed': '下载完成', 'Download failed': '下载失败',
    'e.g. 1:23': '例如：1:23', 'e.g. 3:24': '例如：3:24',
    'Automatically start downloads when added.': '添加任务后自动开始下载。',
    'Maximum number of items to download from a playlist or channel (0 = no limit).': '播放列表或频道的下载数量上限（0 表示不限）。',
    'How often to poll subscriptions for new videos.': '检查订阅更新的时间间隔。',
    'Optional end time. Blank = until end of media.': '可选的结束时间，留空则下载到视频结尾。',
    'Subtitle output format for captions mode.': '字幕模式下的输出格式。',
    'Choose one or more yt-dlp option presets configured on the server (applied in order).': '选择服务器提供的下载预设，可多选并按顺序应用。',
    'For password-protected videos (e.g. Vimeo). Not saved; cleared after adding. Ignored for subscriptions.': '用于需要密码的视频；添加后清空，不保存，也不应用于订阅。',
    'Upload a cookies.txt file from your browser to authenticate restricted or private downloads.': '上传浏览器导出的 cookies.txt，用于有权访问的登录内容。当前为公共站点，请勿上传私人凭据。'
  };
  function translate(value) {
    const key = value.trim().replace(/\s+/g, ' ');
    let result = dictionary[key];
    if (!result) {
      const match = key.match(/^(\d+) (downloading|queued|completed|failed)$/);
      if (match) result = match[1] + ' 个' + ({downloading:'正在下载', queued:'等待中', completed:'已完成', failed:'失败'})[match[2]];
    }
    return result ? value.replace(value.trim(), result) : value;
  }
  // Translate rendered UI only; never change URLs, form values, or downloaded titles.
  function skip(element) {
    return !element || element.closest('script,style,textarea,pre,code,[contenteditable="true"],a[href^="http"],a[href*="download/"]');
  }
  function localize(root) {
    if (root.nodeType === Node.TEXT_NODE) {
      if (!skip(root.parentElement)) { const next=translate(root.nodeValue); if(next!==root.nodeValue) root.nodeValue=next; }
      return;
    }
    if (root.nodeType !== Node.ELEMENT_NODE || skip(root)) return;
    for (const attribute of ['placeholder','title','aria-label','alt']) {
      if (root.hasAttribute(attribute)) {
        const value=root.getAttribute(attribute), next=translate(value);
        if(value!==next) root.setAttribute(attribute,next);
      }
    }
    for (const child of root.childNodes) localize(child);
  }
  document.documentElement.lang='zh-CN';
  document.title='视频下载站';
  const options={subtree:true,childList:true,characterData:true,attributes:true,attributeFilter:['placeholder','title','aria-label','alt']};
  const observer=new MutationObserver(records=>{
    observer.disconnect();
    for(const record of records) {
      if(record.type==='childList') for(const node of record.addedNodes) localize(node);
      else localize(record.target);
    }
    observer.observe(document.body,options);
  });
  localize(document.body);
  observer.observe(document.body,options);
})();
