import assert from 'node:assert/strict';
import { readFileSync, existsSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import path from 'node:path';

const root = fileURLToPath(new URL('../', import.meta.url));
const reports = JSON.parse(readFileSync(path.join(root, 'reports.js'), 'utf8').replace(/^window\.REPORTS\s*=\s*/, '').replace(/;\s*$/, ''));
const dates = new Set();
for (const report of reports) {
  assert.match(report.date, /^\d{4}-\d{2}-\d{2}$/);
  assert(!dates.has(report.date), `Duplicate edition: ${report.date}`);
  dates.add(report.date);
  assert(report.projects.length >= 4 && report.projects.length <= 6);
  assert(report.checkedAt);
  assert(existsSync(path.join(root, 'reports', `${report.date}.md`)), 'Missing English report');
  const repos = new Set();
  for (const project of report.projects) {
    assert.match(project.repo, /^[\w.-]+\/[\w.-]+$/);
    assert(!repos.has(project.repo), 'Duplicate project in edition');
    repos.add(project.repo);
    assert(Number.isInteger(project.stars) && project.stars >= 0);
    assert.equal(typeof project.approx, 'boolean');
    assert.equal(new URL(project.evidence).protocol, 'https:');
    for (const lang of ['en', 'zh']) {
      for (const field of ['category', 'tagline', 'use', 'why', 'fit', 'try', 'maintenance']) {
        assert(project[lang]?.[field]?.trim(), `${project.repo}: missing ${lang}.${field}`);
      }
      assert.equal(project[lang].help.length, 2);
      assert(project[lang].help.every(text => text.trim()));
      assert(report.pick[lang]?.trim() && report.note[lang]?.trim());
    }
  }
}
assert(dates.size > 0);
console.log(`Validated ${dates.size} bilingual edition(s), project records, and report files.`);
