import {client} from '@/lib/sanity'
import {GalleryClient, type GalleryPhoto} from './GalleryClient'

async function getGalleryPhotos(): Promise<GalleryPhoto[]> {
  const photos = await client.fetch<GalleryPhoto[]>(
    `*[_type == "photo" && defined(image.asset) && theme != "avatar"] | order(shootingDate desc){
      _id,
      title,
      locationTag,
      cameraModel,
      city,
      theme,
      "image": image{
        ...,
        asset->{
          _id,
          url,
          metadata{
            exif,
            location,
            palette
          }
        }
      }
    }`,
  )

  return photos
}

export default async function GalleryPage() {
  const photos = await getGalleryPhotos()

  return <GalleryClient photos={photos} />
}
