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

export function urlFor(source: unknown) {
  return builder.image(source)
}

