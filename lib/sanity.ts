import {createClient} from 'next-sanity'
import imageUrlBuilder from '@sanity/image-url'

const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID
const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET

if (!projectId || !dataset) {
  throw new Error('Missing Sanity configuration in .env.local')
}

export const client = createClient({
  projectId,
  dataset,
  apiVersion: '2025-01-01',
  useCdn: true,
})

const builder = imageUrlBuilder({projectId, dataset})

// 宽松一点的类型声明，兼容多种 Sanity 图片源
export function urlFor(source: any) {
  return builder.image(source)
}

