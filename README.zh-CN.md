# 高星项目日报

[![简体中文](assets/lang-zh.svg)](README.zh-CN.md) [![English](assets/lang-en.svg)](README.md)

每天推荐约五个实用的 GitHub 项目，说明它们有什么用、为什么推荐、可能怎样帮助你，以及一个可以动手尝试的入门步骤。

- **网页默认英文。** 网页中的 **简体中文** 和 **English** 按钮可切换整个界面和推荐内容；仓库名与产品名保持原样，浏览器会记住你的语言选择。自述文件顶部的按钮则跳转到对应语言的自述文件。
- 下载仓库后打开 [index.html](index.html)，或将仓库作为静态网站运行。GitHub 的文件预览不会执行 HTML 或 JavaScript。
- 阅读或下载 [2026-10-28 英文日报](reports/2026-10-28.md)，网页日期选择器中保留历史版次。

## GitHub Pages 网页托管

在仓库 **Settings → Pages** 中选择 **Deploy from a branch**，选择默认分支和 **/ (root)**，然后保存。GitHub 完成部署后，预期地址为 https://yirenyinjiuzui.github.io/high-star-news/ 。此地址不表示已经启用或验证部署。

## 每日更新约定

Codex 聊天中的任务计划于 **北京时间每天 09:00** 执行。本仓库存放生成的网站和日报，没有独立的定时调度器。本地定时任务运行时，需要保持电脑开机、Codex 应用运行。

1. 查看 `reports.js` 中的历史版次，除非有重要更新，否则尽量避免 30 天内重复推荐。
2. 调研约五个活跃的公开项目，通常要求至少 10,000 个星标。根据官方说明、发布或提交记录核查，记录实际检查时间并标注约数，不编造每日星标增量。
3. 在 `reports.js` 中追加一期内容，每个项目、当期摘要和说明都包含完整的 `en` 和 `zh` 字段。英文为日报正文语言，中文应覆盖同样的实质信息。保留旧版次。
4. 运行 `node scripts/render-reports.mjs`，根据同一份内容生成 `reports/YYYY-MM-DD.md` 英文日报并附官方来源。不得发布本机路径、凭据、账号诊断信息或私人聊天记录。
5. 运行 `node scripts/check.mjs`。修改页面代码时，额外预览两种语言。
6. 每期将所有改动合并为**一次提交和一次推送**。没有变化时不推送。优先普通 Git；如果本机 Git 认证不可用，则使用 GitHub 连接器的文件树与提交操作批量同步，避免逐个文件提交。

## 控制请求频率

顺序执行 GitHub 请求。如需通过接口写入，两次写入至少间隔五秒。遇到认证失败即停止；遇到限流时遵守 `Retry-After` 和 `X-RateLimit-Reset`，不连续重试、不轮换账号或绕过限制。保留本地草稿并报告失败。降低操作频率不能保证账号永不受限。参见 [GitHub 接口使用最佳实践](https://docs.github.com/en/rest/using-the-rest-api/best-practices-for-using-the-rest-api)。

网页本身不调用 GitHub 接口，也不使用外部翻译接口，只读取仓库内的日报数据。仅发布生成的推荐内容，不会自动安装推荐项目、添加星标或创建分叉。
