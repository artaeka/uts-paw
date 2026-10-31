import PesanError from '../components/PesanError.jsx'
import useKoleksi from '../hooks/useKoleksi.js'
import './Statistik.css'

export default function Statistik() {
  const { koleksi, loading, error } = useKoleksi()

  const perKategori = koleksi.reduce((hitung, { kategori }) => {
    hitung[kategori] = (hitung[kategori] || 0) + 1
    return hitung
  }, {})

  return (
    <section>
      <h1>Statistik Proyek</h1>
      {loading && <p>Memuat data...</p>}
      <PesanError pesan={error} />
      {!loading && !error && (
        <table id="tabel-statistik">
          <thead>
            <tr>
              <th>Kategori</th>
              <th>Jumlah</th>
            </tr>
          </thead>
          <tbody>
            {Object.entries(perKategori).map(([kategori, jumlah]) => (
              <tr key={kategori}>
                <td>{kategori}</td>
                <td>{jumlah}</td>
              </tr>
            ))}
          </tbody>
          <tfoot>
            <tr>
              <th>Total</th>
              <th>{koleksi.length}</th>
            </tr>
          </tfoot>
        </table>
      )}
    </section>
  )
}