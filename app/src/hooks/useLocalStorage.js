import { useEffect, useState } from 'react'

// State biasa yang otomatis tersimpan di localStorage.
export default function useLocalStorage(kunci, nilaiAwal) {
  const [nilai, setNilai] = useState(() => {
    try {
      const tersimpan = localStorage.getItem(kunci)
      return tersimpan ? JSON.parse(tersimpan) : nilaiAwal
    } catch {
      return nilaiAwal
    }
  })

  useEffect(() => {
    try {
      localStorage.setItem(kunci, JSON.stringify(nilai))
    } catch {
      // penyimpanan penuh atau diblokir: data tetap hidup di memori
    }
  }, [kunci, nilai])

  return [nilai, setNilai]
}