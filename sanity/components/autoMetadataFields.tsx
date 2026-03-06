'use client'

import {useState} from 'react'
import {set, type StringInputProps, type DateInputProps, useClient, useFormValue} from 'sanity'

async function fetchExif(client: ReturnType<typeof useClient>, assetRef?: string) {
  if (!assetRef) return null
  const exif = await client.fetch(
    `*[_id == $id][0].metadata.exif`,
    {id: assetRef},
  )
  return exif as Record<string, unknown> | null
}

export function CameraModelInput(props: StringInputProps) {
  const {renderDefault, onChange} = props
  const client = useClient({apiVersion: '2025-01-01'})
  const image = useFormValue(['image']) as {asset?: {_ref?: string}} | null
  const [loading, setLoading] = useState(false)

  const handleFill = async () => {
    const assetRef = image?.asset?._ref
    if (!assetRef) return
    setLoading(true)
    try {
      const exif = await fetchExif(client, assetRef)
      const model = (exif?.Model as string) || (exif?.ModelName as string)
      if (model) {
        onChange(set(model))
      }
    } finally {
      setLoading(false)
    }
  }

  return (
    <div>
      {renderDefault(props)}
      <button
        type="button"
        onClick={handleFill}
        disabled={loading}
        style={{
          marginTop: '0.5rem',
          padding: '0.25rem 0.75rem',
          fontSize: '0.75rem',
          borderRadius: '999px',
          border: '1px solid #e5e5e5',
          background: loading ? '#f5f5f5' : '#fafafa',
          cursor: loading ? 'default' : 'pointer',
        }}
      >
        {loading ? '正在从图片读取…' : '从图片自动填充相机型号'}
      </button>
    </div>
  )
}

export function ShootingDateInput(props: DateInputProps) {
  const {renderDefault, onChange} = props
  const client = useClient({apiVersion: '2025-01-01'})
  const image = useFormValue(['image']) as {asset?: {_ref?: string}} | null
  const [loading, setLoading] = useState(false)

  const handleFill = async () => {
    const assetRef = image?.asset?._ref
    if (!assetRef) return
    setLoading(true)
    try {
      const exif = await fetchExif(client, assetRef)
      const raw =
        (exif?.DateTimeOriginal as string | undefined) ||
        (exif?.CreateDate as string | undefined) ||
        (exif?.DateTime as string | undefined)
      if (raw) {
        // EXIF 时间通常是 2025:08:31 12:34:56 形式，这里只取日期部分并替换为 YYYY-MM-DD
        const datePart = raw.split(' ')[0]?.replace(/:/g, '-')
        if (datePart) {
          onChange(set(datePart))
        }
      }
    } finally {
      setLoading(false)
    }
  }

  return (
    <div>
      {renderDefault(props)}
      <button
        type="button"
        onClick={handleFill}
        disabled={loading}
        style={{
          marginTop: '0.5rem',
          padding: '0.25rem 0.75rem',
          fontSize: '0.75rem',
          borderRadius: '999px',
          border: '1px solid #e5e5e5',
          background: loading ? '#f5f5f5' : '#fafafa',
          cursor: loading ? 'default' : 'pointer',
        }}
      >
        {loading ? '正在从图片读取…' : '从图片自动填充拍摄日期'}
      </button>
    </div>
  )
}

