# 交接（2026-10-11，第二版）

新会话先读这个文件，再对照 `git status` / `git log` 核实。

## 当前状态

- 线上主站：https://mortyyjt.github.io/ （GitHub Pages，main 每次更新后由 `.github/workflows/pages.yml` 自动发布）；Vercel 是镜像。
- PR #6 已合并（merge commit，Pages 部署成功，线上 /profile 已确认有经历、游戏、音乐）。main 上现有：毛玻璃首页、hello 开屏、图片卡（点开是 /pictures 图库）、小档案（个人简介、经历、项目、技术栈、游戏带图标、音乐链到网易云、联系）、项目页 6 个项目（含墨大课业 Agent；SageSense 是用户总负责、写了几乎全部代码；Garbage Collection Inc 的控制台引擎由课程提供，只简短提一句）、友链页（3 个）、仿参考站外壳的跨页面播放器。点赞功能已按用户要求整个删除（含 Worker 代码）。深色模式已改为纯黑极简（中性近黑底，无光晕、无颗粒，见 `note/2026-10-11-dark-plain.md`），不再是「夜雨青」。
- 用户要求本项目尽量在同一个会话窗口里完成，不主动开新会话；只有上下文真的快满时才按规则交接。
- AGENTS.md 已加 Session hygiene 规则：上下文快满或进入新阶段时，主动更新本文件、提交、开新会话并归档旧会话，只用一行告诉用户。

## 下一步

- 文案已改为平实写法（用户不要口号、不要 AI 味）。首页那句介绍已删。小档案的个人简介已改为介绍性格（话多、高精力、玩抽象、爱旅游和唱歌，欢迎聊技术、旅行、游戏），不重复教育和项目。
- 图片页已改名「画廊」，图片等用户晚点提供。
- 图片卡（`src/content/pictures.ts`）现在只有头像占位，等用户提供图片（横图更合适），放进 `public/pictures/` 再登记。
- 部署脚本保留上一版静态资源（避免缓存的旧 HTML 找不到 CSS，见 `note/2026-10-11-site-polish.md`）：用户已同意，但改 `.github/workflows/pages.yml` 被自动模式拦下，需要用户放行或亲手改。

## 约定（不要违反）

- 只用 `MortyYJT` / `谷鱼Y` 作为身份；不写真名。邮箱例外：2026-10-11 用户主动要求在首页放「复制邮箱」按钮（GitHub 账号的 Gmail，拆开存储，页面源码里没有完整地址）；其他私人联系方式仍不放。
- 项目描述必须和仓库实际状态一致；不自托管版权音乐（音乐只列出，不嵌入）。
- 这个项目全部由 Claude 自己实现，不派给 Codex 或 dsh。用户说「合并」后由 Claude 合并；不能直接推 main，用 `codex/` 分支加 PR。
- 提交信息：`type(scope): summary`，空行后接英文 `- ` 列表正文。
- 主检出（仓库根目录）常常占着某个分支；在 worktree 里用 `git checkout -B <新分支> origin/<分支>` 再 `git push origin HEAD:<分支>`。
- 浏览器验证用无头 Chromium 加 npm 缓存里的 playwright-core（`~/.npm/_npx/9833c18b2d85bc59/node_modules/playwright-core`，可执行文件在 `~/Library/Caches/ms-playwright/chromium_headless_shell-1228/chrome-headless-shell-*/chrome-headless-shell`）。服务器：`npm run build` 后 `npx next start -p 3123`。深色和英文要通过 localStorage `guyuy:preferences:v1` = `{"theme":"dark","locale":"en"}` 设置，系统配色不生效。
- React `<ViewTransition>` 在这个项目里导航时不会触发（原因未查明），页面过渡目前用 CSS 实现。
