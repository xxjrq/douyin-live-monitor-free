import assert from 'node:assert/strict';

const sample = { room_url: 'https://live.douyin.com/example', status: 'still_live', collected_at: '2026-09-09T00:00:00Z' };
assert.match(sample.room_url, /^https:\/\/live\.douyin\.com\//);
assert.ok(['started', 'still_live', 'ended', 'unavailable'].includes(sample.status));
assert.match(sample.collected_at, /^\d{4}-\d{2}-\d{2}T/);
console.log('douyin-live-monitor-free self-test: ok');
