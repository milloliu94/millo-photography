import Link from 'next/link'
import Image from 'next/image'
import {client} from '@/sanity/lib/client'
import {urlFor} from '@/lib/sanity'

type HeroPhoto = {
  _id: string
  title?: string
  locationTag?: string
  image?: {
    _type?: string
    asset?: {
      _ref?: string
      _type?: string
    }
  }
}

async function getHeroPhotos(): Promise<HeroPhoto[]> {
  const photos = await client.fetch<HeroPhoto[]>(
    `*[_type == "photo" && defined(image) && theme != "avatar"] | order(shootingDate desc){
      _id,
      title,
      locationTag,
      image
    }`,
  )

  return photos
}

export default async function Home() {
  const photos = await getHeroPhotos()

  const leftPhotos = photos.filter((_, index) => index % 2 === 0)
  const rightPhotos = photos.filter((_, index) => index % 2 === 1)

  return (
    <div className="h-screen overflow-hidden bg-white text-black">
      {/* 顶部导航 */}
      <header className="border-b">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
          <Link
            href="/"
            className="text-sm font-semibold tracking-[0.3em] text-zinc-900 hover:opacity-80"
          >
            MILLO&apos;S PHOTOGRAPHY
          </Link>
          <nav className="flex gap-6 text-xs uppercase tracking-[0.25em] text-zinc-600">
            <Link href="/gallery" className="hover:text-black">
              Works
            </Link>
            <Link href="/about" className="hover:text-black">
              About
            </Link>
          </nav>
        </div>
      </header>

      {/* Hero 区域：左文字 + 右瀑布流预览 */}
      <main className="mx-auto flex h-[calc(100vh-65px)] max-w-6xl flex-col px-8 py-10 lg:flex-row lg:items-stretch lg:gap-10">
        {/* 左侧文案 */}
        <section className="flex flex-1 flex-col justify-center pb-10 lg:pb-0">
          <div className="mb-6 inline-flex items-center rounded-full border border-zinc-200 px-2 py-0.5 text-[9px] tracking-[0.14em] text-zinc-500">
            ESTABLISHED / 2026
          </div>
          <h1
            className="mb-8 text-[3.6rem] font-black leading-none tracking-[-0.02em] text-zinc-900 sm:text-[4.6rem] lg:text-[5.2rem]"
            style={{
              fontFamily:
                '"SF Pro Rounded", system-ui, -apple-system, BlinkMacSystemFont, "Helvetica Neue", Arial, sans-serif',
            }}
          >
            MILLO&apos;S
            <br />
            PHOTOGRAPHY
          </h1>
          <Link
            href="/gallery"
            className="group inline-flex items-center text-xs tracking-[0.3em] text-zinc-800"
          >
            <span>ENTER GALLERY</span>
            <span className="ml-3 h-px w-10 bg-zinc-300 transition-all duration-300 group-hover:w-16 group-hover:bg-zinc-800" />
          </Link>
        </section>

        {/* 右侧双列自动滚动瀑布流预览 */}
        <section className="flex-1">
          <div className="h-full border-l border-zinc-100 pl-4">
            <div className="hero-gallery flex h-full gap-3 overflow-hidden">
              {/* 左列：向上滚动 */}
              <div className="relative w-1/2 overflow-hidden">
                <div className="gallery-column-up flex flex-col gap-4">
                  {[...leftPhotos, ...leftPhotos].map((photo, idx) => {
                    const src =
                      photo.image &&
                      urlFor(photo.image).width(1000).auto('format').url()
                    if (!src) return null

                    return (
                      <div
                        key={`${photo._id}-${idx}`}
                        className="overflow-hidden rounded-lg bg-white shadow-[0_4px_16px_rgba(0,0,0,0.03)]"
                      >
                        <Image
                          src={src}
                          alt={photo.title || photo.locationTag || 'photo'}
                          width={1000}
                          height={700}
                          className="h-auto w-full object-cover"
                          sizes="(min-width: 1024px) 20vw, (min-width: 640px) 33vw, 50vw"
                        />
                      </div>
                    )
                  })}
                </div>
              </div>

              {/* 右列：向下滚动 */}
              <div className="relative w-1/2 overflow-hidden">
                <div className="gallery-column-down flex flex-col gap-4">
                  {[...rightPhotos, ...rightPhotos].map((photo, idx) => {
                    const src =
                      photo.image &&
                      urlFor(photo.image).width(1000).auto('format').url()
                    if (!src) return null

                    return (
                      <div
                        key={`${photo._id}-${idx}`}
                        className="overflow-hidden rounded-lg bg-white shadow-[0_4px_16px_rgba(0,0,0,0.03)]"
                      >
                        <Image
                          src={src}
                          alt={photo.title || photo.locationTag || 'photo'}
                          width={1000}
                          height={700}
                          className="h-auto w-full object-cover"
                          sizes="(min-width: 1024px) 20vw, (min-width: 640px) 33vw, 50vw"
                        />
                      </div>
                    )
                  })}
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
    </div>
  )
}
