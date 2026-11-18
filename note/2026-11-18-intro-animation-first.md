# Hello 从首屏直接开始动画（2026-11-18）

- 原因：上次修复为 pending 状态增加了完整文字，React 加载后才改成 playing，导致先完整 Hello 再动画。
- 修改：移除 pending 静态文字样式，遮罩显示时立即开始 CSS 动画；head 脚本监听动画结束并放行主页，React 不重启动画或重新计时。首次会话标记在 head 写入，延迟 hydration 也不会再次播放。保留跳过、Escape、reduced motion 和 8 秒异常兜底。
- 验证：lint、typecheck、25 tests、默认和静态生产构建通过；Chrome 在 1440px/375px、脚本延迟 5 秒时，首次文字填充为 0、描边偏移持续变化，动画结束进入主页，hydration 不重播，刷新不重播；reduced motion 跳过。
- 发布：通过 PR 检查后合并，由现有服务器 Actions 部署；随后在公网重复同一浏览器验证。
