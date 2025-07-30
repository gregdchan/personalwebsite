import { expect, test, vi } from 'vitest';
import { getBlogPosts } from './sanity';

vi.mock('@sanity/client', () => {
  return {
    createClient: () => ({ fetch: vi.fn(() => Promise.resolve([])) })
  };
});

test('getBlogPosts returns an array', async () => {
  const posts = await getBlogPosts();
  expect(Array.isArray(posts)).toBe(true);
});
