# 个人网站重建：调研与方案建议

调研日期：2026-10-08（Australia/Melbourne）。状态：调研完成，新库名与匿名身份要求已确认；已添加简短仓库行为约束入口与详细工程指南，桌面对照版在审阅后移入废纸篓，旧 Vercel Git 连接已移除。尚未实施网站、创建远程仓库或接入新站部署。

## 用户目标

- 重新建设个人网站，不沿用旧库名称、源码或提交历史。
- 新库名已确定为 `personal-website-guyuy`。仓库内容与 Git 身份仅使用 `MortyYJT` 或「谷鱼Y」。
- 尽量复刻朋友当前网站的视觉与交互，内容替换成自己的真实信息。
- 先调研、选择方案，再形成设计和实施计划，最后实施。
- 网站用途尚待用户回答；暂未把求职或博客定为最终方向。

## 当前工作区

- 本目录只有初始化的 `.git`，main 无提交，无 remote，无产品代码。
- 本次未发现目录附近的 AGENTS.md。
- 本机 gh 与 vercel CLI 不在 PATH；GitHub connector 可读取旧库并返回管理权限。
- Vercel connector 提示需要重新认证；浏览器已登录 Vercel，可读取部署详情，当前调研未因此阻塞。

## 旧库与部署：已核实

旧仓库：https://github.com/MortyYJT/GuYuY-portfolio

- 默认分支 main，共读到 11 次提交。
- 前两次提交的 GitHub author 关联 MortyYJT；后九次使用另一种作者显示名与本机 `.local` 邮箱，GitHub author 为 null。为遵守身份约束，此处不保留真实姓名或邮箱。
- 这是身份关联不一致，不能据此断言有第二个真实 GitHub 账户参与。
- 当前 package.json 为 VuePress 2 与 plume 主题；没有 next 依赖。
- vercel.json 指定 `npm run build` 与 `docs/.vuepress/dist`。
- GitHub Actions runs 数为 0；最新提交存在 Vercel failure status。
- 最新提交 SHA：`b2831262a3e5a5efca15defc5804410d3fab54ef`。
- 部署：https://vercel.com/mortyyjts-projects/guyuy-portfolio/8qaHcfKuV9Tbpm3sN9A7CojGihwE
- 页面错误：`No Next.js version detected. Make sure your package.json has "next" in either "dependencies" or "devDependencies". Also check your Root Directory setting matches the directory of your package.json file.`
- 判断：该次失败的直接原因是部署按 Next.js 校验，与实际 VuePress 项目不符；不是提交身份导致的该条错误。
- 不需要修复或导入这段旧历史才能建立新网站。

## 参考网站：以实际浏览器页面为准

参考：https://auberginewly.site/

搜索引擎返回旧 Hexo / Butterfly 博客。实际浏览器当前是另一套个人主页，不能用旧索引判断现站设计或技术。

已读取首页、简历和开源经历页面；已点击验证中英切换。

### 视觉与交互

- 深色紫灰背景、顶部紫色渐变与颗粒纹理。
- 居中窄内容列、较大留白，首屏标题、身份动态打字文本。
- 顶部胶囊浮动导航：品牌、简历、经历菜单、语言、主题图标。
- 底部胶囊锚点导航：首页、关于我、简历、技术栈、灵感、联系。
- 首页包含关于我、简历入口、分组技术栈、灵感 tabs、联系。
- 简历页是简洁的个人档案与经历排版；页脚明确链接 Read.cv 风格参考。
- 开源经历页包含角色、日期、技术标签、背景、贡献与具体 PR 链接。
- 窄屏初次观察中顶部文字会换行、底部导航被截断；复刻时应专门验收这些边界。
- 本次尚未完整验证主题切换、所有灵感 tabs、实习页与所有外链。
- 导航到开源页后恢复中文，提示语言状态跨页可能未保持；新站需要把跨页保持纳入验收。

### 技术线索与源码可用性

- 页面加载 React framework、`vinext` 与 `rolldown-runtime` chunks，字体为 Geist。
- 这些是运行时线索，不代表已确认原始 package.json 或部署平台。
- 已读取朋友 GitHub 公开仓库列表，未找到可明确对应当前主页的源码仓库。
- 朋友的 NotionNext 仓库 homepage 指向 blog 子域，不是当前主页。
- 可以自行实现可见布局与交互；如后续取得朋友源码，先明确可复用范围及许可，再判断是否更省事。
- 本项目使用自己的身份、头像、文案、联系地址和经历，不复制朋友的履历内容。

## 现成方案比较

| 方案 | 来源 | 优点 | 代价 / 判断 |
| --- | --- | --- | --- |
| 轻量 Next.js 自建，复刻可见页面 | https://nextjs.org/docs | 最贴近参考网站，组件与内容结构可直接为需求设计 | 推荐；需要自行实现渐变、导航、动效 |
| Magic UI Portfolio | https://github.com/magicuidesign/portfolio | MIT，已有个人内容配置、动效、响应式、博客 | 可选组件参考；整套引入仍要大改布局，README 提及旧版本，采用前核对依赖 |
| Nim | https://github.com/ibelick/nim | 极简个人主页、Motion Primitives，与窄内容列方向接近 | GitHub API license 为 null，本次未核实许可文本；不作为直接复制基底 |
| Tailwind Next.js Starter Blog | https://github.com/timlrx/tailwind-nextjs-starter-blog | MIT，文章与 MDX 结构较完整 | 适合博客优先；当前参考以个人主页为主，第一版可能过重 |

