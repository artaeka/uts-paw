import mahasiswa from '../../mahasiswa.json'

export default function Tentang() {
  const { nama, nim, kelas, tema } = mahasiswa

  return (
    <section>
      <h1>Tentang</h1>
      <p>Aplikasi ini dibuat untuk Ujian Tengah Semester Pengembangan Aplikasi Web.</p>
      <dl className="rincian">
        <dt>Nama</dt>
        <dd>{nama}</dd>
        <dt>NIM</dt>
        <dd>{nim}</dd>
        <dt>Kelas</dt>
        <dd>{kelas}</dd>
        <dt>Tema</dt>
        <dd>{tema}</dd>
      </dl>
    </section>
  )
}