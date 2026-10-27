# High Star News

[![简体中文](assets/lang-zh.svg)](README.zh-CN.md) [![English](assets/lang-en.svg)](README.md)

About five useful GitHub projects per day: what they do, why they are recommended, how they could help, and a practical first step.

- **English by default.** The website's **简体中文** and **English** buttons switch the complete interface and recommendation text. Repository and product names remain unchanged. Your choice is remembered in this browser. The buttons at the top of this README link to the corresponding translated README.
- Open [index.html](index.html) after downloading the repository, or serve the repository as a static site. GitHub's file viewer does not execute HTML or JavaScript.
- Read or download the [English report for 2026-10-27](reports/2026-10-27.md). Earlier editions remain available in the date selector.

## GitHub Pages

In repository **Settings → Pages**, choose **Deploy from a branch**, select the default branch and **/ (root)**, then save. After GitHub finishes deployment, the expected address is https://yirenyinjiuzui.github.io/high-star-news/ . This address is not a claim that deployment has been enabled or verified.

## Daily update contract

The Codex chat is scheduled for **09:00 Asia/Shanghai**. This repository contains the resulting site and reports; it does not contain an independent scheduler. The local computer and Codex app need to be running for local scheduled work.

1. Review prior editions in `reports.js` and avoid repeats within 30 days unless there is a material update.
2. Research about five active public projects, normally with at least 10,000 stars. Use official READMEs and release or commit evidence. Record the actual check time, and mark rounded counts. Do not invent daily star growth.
3. Append one edition to `reports.js`, with complete `en` and `zh` fields for every project and for the edition summary and notes. English is the canonical report language; Chinese must cover the same substantive information. Retain older editions.
4. Run `node scripts/render-reports.mjs` to generate `reports/YYYY-MM-DD.md` in English from the same content, linking the official sources. Never publish local paths, credentials, account diagnostics, or private chat history.
5. Run `node scripts/check.mjs`. Preview both languages when interface code changes.
6. Combine all changed files into **one commit and one push per daily edition**. Skip a push if nothing changed. Prefer ordinary Git; if authenticated Git is unavailable, use the GitHub connector's tree/commit operations to batch files instead of committing each file separately.

## Respectful request pacing

Use GitHub requests serially. If API writes are needed, leave at least five seconds between write operations. Stop on authentication failures. For rate limiting, obey `Retry-After` and `X-RateLimit-Reset`; do not repeatedly retry, rotate accounts, or bypass a restriction. Preserve a local draft and report the failure instead. Low volume cannot guarantee that an account will never be restricted. See [GitHub's API best practices](https://docs.github.com/en/rest/using-the-rest-api/best-practices-for-using-the-rest-api).

The website itself makes no GitHub API requests and uses no external translation API. It reads the checked-in edition data locally. Only generated editorial content is published; recommended projects are not automatically installed, starred, or forked.
