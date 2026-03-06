import {client, urlFor} from '@/lib/sanity'
import {AboutClient} from './AboutClient'

export default async function AboutPage() {
  const avatar = await client.fetch<{image?: unknown} | null>(
    `*[_type == "photo" && theme == "avatar" && defined(image.asset)][0]{image}`,
  )

  const url =
    avatar?.image ? urlFor(avatar.image).width(600).height(600).fit('crop').url() : null
  const avatarUrl: string =
    typeof url === 'string' ? url : '/about-main-portrait.jpg'

  return <AboutClient avatarUrl={avatarUrl} />
}
