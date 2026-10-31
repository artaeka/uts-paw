import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import IndikatorForm from '../components/IndikatorForm.jsx'
import PesanError from '../components/PesanError.jsx'
import useKoleksi from '../hooks/useKoleksi.js'
import './Tambah.css'

const KATEGORI_DASAR = ['Web', 'Mobile', 'Data', 'Desain']
const FORM_AWAL = { judul: '', kategori: 'Web', teknologi: '', tahun: '', tautan: '' }

function validasi({ judul, tahun }) {
  const galat = {}
  if (!judul.trim()) galat.judul = 'Judul tidak boleh kosong.'
  if (tahun !== '' && !Number.isInteger(Number(tahun))) galat.tahun = 'Tahun harus berupa angka bulat.'
  return galat
}

export default function Tambah() {
  const navigate = useNavigate()
  const { koleksi, tambahItem } = useKoleksi()
  const [form, setForm] = useState(FORM_AWAL)
  const [galat, setGalat] = useState({})

  const daftarKategori = [...new Set([...KATEGORI_DASAR, ...koleksi.map((item) => item.kategori)])]
  const terisi = Object.values(form).filter((nilai) => String(nilai).trim() !== '').length

  function handleUbah(e) {
    const { name, value } = e.target
    setForm((sebelumnya) => ({ ...sebelumnya, [name]: value }))
  }

  function handleSubmit(e) {
    e.preventDefault()
    const hasil = validasi(form)
    setGalat(hasil)
    if (Object.keys(hasil).length > 0) return

    tambahItem({
      judul: form.judul.trim(),
      kategori: form.kategori,
      teknologi: form.teknologi.trim(),
      tahun: form.tahun === '' ? '' : Number(form.tahun),
      tautan: form.tautan.trim(),
    })
    navigate('/koleksi')
  }

  return (
    <section>
      <h1>Tambah Proyek</h1>
      <form id="form-tambah" onSubmit={handleSubmit} noValidate>
        <div className="baris-form">
          <label htmlFor="judul">Judul</label>
          <input id="judul" name="judul" value={form.judul} onChange={handleUbah} />
          <PesanError pesan={galat.judul} />
        </div>

        <div className="baris-form">
          <label htmlFor="kategori">Kategori</label>
          <select id="kategori" name="kategori" value={form.kategori} onChange={handleUbah}>
            {daftarKategori.map((kategori) => (
              <option key={kategori} value={kategori}>
                {kategori}
              </option>
            ))}
          </select>
        </div>

        <div className="baris-form">
          <label htmlFor="teknologi">Teknologi</label>
          <input id="teknologi" name="teknologi" value={form.teknologi} onChange={handleUbah} />
        </div>

        <div className="baris-form">
          <label htmlFor="tahun">Tahun</label>
          <input id="tahun" name="tahun" type="number" value={form.tahun} onChange={handleUbah} />
          <PesanError pesan={galat.tahun} />
        </div>

        <div className="baris-form">
          <label htmlFor="tautan">Tautan</label>
          <input id="tautan" name="tautan" value={form.tautan} onChange={handleUbah} />
        </div>

        <IndikatorForm terisi={terisi} total={Object.keys(form).length} />

        <button type="submit" className="tombol">
          Simpan
        </button>
      </form>
    </section>
  )
}