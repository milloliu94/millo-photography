import Link from 'next/link'
import {client} from '@/lib/sanity'

type PhotoDetail = {
  _id: string
  title?: string
  locationTag?: string
  shootingDate?: string
  theme?: string
  cameraModel?: string
  image?: {
    url?: string
    metadata?: {
      exif?: {
        Model?: string
        [key: string]: unknown
      }
    }
  }
}

async function getPhoto(id: string): Promise<PhotoDetail | null> {
  const photo = await client.fetch<PhotoDetail | null>(
    `*[_type == "photo" && _id == $id][0]{
      _id,
      title,
      locationTag,
      shootingDate,
      cameraModel,
      theme,
      "image": image.asset->{
        url,
        metadata{
          exif
        }
      }
    }`,
    {id},
  )

  return photo
}

export default async function PhotoPage({
  params,
}: {
  params: Promise<{id: string}>
}) {
  const {id} = await params
  let photo: PhotoDetail | null = null
  try {
    photo = await getPhoto(id)
  } catch {
    // 构建或运行时 Sanity 不可用时视为找不到
  }

  if (!photo) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-white text-sm text-zinc-500">
        <div>找不到这张照片。</div>
      </main>
    )
  }

  const src = photo.image?.url

  const model = photo.cameraModel || photo.image?.metadata?.exif?.Model

  return (
    <main className="flex min-h-screen bg-white text-black">
      {/* 左侧大图：保持原始宽高比例，横图不再被裁成竖图 */}
      <section className="flex min-h-screen flex-1 items-center justify-center px-6 py-10 sm:px-10">
        <div className="w-full max-w-4xl">
          {src && (
            <img
              src={src}
              alt={photo.title || photo.locationTag || 'photo'}
              className="w-full h-auto max-h-[80vh] object-contain shadow-[0_10px_30px_rgba(0,0,0,0.08)]"
            />
          )}
        </div>
      </section>

      {/* 右侧信息栏 */}
      <aside className="flex w-full max-w-xs flex-col border-l border-zinc-100 px-8 py-10 text-xs text-zinc-500 sm:max-w-sm">
        <div className="mb-10 flex items-start justify-between">
          <div>
            <h1 className="mb-2 text-lg font-semibold tracking-tight text-zinc-900">
              {photo.title || photo.locationTag || 'Untitled'}
            </h1>
          </div>
          <Link
            href="/gallery"
            className="text-[10px] uppercase tracking-[0.2em] text-zinc-400 hover:text-zinc-700"
          >
            ✕
          </Link>
        </div>

        <div className="space-y-6">
          <InfoBlock label="LOCATION" value={photo.locationTag} />
          <InfoBlock label="EQUIPMENT" value={model} />
          <InfoBlock label="CAPTURED ON" value={photo.shootingDate} />
          {photo.theme && (
            <div>
              <div className="mb-2 text-[10px] tracking-[0.25em] text-zinc-400">
                TAGS
              </div>
              <div className="inline-flex rounded-full border border-zinc-200 px-3 py-1 text-[11px] text-zinc-700">
                {photo.theme}
              </div>
            </div>
          )}
        </div>
      </aside>
    </main>
  )
}

function InfoBlock({label, value}: {label: string; value?: string}) {
  return (
    <div>
      <div className="mb-1 text-[10px] tracking-[0.25em] text-zinc-400">
        {label}
      </div>
      <div className="text-xs text-zinc-700">{value || '—'}</div>
    </div>
  )
}

