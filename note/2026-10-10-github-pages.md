# 部署到 GitHub Pages

- 问题：GitHub 主页 README 的 Portfolio 徽章和个人资料里的 Website 字段都还指向旧站 `guyuy-portfolio.vercel.app`（旧仓库 `GuYuY-portfolio`），所以看起来像「新站没改」。
- 用户决定（2026-10-10）：归档旧仓库，下线旧的 Vercel 项目；新建 `MortyYJT.github.io` 仓库作为主站；Vercel 保留作为镜像；资料网址指向 `https://mortyyjt.github.io/`。
- 已做：`GuYuY-portfolio` 已归档。已新建公开仓库 `MortyYJT.github.io`，配置只对它有写权限的部署密钥，私钥只存在本仓库的 Actions secret `PAGES_DEPLOY_KEY` 里，本地副本已删除。
- 实现：设置 `STATIC_EXPORT=1` 时输出 `output: "export"` 和 `images.unoptimized`，robots 和 sitemap 标记为 `force-static`。`pages.yml` 在 main 更新时构建静态版，并 force push 到 Pages 仓库，GitHub 的主机密钥是固定写入的，不在运行时信任。CI 增加了一步静态导出构建。`siteOrigin` 改成 github.io，Vercel 镜像的 canonical 也指向主站。
- 本地验证：用一个模拟 Pages 规则的静态服务器（无扩展名路径对应 .html，找不到的页面返回 404.html）检查。首页、简历、项目都返回 200，不存在的路径返回 404 页，头像能加载，客户端跳转正常，没有其他报错。
- 用户需要自己做：在 Vercel 控制台删除旧项目 `guyuy-portfolio`；修改个人资料的 Website（gh 令牌没有 `user` 权限）。
- 风险（没有实测）：`*.vercel.app` 在大陆普遍反映无法访问，`github.io` 在大陆不稳定。长期来看建议绑定自己的域名。
