import { Link, useNavigate, useParams } from 'react-router-dom'
import PesanError from '../components/PesanError.jsx'
import useKoleksi from '../hooks/useKoleksi.js'

export default function Detail() {
  const { id } = useParams()
  const navigate = useNavigate()
  const { koleksi, loading, error, hapusItem } = useKoleksi()

  if (loading) return <p>Memuat detail...</p>
  if (error) return <PesanError pesan={error} />

  const item = koleksi.find((data) => data.id === id)

  if (!item) {
    return (
      <section>
        <h1>Proyek tidak ditemukan</h1>
        <p>Tidak ada proyek dengan id &quot;{id}&quot;.</p>
        <Link to="/koleksi" className="tombol">
          Kembali ke koleksi
        </Link>
      </section>
    )
  }

  function handleHapus() {
    if (window.confirm(`Hapus proyek "${item.judul}"?`)) {
      hapusItem(item.id)
      navigate('/koleksi')
    }
  }

  return (
    <section>
      <h1>{item.judul}</h1>
      <p>
        <span className="lencana">{item.kategori}</span>
      </p>

      <dl className="rincian">
        <dt>Teknologi</dt>
        <dd>{item.teknologi || '-'}</dd>
        <dt>Tahun</dt>
        <dd>{item.tahun || '-'}</dd>
        <dt>Tautan</dt>
        <dd>
          {item.tautan ? (
            <a href={item.tautan} target="_blank" rel="noreferrer">
              {item.tautan}
            </a>
          ) : (
            '-'
          )}
        </dd>
      </dl>

      <div className="aksi">
        <Link to="/koleksi" className="tombol">
          Kembali
        </Link>
        <button type="button" className="tombol bahaya" onClick={handleHapus}>
          Hapus
        </button>
      </div>
    </section>
  )
}