import './PesanError.css'

export default function PesanError({ pesan }) {
  if (!pesan) return null
  return (
    <p role="alert" className="pesan-error">
      {pesan}
    </p>
  )
}