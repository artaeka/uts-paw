import { Route, Routes } from 'react-router-dom'
import TataLetak from './components/TataLetak.jsx'
import { KoleksiProvider } from './context/KoleksiContext.jsx'
import Beranda from './pages/Beranda.jsx'
import Detail from './pages/Detail.jsx'
import Koleksi from './pages/Koleksi.jsx'
import Statistik from './pages/Statistik.jsx'
import Tambah from './pages/Tambah.jsx'
import Tentang from './pages/Tentang.jsx'
import TidakDitemukan from './pages/TidakDitemukan.jsx'

// Router ada di main.jsx; Provider Context diletakkan di sini.
export default function App() {
  return (
    <KoleksiProvider>
      <Routes>
        <Route element={<TataLetak />}>
          <Route path="/" element={<Beranda />} />
          <Route path="/koleksi" element={<Koleksi />} />
          <Route path="/koleksi/:id" element={<Detail />} />
          <Route path="/tambah" element={<Tambah />} />
          <Route path="/statistik" element={<Statistik />} />
          <Route path="/tentang" element={<Tentang />} />
          <Route path="*" element={<TidakDitemukan />} />
        </Route>
      </Routes>
    </KoleksiProvider>
  )
}