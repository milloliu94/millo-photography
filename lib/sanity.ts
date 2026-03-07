import {createClient} from 'next-sanity'
import imageUrlBuilder from '@sanity/image-url'
import { projectId, dataset } from '@/sanity/env'

export const client = createClient({
  projectId,
  dataset: dataset || 'production',
  apiVersion: '2025-01-01',
  useCdn: true,
})

const builder = imageUrlBuilder({
  projectId,
  dataset: dataset || 'production',
})

// 宽松一点的类型声明，兼容多种 Sanity 图片源
export function urlFor(source: any) {
  return builder.image(source)
}

