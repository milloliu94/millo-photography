export const apiVersion =
  process.env.NEXT_PUBLIC_SANITY_API_VERSION || '2026-03-03'

export const dataset =
  process.env.NEXT_PUBLIC_SANITY_DATASET ?? 'production'

// Sanity projectId 只允许 a-z, 0-9, 短横线；去掉引号/空格，避免 Vercel 等环境配置带错格式
function sanitizeProjectId(raw: string | undefined): string {
  if (raw == null || raw === '') return 'placeholder'
  const trimmed = raw.trim().replace(/^["']|["']$/g, '').trim()
  if (trimmed.length === 0) return 'placeholder'
  if (!/^[a-z0-9-]+$/.test(trimmed)) return 'placeholder'
  return trimmed
}

export const projectId = sanitizeProjectId(
  process.env.NEXT_PUBLIC_SANITY_PROJECT_ID
)
