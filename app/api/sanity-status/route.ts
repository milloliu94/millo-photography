import { NextResponse } from 'next/server'
import { projectId, dataset } from '@/sanity/env'

/**
 * 诊断接口：部署后访问 /api/sanity-status 可确认环境变量是否生效。
 * 确认无误后可删除此文件。
 */
export async function GET() {
  const rawEnv = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID
  const configured = projectId !== 'placeholder'
  return NextResponse.json({
    projectId: configured ? projectId : 'placeholder (未配置或无效)',
    dataset,
    configured,
    // 运行时是否读到该变量：有长度说明 Vercel 运行时已注入，若仍 placeholder 多半是构建时未注入
    envAtRuntime: rawEnv === undefined ? 'missing' : `present (${rawEnv.length} chars)`,
    hint: configured
      ? 'Sanity 环境已配置，若仍无图请检查 Sanity CORS 与图源数据。'
      : '请在 Vercel 为 Production 配置 NEXT_PUBLIC_SANITY_PROJECT_ID 并重新部署（不用 Build Cache）。',
  })
}
