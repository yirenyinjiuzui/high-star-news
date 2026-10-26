import { readFileSync, writeFileSync, mkdirSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import path from 'node:path';

const root = fileURLToPath(new URL('../', import.meta.url));
const reports = JSON.parse(readFileSync(path.join(root, 'reports.js'), 'utf8').replace(/^window\.REPORTS\s*=\s*/, '').replace(/;\s*$/, ''));
mkdirSync(path.join(root, 'reports'), { recursive: true });
for (const report of reports) {
  const lines = [`# High Star News — ${report.date}`, '', `Checked: ${report.checkedAt} (Asia/Shanghai)`, '', '## Today at a glance', '', '| Project | Stars | Category |', '| --- | ---: | --- |'];
  for (const p of report.projects) {
    lines.push(`| [${p.name}](https://github.com/${p.repo}) | ${p.approx ? 'about ' : ''}${p.stars.toLocaleString('en-US')} | ${p.en.category} |`);
  }
  lines.push('', '## Where to start today', '', report.pick.en);
  for (const [i, p] of report.projects.entries()) {
    const t = p.en;
    lines.push('', `## ${i + 1}. ${p.name}`, '', t.tagline,
      '', '### What it does', '', t.use, '', '### Why we recommend it', '', t.why,
      '', '### How it could help you', '', ...t.help.map((text, j) => `${j + 1}. ${text}`),
      '', '### Who it fits and what to expect', '', t.fit,
      '', '### A small first step', '', t.try, '', '### Maintenance check', '', t.maintenance,
      '', `Sources: [Official README](https://github.com/${p.repo}#readme), [update evidence](${p.evidence}).`);
  }
  lines.push('', '## About this edition', '', report.note.en, '');
  writeFileSync(path.join(root, 'reports', `${report.date}.md`), lines.join('\n'));
}
console.log(`Rendered ${reports.length} English report(s).`);
