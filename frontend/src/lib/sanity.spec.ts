import { expect, test, vi } from 'vitest'
import { getBlogPosts } from './sanity'

const fetchMock = vi.fn(() => Promise.resolve([]))

vi.mock('@sanity/client', () => ({
  createClient: () => ({ fetch: fetchMock }),
}))

test('getBlogPosts returns an array', async () => {
  const posts = await getBlogPosts()
  expect(Array.isArray(posts)).toBe(true)
  expect(fetchMock).toHaveBeenCalledOnce()
})
