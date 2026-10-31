import { Link } from 'react-router-dom'
import './KartuItem.css'

export default function KartuItem({ item }) {
  const { id, judul, kategori, tahun } = item

  return (
    <article className="kartu">
      <span className="lencana">{kategori}</span>
      <h3>
        <Link to={`/koleksi/${id}`}>{judul}</Link>
      </h3>
      {tahun ? <p className="kartu-tahun">Tahun {tahun}</p> : null}
    </article>
  )
}