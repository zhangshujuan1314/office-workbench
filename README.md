# 个人办公工作台

单文件 HTML 个人办公效率工作台，PWA 可安装，数据本地存储，集成 DeepSeek AI。

## 在线地址

- **永久链接**：https://zhangshujuan1314.github.io/office-workbench/
- **仓库**：https://github.com/zhangshujuan1314/office-workbench

## 功能模块

| 模块 | 功能 |
|---|---|
| 今天待办 | 任务/优先级 P0-P3/截止日期/关联项目；按日期分组；逾期自动顺延到今天并记次数；完成打勾 |
| 灵感速记 | 随手记想法/打标签/按标签筛选；卡片网格 |
| 项目跟进 | 项目名/阶段/下一步/卡点；关联待办完成率进度条；卡点标红+顶部提醒 |
| 每周复盘 | 完成数统计 + 优先级饼图 + 精力分布柱图 + 每日趋势折线图 + 卡点汇总（内联 SVG） |
| AI 头脑风暴 | 输入主题 → AI 发散想法 + 流程图（内联 SVG） |

## AI 功能（需配置 API）

灵感 AI 扩展 / 项目卡点 AI 建议 / 待办 AI 拆解 / 复盘 AI 洞察 / AI 头脑风暴+流程图

配置入口：侧栏「AI 设置」→ 填 API Base + API Key + 模型名。兼容 OpenAI 格式的官方 DeepSeek 或中转 API。

## 文件结构

```
office-workbench/
├── index.html          # 工作台主体（单文件全内联 CSS/JS，零外部依赖）
├── manifest.json       # PWA 应用清单
├── sw.js               # Service Worker v2（HTML network-first，离线回退缓存）
├── icon.svg             # 普通图标（矢量）
├── icon-maskable.svg   # 安卓裁剪适配图标
├── README.md           # 本文件
└── CHANGELOG.md        # 变更日志
```

## 数据存储

- **localStorage**（key 前缀 `wb_office_`），不上传服务器
- 导出/导入 JSON（右上角按钮），换手机可迁移
- 攒满 20 条提醒导出备份
- 清空全部/清空示例/恢复示例，清空操作二次确认
- 附件：图片自动压缩 800px 宽 + JPEG 0.72 + base64，每条最多 9 张；文件 ≤500KB 每条最多 3 个
- localStorage 上限 5MB，超 4MB 提醒导出备份

## 部署

- GitHub Pages（main 分支根目录，public 仓库，HTTPS 强制启用）
- 永久链接：https://zhangshujuan1314.github.io/office-workbench/
- 安卓 Chrome 打开 → 菜单 → 安装应用，可当 APP 用（PWA，离线可用）

## 更新方法

```bash
# 改源文件后同步并推送
cp "源文件.html" deploy/index.html
cd deploy
git add -A
git commit -m "更新说明"
git push
```

> Windows 注意：需 `export PATH="/c/Users/Administrator/.workbuddy/bin:$PATH"`（gh CLI 用于 credential）+ `export GIT_SSL_NO_REVOKE=1`（绕过 schannel 证书吊销检查失败）

Pages 自动重建 30-60 秒，链接不变。sw.js v2 让用户打开 APP 优先拿网络最新版 HTML。

## 安全说明

- **API key**：存浏览器 localStorage（`wb_office_ai_config`），devtools 可见，单用户自用可接受，**勿在公共电脑保存**
- **XSS 防护**：所有用户输入渲染前 `escapeHtml` 转义（20+ 处覆盖：任务/灵感/项目/标签/AI 输出/错误信息）；AI 输出渲染前也 escape
- **无代码注入**：无 `eval` / `new Function` / `dangerouslySetInnerHTML`；AI 结果 actions 用函数名调用非 eval
- **CORS**：DeepSeek 官方 API 已验证允许 `zhangshujuan1314.github.io`（OPTIONS 200，Access-Control-Allow-Origin 精确匹配）；中转 API 需自查 CORS
- **HTTPS**：GitHub Pages 强制 HTTPS；fetch API 走 https
- **仓库公开**：仓库 public（代码公开），但 localStorage 数据不在仓库；页面无预填真实隐私数据
- **附件 base64**：图片/文件 base64 存 localStorage，img src 加载不执行脚本；下载文件是用户自传
- **5MB 限制**：localStorage 5MB 上限，附件大小限制保护，超 4MB 提醒备份

## 已知限制

- localStorage 5MB，不适合存大文件（视频/大 PDF 用网盘链接贴灵感）
- PWA 系统 splash 用 manifest 图标 + 背景色自动生成；页面内 splash 是 JS 控制
- 中转 API 需允许 CORS，否则浏览器直调失败
- Service Worker 缓存：首次更新需清一次缓存让 v2 生效，之后打开就能拿新版

## 维护环境

- gh CLI：`C:\Users\Administrator\.workbuddy\bin\gh.exe`（v2.97.0）
- Python venv：`C:\Users\Administrator\.workbuddy\binaries\python\envs\default`（requests + certifi）
- Node：`C:\Users\Administrator\.workbuddy\binaries\node\versions\22.22.2\node.exe`（用于 `node --check` 验证 JS 语法）
- SSL 修复：venv 调 HTTPS 需 `SSL_CERT_FILE=<certifi cacert.pem>`（venv 默认无 CA bundle）
- GitHub 账号：zhangshujuan1314

## 源文件

源文件（开发用）：`C:\Users\Administrator\Desktop\工作台\个人办公工作台.html`
部署目录：`C:\Users\Administrator\Desktop\工作台\deploy\`