许可证状态由本次 GitHub API 返回值核对；模板用途由官方仓库说明确认。尚未安装或运行模板。

## 推荐设计草案

- 新库名已确定为 `personal-website-guyuy`，全新历史。
- Next.js App Router + TypeScript + Tailwind；动效仅在需要交互的组件中使用。
- 默认中文，英文切换跨页保持；支持深浅主题与 reduced motion。
- 首页复刻参考的渐变、颗粒、首屏、双胶囊导航、内容间距与交互节奏。
- 初版路由：`/`、`/resume`、`/experience/projects`；实习 / 开源贡献按真实可公开材料决定是否独立成页。
- 内容集中配置，中英字段分离；未核实的经历和技能不写入成品。
- 第一版不强制加入 CMS、数据库、后台或在线联系表单。是否需要博客由网站主要用途决定。
- 用户已授权取消旧库的 Vercel 部署连接，或接入新库。先解绑旧库停止自动部署，新站就绪后选择复用项目或新建项目，核对框架与根目录。
- GitHub CI 执行 lockfile 安装、lint、typecheck、build；Vercel Git integration 负责预览与生产部署。
- 仅在本库设置 Git 作者为 MortyYJT 与该账户匹配的 noreply 邮箱，提交后核实 GitHub 作者关联。

## 后续阶段与验收

1. 确定网站主要用途、昵称 / 新库名、个人内容来源与复刻范围。
2. 确认设计方向后写正式设计文档；审核通过后写具体实施计划。
3. 建立干净项目，先实现视觉骨架和真实内容配置。
4. 完成首页、简历、项目经历、语言、主题、导航与动效。
5. 本地生产构建，浏览器验收 375 / 768 / 1440 宽度、滚动导航、语言跨页保持、主题、键盘操作、reduced motion、链接与无溢出。
6. 新仓库与 Vercel 项目接入；验证一次真实 Git push 后的自动部署及生产 URL。
7. 新站验收后处理旧仓库与旧 Vercel 项目；永久删除需在最终操作前确认具体对象。

完成标准：视觉与交互经浏览器核验，内容真实且可维护，GitHub 提交身份统一，CI 与真实 CD 均成功，生产网址可访问。仅本地 build 成功或手动部署成功不能代替 CD 验收。

## 官方技术依据

- https://nextjs.org/docs/app/getting-started/deploying
- https://vercel.com/docs/deployments/troubleshoot-a-build
- 本次已通过 Context7 查询 Next.js App Router 部署说明。


## 本轮行为约束与部署调整

- 已参考实时读取的 https://github.com/MortyYJT/commerce-support-agent/blob/main/AGENTS.md 和 https://github.com/MortyYJT/offerpilot/blob/main/AGENTS.md 。
- 保留通用语言、Git、提交格式与证据化验收约定；不继承项目特定模型、旧历史保留或固定报告模板。
- 仓库根目录新增英文 AGENTS.md；桌面另存逐条中英对照审阅版。两份包含相同的 21 条规则。
- 用户五条判断原则压缩成四条：先审前提与缺失信息、独立判断、核对重要来源、直接纠错并提醒影响决策的遗漏变量。
- 本仓库 Git 身份设置为 MortyYJT 与对应 GitHub noreply 邮箱；未改全局配置。后续实际发布时仍需验证 GitHub 作者关联。
- 用户要求 TypeScript 作为全栈方案：明确 TypeScript 是语言，Next.js 是框架，应用与服务端代码可统一使用 TypeScript；第一版不因为框架支持全栈而额外增加后端。
- 已在旧 Vercel 项目的 Git 设置移除 MortyYJT/GuYuY-portfolio 连接。
- 回读页面确认：This Project is not connected to a Git repository。
- 已完成的是旧库自动部署解绑；旧项目、已存在的部署及网址未删除，也未声称旧网址已下线。
- 暂未 commit、push 或创建新远程仓库，文档留待用户人工审阅。


## 审阅后的约束拆分

- 根据用户反馈，将根 AGENTS.md 缩为核心规则与按任务读取索引。
- 原有 21 条详细规则完整迁入 docs/engineering/agent-guidelines.md，保留判断、身份、工程、Git 与验收要求。
- 索引明确要求执行相关任务前读取对应章节，避免把链接误认为自动加载。
- 用户已审阅桌面中英对照版并授权删除；已移入废纸篓，桌面原文件已不存在。
- 结构与内容已核对；本次仅修改文档，未 commit 或 push。


## 进入书面设计阶段

- 用户已要求按方案开始开发，当前按「个人主页为主，兼顾项目与简历」作为明确可修改的默认假设。
- 已写书面设计：docs/superpowers/specs/2026-10-08-personal-website-design.md。
- 已自查范围、结构、隐私、占位词和验收边界；尚未写产品代码或安装依赖。
- 先前交付的是调研与阶段概要，书面设计和详细实施计划此前并不存在；依 Superpowers 架构流程，需要先审阅书面设计，再编写并审阅实施计划。
- 暂未提交设计文件：本仓库约定 commit 与 push 单独授权，当前仍保留为工作区文件供审阅。
