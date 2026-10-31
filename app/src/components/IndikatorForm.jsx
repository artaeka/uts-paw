import './IndikatorForm.css'

export default function IndikatorForm({ terisi, total }) {
  return (
    <div className="indikator" role="status">
      <span>
        {terisi} dari {total} kolom terisi
      </span>
      <progress max={total} value={terisi} aria-label="Kelengkapan form" />
    </div>
  )
}