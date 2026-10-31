import { createContext, useEffect, useMemo, useState } from 'react'
import useLocalStorage from '../hooks/useLocalStorage.js'

export const KoleksiContext = createContext(null)

export function KoleksiProvider({ children }) {
  const [awal, setAwal] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  // Data dari JSON tidak diubah; item baru dan item yang dihapus dicatat terpisah.
  const [tambahan, setTambahan] = useLocalStorage('uts-paw:tambahan', [])
  const [dihapus, setDihapus] = useLocalStorage('uts-paw:dihapus', [])

  useEffect(() => {
    let batal = false

    async function muatData() {
      try {
        const res = await fetch(`${import.meta.env.BASE_URL}data/koleksi.json`)
        if (!res.ok) throw new Error(`Gagal memuat data (status ${res.status})`)
        const data = await res.json()
        if (!batal) setAwal(data)
      } catch (err) {
        if (!batal) setError(err.message)
      } finally {
        if (!batal) setLoading(false)
      }
    }

    muatData()
    return () => {
      batal = true
    }
  }, [])

  const koleksi = useMemo(
    () => [...awal, ...tambahan].filter((item) => !dihapus.includes(item.id)),
    [awal, tambahan, dihapus],
  )

  function tambahItem(data) {
    const item = { ...data, id: `baru-${Date.now()}` }
    setTambahan((sebelumnya) => [...sebelumnya, item])
    return item
  }

  function hapusItem(id) {
    setTambahan((sebelumnya) => sebelumnya.filter((item) => item.id !== id))
    setDihapus((sebelumnya) => (sebelumnya.includes(id) ? sebelumnya : [...sebelumnya, id]))
  }

  const nilai = { koleksi, loading, error, tambahItem, hapusItem }
  return <KoleksiContext.Provider value={nilai}>{children}</KoleksiContext.Provider>
}