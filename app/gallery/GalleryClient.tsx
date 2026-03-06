'use client'

import Link from 'next/link'
import Image from 'next/image'
import {useMemo, useState} from 'react'
import {urlFor} from '@/lib/sanity'

export type GalleryPhoto = {
  _id: string
  title?: string
  locationTag?: string
  cameraModel?: string
  city?: string
  theme?: string
  image?: {
    _id: string
    url: string
    metadata?: {
      exif?: {
        Model?: string
        [key: string]: unknown
      }
      location?: unknown
      palette?: unknown
    }
  }
}

type Props = {
  photos: GalleryPhoto[]
}

export function GalleryClient({photos}: Props) {
  const [activeCity, setActiveCity] = useState<string | null>(null)
  const [activeTheme, setActiveTheme] = useState<string | null>(null)

  const cities = useMemo(
    () =>
      Array.from(
        new Set(
          photos
            .map((p) => {
              const raw = p.city || p.locationTag
              return raw ? raw.split(/[\/／]/)[0]?.trim() : undefined
            })
            .filter((v): v is string => Boolean(v)),
        ),
      ),
    [photos],
  )

  const themes = useMemo(
    () =>
      Array.from(
        new Set(
          photos
            .map((p) => p.theme)
            .filter((v): v is string => Boolean(v)),
        ),
      ),
    [photos],
  )

  const filteredPhotos = useMemo(
    () =>
      photos.filter((photo) => {
        const rawCity = photo.city || photo.locationTag
        const city = rawCity ? rawCity.split(/[\/／]/)[0]?.trim() : undefined
        const theme = photo.theme

        const cityOk = activeCity ? city === activeCity : true
        const themeOk = activeTheme ? theme === activeTheme : true

        return cityOk && themeOk
      }),
    [photos, activeCity, activeTheme],
  )

  return (
    <div className="min-h-screen bg-white text-black">
      {/* 顶部导航 */}
      <header className="sticky top-0 z-20 border-b bg-white/95 backdrop-blur">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
          <Link
            href="/"
            className="text-sm font-semibold tracking-[0.3em] text-zinc-900"
          >
            MILLO&apos;S PHOTOGRAPHY
          </Link>
        </div>

        {/* 筛选栏 */}
        <div className="border-t bg-white">
          <div className="mx-auto flex max-w-4xl flex-col items-center gap-3 px-4 py-4 text-sm">
            {/* 城市行 */}
            <div className="flex flex-wrap items-center justify-center gap-2">
              <span className="mr-2 text-xs text-zinc-500">城市</span>
              <FilterPill
                label="全部城市"
                active={!activeCity}
                onClick={() => setActiveCity(null)}
              />
              {cities.map((city) => (
                <FilterPill
                  key={city}
                  label={city}
                  active={activeCity === city}
                  onClick={() =>
                    setActiveCity((prev) => (prev === city ? null : city))
                  }
                />
              ))}
            </div>

            {/* 主题行 */}
            <div className="flex flex-wrap items-center justify-center gap-2">
              <span className="mr-2 text-xs text-zinc-500">主题</span>
              <FilterPill
                label="#全部题材"
                active={!activeTheme}
                onClick={() => setActiveTheme(null)}
              />
              {themes.map((theme) => (
                <FilterPill
                  key={theme}
                  label={`#${theme}`}
                  active={activeTheme === theme}
                  onClick={() =>
                    setActiveTheme((prev) => (prev === theme ? null : theme))
                  }
                />
              ))}
            </div>
          </div>
        </div>
      </header>

      {/* 三列瀑布流 */}
      <main className="mx-auto max-w-6xl px-4 pb-10 pt-8">
        <section className="columns-1 gap-6 sm:columns-2 lg:columns-3">
          {filteredPhotos.map((photo) => {
            const src =
              photo.image && urlFor(photo.image).width(1600).auto('format').url()
            if (!src) return null

            const model = photo.cameraModel || photo.image?.metadata?.exif?.Model
            const location = photo.locationTag

              return (
                <Link
                  href={`/gallery/${photo._id}`}
                  key={photo._id}
                  className="mb-5 block break-inside-avoid"
                  aria-label={photo.title || location || model || 'photo'}
                >
                  <div className="overflow-hidden rounded-lg bg-white">
                    <Image
                      src={src}
                      alt={photo.title || location || model || 'photo'}
                      width={800}
                      height={1000}
                      className="h-auto w-full object-cover transition-transform duration-500 hover:scale-[1.02]"
                      sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
                    />
                  </div>
                  {photo.title && (
                    <div className="mt-2 text-[12px] font-medium text-zinc-900">
                      {photo.title}
                    </div>
                  )}
                  <div className="mt-1 flex items-center justify-between text-[11px] text-zinc-600">
                    <span className="truncate">{model}</span>
                    <span className="truncate">{location}</span>
                  </div>
                </Link>
              )
          })}
        </section>
      </main>
    </div>
  )
}

type FilterPillProps = {
  label: string
  active: boolean
  onClick: () => void
}

function FilterPill({label, active, onClick}: FilterPillProps) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`rounded-full border px-3 py-1 text-xs tracking-wide transition ${
        active
          ? 'border-black bg-black text-white'
          : 'border-zinc-300 bg-white text-zinc-700 hover:border-black'
      }`}
    >
      {label}
    </button>
  )
}

