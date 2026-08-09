# 变更日志

## 2026-08-09

### 初版
- 个人办公工作台单文件 HTML：待办/灵感/项目/复盘四模块
- 蓝绿商务风（teal/cyan）
- 部署 CloudStudio 沙盒（短期）

### 长期托管
- htmlcode.fun 验证需付费（402），弃用
- 转 GitHub Pages 永久托管（仓库 zhangshujuan1314/office-workbench，public，main 分支根目录）
- gh CLI 安装：winget 不可用 → Python + certifi 调 GitHub API → gh-proxy.com 镜像下载 gh release（国内 CDN 超时解决方案）

### UI 改 Claude 风格
- 配色：teal/cyan 蓝绿 → 赭石橙 #D97757 + 暖白 #FAF9F5 + 暖灰 #E8E5DD（31 处颜色替换）
- 字体：标题加衬线 Georgia + 宋体回退

### 加图画
- 3 个空状态插画（待办剪贴板/灵感灯泡/项目文件夹）
- 页头 banner：抽象几何 → 咖啡杯+清单+笔办公场景
- 复盘空状态插画（空柱图+放大镜）
- 顶部就绪态：小对勾 → 大星星庆祝
- splash 启动画面（页面内 JS 控制全屏暖色 splash + 350ms 淡出）

### PWA 增强
- manifest.json + sw.js + icon.svg + icon-maskable.svg
- sw.js v2：HTML 导航 network-first（在线拿最新版，离线回退缓存），其他资源 stale-while-revalidate；CACHE 升级 v2 清旧缓存
- 安卓 Chrome 可安装成 APP

### DeepSeek AI 集成
- CORS 验证：DeepSeek API 允许 github.io 直连（OPTIONS 200，Access-Control-Allow-Origin 精确匹配），浏览器前端直调无需代理
- AI 设置：自定义 API Base + API Key + 模型名（默认 deepseek-v4-flash，兼容官方/中转 OpenAI 格式）
- 5 个 AI 功能：灵感扩展 / 项目卡点建议 / 待办拆解 / 复盘洞察 / 头脑风暴+流程图
- callDeepSeek 前端直连，结果 modal + 加载动画 + 错误处理
- 头脑风暴流程图：纯内联 SVG 手画（矩形节点 + 箭头）

### 全模块文件/图片上传
- 待办/灵感/项目三个模块每条记录加「图片/文件」上传按钮
- 图片：Canvas API 前端压缩 800px + JPEG 0.72 + base64，每条最多 9 张
- 文件：base64 直接存，单文件 ≤500KB，每条最多 3 个
- 点图片全屏预览，点文件下载
- 存储 >4MB 提醒备份

### 修复
- git push schannel CRYPT_E_NO_REVOCATION_CHECK → export GIT_SSL_NO_REVOKE=1
- Python r''' 转义坑：`\\'` 多写一层致 JS 语法错，改 `\'`
- Service Worker 缓存旧版 → sw.js v2 network-first 让 HTML 更新及时

### 技术栈
- 单文件 HTML，全内联 CSS/JS，零外部依赖（CDN/字体/图表库都不引）
- 图表内联 SVG 手写（饼图/柱图/折线图/流程图）
- 图标内联 SVG path（不用 emoji）
- localStorage 持久化 + JSON 导出导入备份
- 响应式：PC 左导航+右内容，移动端底部 4-tab，输入框 16px 防 iOS 缩放，按钮 ≥44px，适配安全区
