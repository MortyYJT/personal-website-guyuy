# 交接（2026-10-11，第二版）

新会话先读这个文件，再对照 `git status` / `git log` 核实。

## 当前状态

- 线上主站：https://mortyyjt.github.io/ （GitHub Pages，main 每次更新后由 `.github/workflows/pages.yml` 自动发布）；Vercel 是镜像。
- PR #6 已合并（merge commit，Pages 部署成功，线上 /profile 已确认有经历、游戏、音乐）。main 上现有：毛玻璃首页、hello 开屏、点赞爱心（目前仅本地计数）、小档案（个人简介、经历、项目、技术栈、游戏、音乐、联系）、项目页 5 个项目（含 SageSense：用户是总负责人、写了几乎全部代码；Garbage Collection Inc 的控制台引擎由课程提供，只简短提一句）、友链页、跨页面播放器。
- 用户要求本项目尽量在同一个会话窗口里完成，不主动开新会话；只有上下文真的快满时才按规则交接。
- AGENTS.md 已加 Session hygiene 规则：上下文快满或进入新阶段时，主动更新本文件、提交、开新会话并归档旧会话，只用一行告诉用户。

## 下一步（按顺序）

1. **点赞后端部署**（需要用户的 Cloudflare 账号）：用户运行 `npx wrangler login`、`npx wrangler kv namespace create LIKES`、`npx wrangler secret put IP_SALT`，把 KV id 给 Claude。之后填进 `workers/likes/wrangler.toml` 执行 `npx wrangler deploy`，再设置 GitHub 仓库变量 `LIKES_ENDPOINT` 和 Vercel 环境变量 `NEXT_PUBLIC_LIKES_ENDPOINT`，触发一次部署后实测。

## 约定（不要违反）

- 只用 `MortyYJT` / `谷鱼Y` 作为身份；不写真名，网站上不放个人邮箱。
- 项目描述必须和仓库实际状态一致；不自托管版权音乐（音乐只列出，不嵌入）。
- 这个项目全部由 Claude 自己实现，不派给 Codex 或 dsh。用户说「合并」后由 Claude 合并；不能直接推 main，用 `codex/` 分支加 PR。
- 提交信息：`type(scope): summary`，空行后接英文 `- ` 列表正文。
- 主检出（仓库根目录）常常占着某个分支；在 worktree 里用 `git checkout -B <新分支> origin/<分支>` 再 `git push origin HEAD:<分支>`。
- 浏览器验证用无头 Chromium 加 npm 缓存里的 playwright-core（`~/.npm/_npx/9833c18b2d85bc59/node_modules/playwright-core`，可执行文件在 `~/Library/Caches/ms-playwright/chromium_headless_shell-1228/chrome-headless-shell-*/chrome-headless-shell`）。服务器：`npm run build` 后 `npx next start -p 3123`。深色和英文要通过 localStorage `guyuy:preferences:v1` = `{"theme":"dark","locale":"en"}` 设置，系统配色不生效。
- React `<ViewTransition>` 在这个项目里导航时不会触发（原因未查明），页面过渡目前用 CSS 实现。
