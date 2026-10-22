import type { MetadataRoute } from 'next'

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: process.env.NEXT_PUBLIC_APP_NAME || 'Elemes LMS',
    short_name: 'ElemesLMS',
    description: 'Elemes LMS: Universal Learning Management System Progressive Web App',
    start_url: '/',
    display: 'standalone',
    background_color: '#ffffff',
    theme_color: '#0f766e',
    icons: [
      {
        src: '/icon-192x192.svg',
        sizes: '192x192',
        type: 'image/svg+xml',
      },
      {
        src: '/icon-512x512.svg',
        sizes: '512x512',
        type: 'image/svg+xml',
      },
    ],
  }
}
