import {client, urlFor} from '@/lib/sanity'
import {AboutClient} from './AboutClient'

export default async function AboutPage() {
  let avatarUrl: string = '/about-main-portrait.jpg'

  try {
    const avatar = await client.fetch<{image?: unknown} | null>(
      `*[_type == "photo" && theme == "avatar" && defined(image.asset)][0]{image}`,
    )
    const url =
      avatar?.image ? urlFor(avatar.image).width(600).height(600).fit('crop').url() : null
    if (typeof url === 'string') avatarUrl = url
  } catch {
    // 构建或运行时 Sanity 不可用时使用默认头像
  }

  return <AboutClient avatarUrl={avatarUrl} />
}
