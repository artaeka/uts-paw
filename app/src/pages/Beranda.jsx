import { Link } from 'react-router-dom'
import mahasiswa from '../../mahasiswa.json'
import useKoleksi from '../hooks/useKoleksi.js'
import './Beranda.css'

export default function Beranda() {
  const { koleksi, loading, error } = useKoleksi()
  const jumlahKategori = new Set(koleksi.map((item) => item.kategori)).size

  return (
    <section>
      <h1>Daftar Tugas</h1>
      <p>Tema: Portofolio Proyek</p>

      {loading && <p>Memuat ringkasan...</p>}
      {error && <p>Ringkasan belum tersedia.</p>}
      {!loading && !error && (
        <ul className="ringkasan">
          <li>
            <strong>{koleksi.length}</strong> proyek
          </li>
          <li>
            <strong>{jumlahKategori}</strong> kategori
          </li>
        </ul>
      )}

      <Link to="/koleksi" className="tombol">
        Lihat semua proyek
      </Link>
    </section>
  )
}