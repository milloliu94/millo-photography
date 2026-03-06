'use client'

import Image from 'next/image'
import {useMemo, useState} from 'react'

export type Photo = {
  _id: string
  title?: string
  locationTag?: string
  shootingDate?: string
  image?: {
    _id: string
    url: string
    metadata?: {
      exif?: Record<string, string | number>
      location?: unknown
      palette?: unknown
    }
  }
}

type MasonryGalleryProps = {
  initialPhotos: Photo[]
  locations: string[]
}

export function MasonryGallery({initialPhotos, locations}: MasonryGalleryProps) {
  const [activeLocation, setActiveLocation] = useState<string | null>(null)
  const [activePhoto, setActivePhoto] = useState<Photo | null>(null)

  const filteredPhotos = useMemo(
    () =>
      activeLocation
        ? initialPhotos.filter((p) => p.locationTag === activeLocation)
        : initialPhotos,
    [activeLocation, initialPhotos],
  )

  return (
    <>
      {/* 标签筛选条 */}
      <div className="mb-6 flex flex-wrap gap-2">
        <button
          type="button"
          onClick={() => setActiveLocation(null)}
          className={`rounded-full border px-3 py-1 text-sm transition ${
            activeLocation === null
              ? 'border-black bg-black text-white'
              : 'border-zinc-300 bg-white text-zinc-700 hover:border-black'
          }`}
        >
          全部
        </button>
        {locations.map((loc) => (
          <button
            key={loc}
            type="button"
            onClick={() =>
              setActiveLocation((prev) => (prev === loc ? null : loc))
            }
            className={`rounded-full border px-3 py-1 text-sm transition ${
              activeLocation === loc
                ? 'border-black bg-black text-white'
                : 'border-zinc-300 bg-white text-zinc-700 hover:border-black'
            }`}
          >
            {loc}
          </button>
        ))}
      </div>

      {/* 瀑布流布局 */}
      <section className="columns-1 gap-4 sm:columns-2 lg:columns-3">
        {filteredPhotos.map((photo) =>
          photo.image?.url ? (
            <button
              key={photo._id}
              type="button"
              className="mb-4 w-full break-inside-avoid overflow-hidden rounded-lg bg-white"
              onClick={() => setActivePhoto(photo)}
            >
              <div className="relative w-full">
                {/* 使用普通 <img> 避免 masonry 高度问题 */}
                <img
                  src={photo.image.url}
                  alt={photo.title || photo.locationTag || 'photo'}
                  className="h-auto w-full cursor-zoom-in object-cover transition-transform duration-300 hover:scale-[1.01]"
                  loading="lazy"
                />
              </div>
            </button>
          ) : null,
        )}
      </section>

      {/* 巨幕模式弹窗 */}
      {activePhoto && activePhoto.image?.url && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 p-4"
          onClick={() => setActivePhoto(null)}
        >
          <div
            className="flex max-h-full w-full max-w-5xl flex-col gap-4"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between text-xs text-zinc-300">
              <div className="truncate">
                {activePhoto.title || activePhoto.locationTag}
              </div>
              <button
                type="button"
                className="rounded-full border border-zinc-500 px-2 py-0.5 text-xs text-zinc-200 hover:border-white hover:text-white"
                onClick={() => setActivePhoto(null)}
              >
                关闭
              </button>
            </div>

            <div className="flex flex-1 flex-col gap-4 lg:flex-row">
              <div className="relative flex-1 items-center justify-center">
                <Image
                  src={activePhoto.image.url}
                  alt={activePhoto.title || activePhoto.locationTag || 'photo'}
                  fill
                  sizes="100vw"
                  className="h-auto w-full rounded-md object-contain"
                />
              </div>

              {/* EXIF 信息 */}
              <aside className="w-full max-w-xs shrink-0 rounded-md bg-black/50 p-3 text-xs text-zinc-200">
                <h2 className="mb-2 text-[11px] font-semibold tracking-wide text-zinc-100">
                  EXIF 信息
                </h2>
                <ExifList exif={activePhoto.image.metadata?.exif} />
              </aside>
            </div>
          </div>
        </div>
      )}
    </>
  )
}

type ExifListProps = {
  exif?: Record<string, string | number> | null
}

function ExifList({exif}: ExifListProps) {
  if (!exif || Object.keys(exif).length === 0) {
    return <div className="text-zinc-400">无 EXIF 数据</div>
  }

  const preferredKeys = [
    'Model',
    'LensModel',
    'FocalLength',
    'FNumber',
    'ExposureTime',
    'ISOSpeedRatings',
    'DateTimeOriginal',
  ]

  const entries = preferredKeys
    .filter((key) => exif[key] != null)
    .map((key) => [key, exif[key]] as const)

  return (
    <dl className="space-y-1">
      {entries.map(([key, value]) => (
        <div key={key} className="flex justify-between gap-2">
          <dt className="flex-1 text-[11px] text-zinc-400">{key}</dt>
          <dd className="max-w-[60%] flex-1 text-right text-[11px] text-zinc-100">
            {String(value)}
          </dd>
        </div>
      ))}
    </dl>
  )
}

