# 个人网站重建实施记录

## 实施范围

用户已批准设计和计划，选择主代理原生实施。当前位于 `codex/personal-website-rebuild`，没有旧网站代码或提交历史。实现首页、HTML 简历、项目证据页、404、双语、主题持久化、原创小鱼和移动悬浮导航。未建立 API、数据库、认证或分析服务。未 commit / push / 建立新 GitHub 库 / 发布新 Vercel 项目。

## 内容证据

- Commerce Support Agent：核对公开 `src/commerce_support/routes.py` 和 `services.py`，仅描述流式回复、上下文、取消和错误反馈；不声称已生产上线。
- OfferPilot：核对公开 `api/app/routers/roadmap.py` 和 `web/package.json`，描述资料、路线图和任务管理。未把规划中的 Agent 架构当作当前实现。
- 正文中的项目证据链接保存在 `src/content/projects.ts`。兴趣、教育和工作经历没有可靠输入，先省略。

## 工具链与修复

- Node 24；Next.js 16.4.0，React 19.3.0，Tailwind / PostCSS 4.3.3，TypeScript 6.0.3，ESLint 9.39.5，Node types 24.19.1。
- 初始 TypeScript 5.9 缺少 Next URLPattern 的全局类型；TypeScript 7 能检查声明但当前 typescript-eslint 明确拒绝其 API。采用稳定 6 系列。
- Next 同时生成开发和生产的全局 route 声明，完整检查两者出现重复声明。采用官方默认 `skipLibCheck: true`；应用 `strict`、lint、typecheck、build 校验全部保留。
- Next 自动追加 AGENTS 内容，已通过 `agentRules: false` 保留用户批准的短索引。
- `npm audit --omit=dev`：0 个漏洞。完整 audit 的 5 个 high 条目均沿 lint 工具的 braces / micromatch / fast-glob 链传播；registry 当前没有 braces 补丁，不使用强制降级 Next 的建议。ESLint 9 已结束上游支持，后续工具链升级时跟进。

## 本地验收

- 内容过滤测试 6 个：看到未实现时失败，再实现通过。
- 偏好存储测试 8 个：看到未实现时失败，再实现通过。全套 14 / 14。
- 最新 lint：0 errors / 0 warnings；typecheck：exit 0；生产 build：exit 0，所有产品路由静态生成。
- 生产浏览器：英文 / 浅色在三个页面和 404 直达、刷新后保持；文档 lang 为 en。新生产 tab 控制台没有 warning / error。
- 375 宽度：无横向正文溢出，六个 dock 目标都可到达，联系链接位于 dock 上方。
- 存储拒绝：通过 CDP 模拟 getter 抛错，切换中文 / 深色后跨页仍保持内存状态。移除模拟后刷新，原来的英文 / 浅色恢复。
- 存储拒绝的冷启动浏览器模拟：工具不支持新文档注入，因此未直接验证；纯函数测试覆盖默认回退与抛错读取。
- 最终九组组合：三个产品路由 × 375 / 768 / 1440。正文宽度分别 320 / 713 / 720，正文 scrollWidth 不超过 viewport；顶部导航在视口内。截图明确使用标签页级 CDP 尺寸并读取 DOM 确认后保存，避免浏览器面板截图裁切造成假证据。
- 键盘：Tab 顺序为跳过内容、品牌、简历、项目、语言、主题；均有可见 solid outline；Enter 可切换主题和进入简历。低动态偏好下 hero 保持稳定短句，CSS 关闭动态滚动及光标闪动。
- 7 个公开 GitHub 链接本次请求均为 HTTP 200。匿名身份及私有路径扫描 55 个候选文件，排除批准昵称后 0 个命中；Git 本地昵称匹配。
- 主题冷加载临时探针：保存 light 时首个渲染帧为 light；hydration 的默认主题回写在同一阶段被 light 覆盖，未观察到 dark 帧。慢速样本只覆盖初始绘制，没有覆盖 hydration；不据此保证任意环境绝无闪烁。临时服务与浏览器测试覆盖已清除。
- 独立审查：Astra 因额度未能执行，改用可用的 GPT-6.1 Sol 新上下文 reviewer。重跑测试、lint、typecheck 并审阅代码及截图；Critical / Important 均为 0。唯一 Minor 是中文首页装饰短句保持英文，已按批准的全双语要求修正，浏览器观察 localized false → true，并验证英文切换。
- 修正后最终 lint / typecheck / 14 tests / production build 全部 exit 0。真实生产模式浏览器控制台 0 warning / error。

## 远端状态

CI 文件已准备，官方 actions 固定到本次 API 查证的 v5 commit SHA。远端 CI、GitHub 提交身份关联、Git 触发 Vercel CD 均未验证。原 Vercel 项目此前已断开旧 Git 库连接；历史部署没有删除。新库和生产发布按计划 Task 6 等待独立授权。

## 验收结论

本地实现可审核，未声明远端上线成功。真实手机 safe-area / 手势未实机验收；冷启动存储拒绝由纯测试覆盖，浏览器仅验证运行中拒绝。后续发布将建立 `MortyYJT/personal-website-guyuy` 与匹配 Vercel 项目，再独立核实 CI 和 Git 触发 CD。

执行决策及审查边界归档于 `docs/engineering/implementation-decisions.md`；原始临时 ledger 暂时保留于忽略目录，避免无 commit 时失去证据。

## 发布授权

2026-10-08：用户明确授权新库创建、commit / push、初始化 main，以及同名 Vercel 项目的生产发布。GitHub 当前登录账户已核对为 MortyYJT；Vercel connector 需重认证，已改用当前登录的浏览器，目标团队为 mortyyjts-projects。发布验收进行中。

## 首次发布与 Git CD 验收准备

- 新公开库已建立：MortyYJT/personal-website-guyuy；main 与 codex/personal-website-rebuild 从全新根提交 f64387c 初始化。GitHub API 验证作者、提交者均关联 MortyYJT。
- 新 Vercel 项目在 mortyyjts-projects 建立，导入 main、根目录 ./、Next.js；首次部署 dpl_ASRkikoAAMkqPt9qmuB1oCHkj1bZ 成功，生产域名为 https://personal-website-guyuy.vercel.app。
- 实际生产 origin 已写入 canonical / Open Graph / robots / sitemap；下次 Git push 将用于验证真正自动部署。初始推送未产生 Actions run，已确认 Actions enabled、CI workflow active；后续提交将核实是否触发。
