export const apiVersion =
  process.env.NEXT_PUBLIC_SANITY_API_VERSION || '2026-03-03'

export const dataset =
  process.env.NEXT_PUBLIC_SANITY_DATASET ?? 'production'

// Sanity projectId 只允许 a-z, 0-9, 短横线。从原始值里提取合法片段，避免 Vercel 等环境带不可见字符或引号导致被判为无效
function sanitizeProjectId(raw: string | undefined): string {
  if (raw == null || raw === '') return 'placeholder'
  const trimmed = raw.trim().replace(/^["']|["']$/g, '').trim()
  const match = trimmed.match(/[a-z0-9-]+/)
  return match ? match[0] : 'placeholder'
}

export const projectId = sanitizeProjectId(
  process.env.NEXT_PUBLIC_SANITY_PROJECT_ID
)
