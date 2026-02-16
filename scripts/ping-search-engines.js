#!/usr/bin/env node
/**
 * Ping multiple search engines with sitemap and IndexNow
 * - Google: sitemap ping
 * - Bing: sitemap ping + IndexNow
 * - Yandex: sitemap ping
 * - IndexNow: Bing, Yahoo, Yandex, Seznam, etc.
 */

const SITE_URL = 'https://trovaintegratori.it';
const SITEMAP_URL = `${SITE_URL}/sitemap.xml`;
const INDEXNOW_KEY = 'de0fb686485f45e59d177a52174e083b';

async function pingGoogle() {
  try {
    const url = `https://www.google.com/ping?sitemap=${encodeURIComponent(SITEMAP_URL)}`;
    const res = await fetch(url);
    console.log(`✅ Google ping: ${res.status}`);
  } catch (err) {
    console.error(`❌ Google ping failed:`, err.message);
  }
}

async function pingBing() {
  try {
    const url = `https://www.bing.com/ping?sitemap=${encodeURIComponent(SITEMAP_URL)}`;
    const res = await fetch(url);
    console.log(`✅ Bing sitemap ping: ${res.status}`);
  } catch (err) {
    console.error(`❌ Bing ping failed:`, err.message);
  }
}

async function pingYandex() {
  try {
    const url = `https://webmaster.yandex.com/ping?sitemap=${encodeURIComponent(SITEMAP_URL)}`;
    const res = await fetch(url);
    console.log(`✅ Yandex ping: ${res.status}`);
  } catch (err) {
    console.error(`❌ Yandex ping failed:`, err.message);
  }
}

async function pingIndexNow() {
  // IndexNow notifies: Bing, Yahoo, Yandex, Seznam, Naver, and others
  const endpoints = [
    'https://api.indexnow.org/indexnow',
    'https://www.bing.com/indexnow',
    'https://yandex.com/indexnow',
  ];

  const body = JSON.stringify({
    host: 'trovaintegratori.it',
    key: INDEXNOW_KEY,
    keyLocation: `${SITE_URL}/${INDEXNOW_KEY}.txt`,
    urlList: [
      SITE_URL,
      `${SITE_URL}/blog`,
      `${SITE_URL}/confronta`,
      `${SITE_URL}/come-funziona`,
      SITEMAP_URL,
    ],
  });

  for (const endpoint of endpoints) {
    try {
      const res = await fetch(endpoint, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body,
      });
      console.log(`✅ IndexNow (${new URL(endpoint).hostname}): ${res.status}`);
    } catch (err) {
      console.error(`❌ IndexNow (${new URL(endpoint).hostname}) failed:`, err.message);
    }
  }
}

async function main() {
  console.log(`🔍 Pinging search engines for ${SITE_URL}`);
  console.log(`📄 Sitemap: ${SITEMAP_URL}`);
  console.log('---');

  await Promise.all([
    pingGoogle(),
    pingBing(),
    pingYandex(),
    pingIndexNow(),
  ]);

  console.log('---');
  console.log('✅ Done!');
}

main();
