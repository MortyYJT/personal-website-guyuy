# 交接（2026-10-11，阶段完成）

新会话先读这个文件，再对照 `git status` / `git log` 核实。用户说本阶段已完成，项目暂停；下次有新需求再继续。

## 当前状态（main，已上线）

- 线上主站：https://mortyyjt.github.io/ （GitHub Pages，main 每次更新后由 `.github/workflows/pages.yml` 自动发布）；Vercel 是镜像。最后合并的是 PR #11。
- 首页：毛玻璃卡片、hello 开屏、问候卡（只有问候和名字）、图片卡（绝区零插画，点开是 `/pictures` 画廊）、时钟、日历、最新项目、仿参考站外壳的播放器、GitHub 和「复制邮箱」按钮（点击复制并在底部提示）。
- 小档案：个人简介（讲性格，活泼语气）、经历（墨大 2026.07–2028.06、莫纳什 2025.07–2026.06，计算机，一行一条，新的在上）、项目、技术栈（按仓库实际依赖，突出 Agent）、6 个游戏带官方图标、5 首歌链到网易云、联系。
- 项目页 6 个：OfferPilot（留学申请 agent，面向全球）、墨大课业 Agent（进行中）、这个网站、SageSense（用户总负责、写了几乎全部代码）、Garbage Collection Inc（控制台引擎由课程提供）、Bullet Bloom。
- 友链 3 个：不想上学、MarkChu、Emulisy。画廊 14 张图（`public/pictures/`，WebP，元数据含 GPS 已去除）。
- 深色模式：纯黑极简（`#101211`，无光晕、无颗粒）。点赞功能已整个删除。

## 待办（都不急，用户有需要再做）

- 部署时保留上一版静态资源：部署后 10 分钟内，用旧缓存 HTML 的访客会加载不到已删除的旧 CSS，页面没样式（强制刷新可恢复）。方案见 `note/2026-10-11-site-polish.md`；改 `pages.yml` 被自动模式拦下，用户表示「无所谓」，暂不做。
- 墨大课业 Agent 用户说这两天就做完：完成后更新项目页的状态和介绍。
- OfferPilot 仓库的 README 和简介还写「澳洲八大」，网站已改成全球；仓库那边由用户决定是否改。
- Steam 三款游戏图标只有 32px，高分屏略糊；以后有更清晰的官方来源可以替换。

## 约定（不要违反）

- 只用 `MortyYJT` / `谷鱼Y` 作为身份；不写真名。邮箱例外：用户主动要求首页放「复制邮箱」按钮（GitHub 账号的 Gmail，拆开存储，页面源码里没有完整地址）；其他私人联系方式仍不放。
- 文案平实、活泼，不写口号和「AI 味」的句子；不替用户补充没说过的事。
- 项目描述必须和仓库实际状态一致；不自托管版权音乐（音乐只列出或链接）。新增图片先去掉元数据（GPS）。
- 这个项目全部由 Claude 自己实现，不派给 Codex 或 dsh。用户说「合并」后由 Claude 合并；不能直接推 main，用 `codex/` 分支加 PR。提交信息：`type(scope): summary`，空行后接英文 `- ` 列表正文。
- 用户希望尽量在同一个会话窗口完成工作，只有上下文快满时才按 Session hygiene 交接。
- 主检出（仓库根目录）常常占着某个分支；在 worktree 里用 `git checkout -B <新分支> origin/main`，推送 `git push -u origin HEAD`。zsh 不按空格拆变量，循环里别用 `set -- $p`。

## 运行与验证

- `npm test`（node --test）、`npm run lint`、`npm run typecheck`、`npm run build`；本地预览 `npx next start -p 3123`。
- 浏览器验证用无头 Chromium 加 npm 缓存里的 playwright-core（`~/.npm/_npx/9833c18b2d85bc59/node_modules/playwright-core`，可执行文件在 `~/Library/Caches/ms-playwright/chromium_headless_shell-1228/chrome-headless-shell-*/chrome-headless-shell`）。深色和英文通过 localStorage `guyuy:preferences:v1` = `{"theme":"dark","locale":"en"}` 设置，系统配色不生效。
- 播放器外壳靠「iframe 获得焦点」判断点击，进度按曲目时长（381.536 秒）计时；测试时用鼠标点 `.music-button` 中心，再读 Bandcamp iframe 里 `audio` 的 paused 和 currentTime 对照。
- React `<ViewTransition>` 在这个项目里导航时不会触发（原因未查明），页面过渡用 CSS。
