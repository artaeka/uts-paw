import { useContext } from 'react'
import { KoleksiContext } from '../context/KoleksiContext.jsx'

// Jalan pintas untuk membaca context koleksi dari halaman mana pun.
export default function useKoleksi() {
  const konteks = useContext(KoleksiContext)
  if (!konteks) {
    throw new Error('useKoleksi harus dipakai di dalam KoleksiProvider')
  }
  return konteks
}