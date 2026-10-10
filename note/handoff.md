# 交接（2026-10-11）

新会话先读这个文件，再看 `git status` 和 PR #6。

## 当前状态

- 线上主站：https://mortyyjt.github.io/ （GitHub Pages，main 每次更新后由 `.github/workflows/pages.yml` 自动发布）；Vercel 是镜像。
- main 上已有：毛玻璃一屏首页、温馨浅色加「夜雨青」深色、嫩芽标志、小档案/项目/友链三页、Bandcamp Undertale 播放器（挂在根布局里，跨页面不中断）、主题圆形扩散过渡。
- 进行中：分支 `codex/hello-likes-profile`，草稿 [PR #6](https://github.com/MortyYJT/personal-website-guyuy/pull/6)。已完成苹果风格「hello」开屏、点赞爱心（Cloudflare Worker 代码在 `workers/likes/`）、项目页新增 3 个项目、README 更新。验证记录写在 PR 描述里。

## 下一步（按顺序）

1. **小档案页加内容**（`src/components/profile-content.tsx`，数据放 `src/content/profile.ts`）：
   - 经历：用户已同意公开。莫纳什大学计算机本科 2025.07–2026.06，然后转到墨尔本大学 2026.07–2028.06。没有其他经历。
   - 游戏：原神、崩坏：星穹铁道、绝区零（用户确认）。
   - 喜欢的音乐：用之前选的 5 首。昔涟（张韶涵 / HOYO-MiX）、I Really Want to Stay at Your House（Rosa Walton / Hallie Coggins）、Undertale（Toby Fox）、Snowship（Patricia Wilde）、生きていたんだよな（宫野栞）。只列出来，不嵌入播放。
   - 写完后在浏览器验证（1440 和 390、浅色和深色），然后把 PR #6 从草稿转正、合并，确认 Pages 部署成功。
2. **还没回复的问题**（新会话再问一次）：
   - SageSense：用户本人负责哪部分？没给答案之前不放进项目页（仓库提交数：MortyYJT 39，另两人各 2）。
   - Garbage Collection Inc：`src/engine` 是课程提供的还是用户自己写的？在这之前网站上不声称作者归属。
3. **点赞后端部署**（需要用户的 Cloudflare 账号）：用户运行 `npx wrangler login`、`npx wrangler kv namespace create LIKES`、`npx wrangler secret put IP_SALT`，把 KV id 给 Claude。之后填进 `workers/likes/wrangler.toml` 执行 `npx wrangler deploy`，再设置 GitHub 仓库变量 `LIKES_ENDPOINT` 和 Vercel 环境变量 `NEXT_PUBLIC_LIKES_ENDPOINT`，触发一次部署后实测。

## 约定（不要违反）

- 只用 `MortyYJT` / `谷鱼Y` 作为身份；不写真名，网站上不放个人邮箱。
- 项目描述必须和仓库实际状态一致；不自托管版权音乐。
- 这个项目全部由 Claude 自己实现，不派给 Codex 或 dsh。用户说「合并」后由 Claude 合并。
- 浏览器验证用无头 Chromium 加 npm 缓存里的 playwright-core（`~/.npm/_npx/9833c18b2d85bc59/node_modules/playwright-core`，可执行文件在 `~/Library/Caches/ms-playwright/chromium_headless_shell-1228`）。开发服务器用 `.claude/launch.json` 里的 `web`。
- 还要留意：React `<ViewTransition>` 在这个项目里导航时不会触发（原因未查明），页面过渡目前用 CSS 实现。
