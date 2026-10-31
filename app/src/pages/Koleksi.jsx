import { useState } from 'react'
import KartuItem from '../components/KartuItem.jsx'
import KotakPencarian from '../components/KotakPencarian.jsx'
import PesanError from '../components/PesanError.jsx'
import useKoleksi from '../hooks/useKoleksi.js'
import './Koleksi.css'

export default function Koleksi() {
  const { koleksi, loading, error } = useKoleksi()
  const [kata, setKata] = useState('')

  const tampil = koleksi.filter((item) => item.judul.toLowerCase().includes(kata.trim().toLowerCase()))

  return (
    <section>
      <h1>Daftar Proyek</h1>
      <KotakPencarian nilai={kata} onUbah={setKata} />

      {loading && <p>Memuat data...</p>}
      <PesanError pesan={error} />
      {!loading && !error && tampil.length === 0 && <p>Tidak ada proyek yang cocok.</p>}

      <div className="daftar-kartu">
        {tampil.map((item) => (
          <KartuItem key={item.id} item={item} />
        ))}
      </div>
    </section>
  )
}