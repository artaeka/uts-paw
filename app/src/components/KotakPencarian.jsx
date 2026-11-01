export default function KotakPencarian({ nilai, onUbah }) {
  return (
    <div className="kotak-pencarian">
      <label htmlFor="cari">Cari judul proyek</label>
      <input
        id="cari"
        type="search"
        value={nilai}
        onChange={(e) => onUbah(e.target.value)}
        placeholder="Ketik judul proyek..."
      />
    </div>
  )
}