import { NavLink, Outlet } from 'react-router-dom'
import './TataLetak.css'

export default function TataLetak() {
  return (
    <>
      <header>
        <strong>Portofolio Proyek</strong>
        <nav>
          <NavLink to="/" end>Beranda</NavLink>
          <NavLink to="/koleksi">Koleksi</NavLink>
          <NavLink to="/tambah">Tambah</NavLink>
          <NavLink to="/statistik">Statistik</NavLink>
          <NavLink to="/tentang">Tentang</NavLink>
        </nav>
      </header>
      <main>
        <Outlet />
      </main>
      <footer>
        <p>UTS Pengembangan Aplikasi Web</p>
      </footer>
    </>
  )
}