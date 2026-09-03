import { useEffect } from 'react'
import { Head } from 'vite-react-ssg'

const BASE = 'https://logicloopsai.com'

/**
 * Per-page SEO. <Head> prerenders title/description/canonical/OG into the static
 * HTML at build time (what crawlers read). The effect keeps the browser tab title
 * and canonical in sync on client-side (SPA) navigation, for UX + analytics.
 */
export default function SEO({ title, description, path = '/', keywords, schema, image = `${BASE}/og-image.png` }) {
  const url = `${BASE}${path}`

  useEffect(() => {
    if (title) document.title = title
    let link = document.querySelector('link[rel="canonical"]')
    if (!link) {
      link = document.createElement('link')
      link.rel = 'canonical'
      document.head.appendChild(link)
    }
    link.href = url
  }, [title, url])

  return (
    <Head>
      <title>{title}</title>
      <meta name="description" content={description} />
      {keywords && <meta name="keywords" content={keywords} />}
      <link rel="canonical" href={url} />

      <meta property="og:type" content="website" />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:url" content={url} />
      <meta property="og:image" content={image} />

      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={image} />

      {schema && <script type="application/ld+json">{JSON.stringify(schema)}</script>}
    </Head>
  )
}
