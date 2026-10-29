# 自定义域名 mortyyjt.site（2026-10-29）

## 做了什么

- `public/CNAME` 写入 `mortyyjt.site`。部署流程是把静态导出强制推到 `MortyYJT.github.io`，只在 Pages 设置里填域名会被下一次部署抹掉，所以域名必须放在导出产物里。
- `src/lib/site.ts` 的 `siteOrigin` 改为 `https://mortyyjt.site`（canonical、Open Graph、robots、sitemap 都用它）。
- README 和 `pages.yml` 注释同步更新。

## 为什么等 DNS 再合并

2026-10-29 查询时 `mortyyjt.site` 的 NS 在 DNSPod，但没有任何 A / CNAME 记录。Pages 一旦带上 CNAME，`mortyyjt.github.io` 会跳转到 `mortyyjt.site`；DNS 没配好时整个站点打不开。

## 用户需要在 DNSPod 添加的记录

| 主机记录 | 类型 | 记录值 |
| --- | --- | --- |
| @ | A | 185.199.108.153 |
| @ | A | 185.199.109.153 |
| @ | A | 185.199.110.153 |
| @ | A | 185.199.111.153 |
| www | CNAME | mortyyjt.github.io |

来源：GitHub Docs「Managing a custom domain for your GitHub Pages site」。

## 合并后检查

1. `dig +short mortyyjt.site` 返回上面四个 IP。
2. 合并后部署完成，`gh api repos/MortyYJT/MortyYJT.github.io/pages` 的 `cname` 为 `mortyyjt.site`。
3. 证书签发后（通常几分钟到一小时）开启 `https_enforced`，`curl -I https://mortyyjt.site` 返回 200。
4. GitHub 主页 README 的 Portfolio 徽章改指 `https://mortyyjt.site/`。
