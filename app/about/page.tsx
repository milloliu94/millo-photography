import {client, urlFor} from '@/lib/sanity'
import {AboutClient} from './AboutClient'

export default async function AboutPage() {
  const avatar = await client.fetch<{image?: unknown} | null>(
    `*[_type == "photo" && theme == "avatar" && defined(image.asset)][0]{image}`,
  )

  const avatarUrl =
    avatar?.image && urlFor(avatar.image).width(600).height(600).fit('crop').url()

  return <AboutClient avatarUrl={avatarUrl ?? '/about-main-portrait.jpg'} />
}
