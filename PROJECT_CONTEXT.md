# Hermes Web UI - 项目上下文

> 基于 EKKOLearnAI/hermes-web-ui 的定制版本
> 仓库: https://github.com/foxzhuti-cloud/fox

## 定制清单

### 品牌相关
- 品牌名: **Hermes Web**（原名: Hermes）
- 仓库 URL: `foxzhuti-cloud/fox`
- 主页: `https://www.apim.cn`
- Docker 镜像: `foxzhuti/hermes-web-ui:latest`
- Docker 镜像构建方式: 多阶段构建（合并 frontend + server），通过 GitHub Actions 自动构建

### 字体
- HarmonyOS_Regular 字体（通过 Bilibili CDN 加载）
- 字体文件: `packages/client/src/styles/harmony-font.css`
- 引入方式: `global.scss` 中 `@use 'harmony-font.css'`
- 字体栈: `$font-ui: var(--font-ui, 'HarmonyOS_Regular', 'PingFang SC', ...)`

### 侧边栏 (AppSidebar.vue)
- 品牌文字: `Hermes Web`
- 已移除：版本更新按钮（`handleUpdate` / `handleReloadClient`）
- 已移除：更新日志弹窗（`showChangelog` / changelog modal / NModal）
- 已移除：中转站链接（apikey.fun）
- 版本号仅显示文字，不可点击

### 文案定制
| 位置 | 简体中文 | 繁体中文 |
|------|---------|---------|
| 侧边栏 - 员工 | `员工` (原: 用户) | `員工` (原: 使用者) |
| 侧边栏 - 会议室 | `会议室` (原: 群聊) | `會議室` (原: 群聊) |
| 页面标题 - 会议室 | `会议室` (原: 群聊) | `會議室` (原: 群聊) |

### 工具文件恢复
- `packages/client/src/utils/completion-sound.ts`
- `packages/client/src/utils/clipboard.ts`
- `packages/client/src/utils/ttsHelpers.ts`

### 代码修复
- `\x60` 反引号修复（4 个文件）:
  - `packages/client/src/utils/thinking-parser.ts`
  - `packages/client/src/composables/useSpeech.ts`
  - `packages/server/src/lib/llm-json.ts`
  - `packages/client/src/utils/completion-sound.ts`

### Docker/部署
- `Dockerfile`: 多阶段构建，基于 `node:23-bullseye-slim`
- `docker-compose.yml`: 使用端口变量 `${PORT:-6060}`，添加了 XAI OAuth 端口
- `package.json`: `build:docker` 脚本（`vite build && node scripts/build-server.mjs`）

## 项目结构
```
hermes/
├── packages/
│   ├── client/          # Vue 前端 (Vite + Vue 3 + Naive UI)
│   │   ├── src/
│   │   │   ├── components/
│   │   │   ├── views/
│   │   │   ├── stores/
│   │   │   ├── api/
│   │   │   ├── router/
│   │   │   └── styles/
│   │   ├── index.html   (vite root)
│   │   └── vite.config.ts
│   └── server/          # Node 后端 (Express)
│       └── src/
│           ├── controllers/
│           ├── services/
│           └── routes/
├── packages/website/    # 官网 landing page
├── Dockerfile
├── docker-compose.yml
└── package.json
```

## 工作流
- **构建前端**: `npm run build` (vite build)
- **构建 Docker**: `npm run build:docker` (vite build + build server)
- **开发**: `npm run dev`
- **同步上游**: `git fetch upstream && git merge upstream/main`，然后 `npm run build` 验证

## 上游
- 原始仓库: `https://github.com/EKKOLearnAI/hermes-web-ui`
- 上游 remote 名: `upstream`
