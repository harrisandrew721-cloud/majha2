import assert from 'node:assert/strict';
import fs from 'node:fs';
import { createServer } from 'vite';
import React from 'react';
import { renderToStaticMarkup } from 'react-dom/server';

const server = await createServer({ server: { middlewareMode: true }, appType: 'custom' });
try {
  const { default: App } = await server.ssrLoadModule('/src/App.jsx');
  const output = renderToStaticMarkup(React.createElement(App));
  assert(output.length > 14000, 'Page content is incomplete');
  for (const text of ['Beautiful Outdoor Living', 'Featured Services', 'Landscaping &amp; Turfing', 'Driveways &amp; Concreting', 'Frequently Asked', '0466 800 608', 'majhaimprovehomes@gmail.com']) {
    assert(output.includes(text), 'Missing page content: ' + text);
  }
  assert.equal((output.match(/<section\b/g) || []).length, 9);
  assert.equal((output.match(/<details>/g) || []).length, 5);
  assert.equal((output.match(/data-carousel=/g) || []).length, 2);
  assert(output.includes('aria-expanded="false"'));
  assert(output.includes('id="video-toggle"'));
  for (const match of output.matchAll(/src="(assets\/[^"]+)"/g)) {
    assert(fs.existsSync('public/' + match[1]), 'Missing source asset: ' + match[1]);
    assert(fs.existsSync('dist/' + match[1]), 'Missing build asset: ' + match[1]);
  }
  const index = fs.readFileSync('dist/index.html', 'utf8');
  for (const match of index.matchAll(/(?:src|href)="(\/assets\/[^"]+)"/g)) {
    assert(fs.existsSync('dist' + match[1]), 'Missing bundle: ' + match[1]);
  }
  assert(index.includes('fonts.googleapis.com'));
  assert(!fs.readFileSync('src/App.jsx','utf8').includes('dangerouslySetInnerHTML'));
  console.log('PASS: React renders ' + output.length + ' characters; all 9 sections, 5 FAQs, 2 carousels, contacts, assets, fonts and build entrypoints are present.');
} finally {
  await server.close();
}
