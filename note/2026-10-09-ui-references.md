# UI 项目与 skills 调研

本次检查官方仓库 / 文档，判断面向当前 Next.js 个人网站。下面的推荐是适配判断，不是性能或设计效果的保证。没有安装新 skill、插件或运行第三方安装脚本。

| 项目 | 可借鉴部分 | 当前取舍 |
| --- | --- | --- |
| [antfu.me](https://antfu.me/) / [源码](https://github.com/antfu/antfu.me) | 项目与文字的内容层次，个人站的信息组织 | 适合参考克制的内容设计；不迁移它的框架。仓库明确代码 MIT、文字和图片 CC BY-NC-SA 4.0，不能把内容当作代码随意照搬。 |
| [shadcn/ui](https://ui.shadcn.com/) / [源码](https://github.com/shadcn-ui/ui) | 可定制的组件基础、设计系统、后续菜单和弹窗 | MIT；当前没有需要替换的复杂控件，不为换色引入一整套。它解决组件基础，不保证个人站独特审美。 |
| [Magic UI](https://github.com/magicuidesign/magicui) | React / TypeScript / Tailwind 的动效组件与效果 | 官方仓库 MIT；适合选一个合适的效果，检查组件依赖和减少动态偏好，不把粒子、光晕、卡片特效全部堆上去。商业模板另行核对许可。 |

## 推荐 skills

1. [Impeccable](https://github.com/pbakaus/impeccable)：优先推荐的设计指导。官方 README 提供 Codex 支持，涵盖 critique、audit、refinement、动效与适配等设计工作；适合改善层次、留白、配色和细节。当前 Apache-2.0。官方安装流程还可能安装 project hooks；不能把“读设计指南”“安装 skill”“批准运行 hook”混为同一件事。当前只是研究，没有安装或授权 hooks。
2. [Vercel web-design-guidelines](https://github.com/vercel-labs/agent-skills/tree/main/skills/web-design-guidelines)：适合交互质量验收。实际规则来自 [Web Interface Guidelines](https://github.com/vercel-labs/web-interface-guidelines/blob/main/command.md)，覆盖键盘、焦点、动画、触摸、深色模式等。它是检查清单，不负责决定设计方向。此次已参考开屏相关的低动态、可打断、transform 动效和焦点可见规则。
3. 已有 `vercel:react-best-practices`：适合 React 实现和性能检查，本机可直接使用；不能替代设计审美指导。已有 `superpowers:brainstorming` / `requesting-code-review` 是协作与审查流程，也不是视觉设计器。

建议组合：Impeccable 做设计判断，Web Interface Guidelines 做验收，React best practices 检查实现。只在具体控件或效果需要时选用 shadcn/ui 或 Magic UI。现有蓝白开屏无需新增依赖。

## 2026-10-09 已实现与验收

- 用户批准蓝白开屏，并明确要求原页面一起变蓝白。深色使用海军蓝 / 白，浅色使用蓝白 / 深蓝；所有页面共享 token，鱼标 favicon 同步。
- 首页增加自写 TypeScript + CSS 装饰开屏：爱心脉动、叉号旋转、横条竖向扩张和蓝白扫屏；约 1.4 秒。本标签页首次进入首页播放，刷新不重复；内存 guard 支持 storage 被拒绝，低动态偏好直接跳过。正文 SSR 不含遮罩，无 JS 可读。
- 跳过、Escape、底层控件获得焦点都会退出；CSS 本身也有结束兜底。跳过按钮保留 safe-area 和 44px 点击高度。不等待远程资源，也不伪装成加载百分比。
- 5 个新行为测试先 RED（重复播放、存储和低动态缺失）再 GREEN；全套 19 tests、lint、typecheck、生产 build 通过。
- 生产模式浏览器观察初次遮罩存在、跳过后隐藏、刷新不重复、Escape 隐藏、低动态下无遮罩。三个产品路由 375 宽的浅色主题和持久化已核对，没有横向溢出；1440 深色首页核对。控制台无 warning / error。真实手机未实机验证。
- 独立审查未发现可确认 Critical / Important / Minor；范围是源码，浏览器验收由主 agent 完成。
- 当前为开发分支实现；生产仍由 main 管理，按仓库约定通过 PR、用户合并发布。旧有 automatic push CI 未触发问题不在本次 UI 变更中声称修复。
- 后续浏览器检查：Tab 到底层跳过链接立即退出遮罩，焦点可见；禁用 JavaScript 刷新后首页标题可读且无遮罩。测试设置已恢复。
