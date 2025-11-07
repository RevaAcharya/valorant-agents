import { useEffect, useState } from 'react'

export default function useLocalCache(key, fetcher, { ttl = 1000 * 60 * 30 } = {}) {
  const [data, setData] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    let mounted = true

    async function load() {
      try {
        setLoading(true)
        const cached = localStorage.getItem(key)
        if (cached) {
          const { savedAt, value } = JSON.parse(cached)
          if (Date.now() - savedAt < ttl) {
            setData(value)
            setLoading(false)
            return
          }
        }

        const fresh = await fetcher()
        if (!mounted) return
        setData(fresh)
        localStorage.setItem(key, JSON.stringify({ value: fresh, savedAt: Date.now() }))
      } catch (e) {
        if (!mounted) return
        setError(e)
      } finally {
        if (mounted) setLoading(false)
      }
    }

    load()
    return () => { mounted = false }
  }, [key])

  return { data, loading, error }
}
