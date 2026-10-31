import { render, screen, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { MemoryRouter } from 'react-router-dom'
import { afterEach, beforeEach, expect, test, vi } from 'vitest'
import App from './App.jsx'
import mahasiswa from '../mahasiswa.json'

const DATA = [
  { id: '1', judul: 'Aplikasi Cuaca', kategori: 'Web', teknologi: 'React', tahun: 2026, tautan: 'https://contoh.dev/cuaca' },
  { id: '2', judul: 'Desain Kampus', kategori: 'Desain', teknologi: 'Figma', tahun: 2025, tautan: 'https://contoh.dev/kampus' },
  { id: '3', judul: 'Analisis Penjualan', kategori: 'Data', teknologi: 'Python', tahun: 2026, tautan: 'https://contoh.dev/jual' },
]

function buka(path) {
  const user = userEvent.setup()
  render(
    <MemoryRouter initialEntries={[path]}>
      <App />
    </MemoryRouter>,
  )
  return user
}

beforeEach(() => {
  vi.stubGlobal(
    'fetch',
    vi.fn(async () => new Response(JSON.stringify(DATA), { status: 200 })),
  )
})

afterEach(() => {
  vi.unstubAllGlobals()
})

test('rute tidak dikenal menampilkan 404', () => {
  buka('/tidak-ada')
  expect(screen.getByRole('heading', { name: '404' })).toBeInTheDocument()
})

test('beranda menampilkan satu judul utama dan jumlah proyek', async () => {
  buka('/')
  expect(screen.getAllByRole('heading', { level: 1 })).toHaveLength(1)
  const ringkasan = await screen.findByRole('list')
  expect(ringkasan).toHaveTextContent('3 proyek')
})

test('koleksi menampilkan semua item hasil fetch', async () => {
  buka('/koleksi')
  for (const item of DATA) {
    expect(await screen.findByText(item.judul)).toBeInTheDocument()
  }
  expect(fetch).toHaveBeenCalled()
})

test('pencarian menyaring daftar berdasarkan judul', async () => {
  const user = buka('/koleksi')
  await screen.findByText('Desain Kampus')
  await user.type(screen.getByRole('searchbox'), 'cuaca')
  expect(screen.getByText('Aplikasi Cuaca')).toBeInTheDocument()
  expect(screen.queryByText('Desain Kampus')).not.toBeInTheDocument()
})

test('detail dengan id tidak ada menampilkan pesan tidak ditemukan', async () => {
  buka('/koleksi/xyz')
  expect(await screen.findByText(/tidak ditemukan/i)).toBeInTheDocument()
})

test('form menolak judul kosong dengan pesan error', async () => {
  const user = buka('/tambah')
  await user.click(screen.getByRole('button', { name: /simpan/i }))
  expect(await screen.findByRole('alert')).toHaveTextContent(/judul/i)
})

test('item baru tersimpan di localStorage dan tampil di koleksi', async () => {
  const user = buka('/tambah')
  await user.type(screen.getByLabelText('Judul'), 'Proyek Baru Saya')
  await user.click(screen.getByRole('button', { name: /simpan/i }))
  expect(await screen.findByText('Proyek Baru Saya')).toBeInTheDocument()
  await waitFor(() => expect(localStorage.getItem('uts-paw:tambahan')).toContain('Proyek Baru Saya'))
})

test('statistik menampilkan jumlah item per kategori', async () => {
  buka('/statistik')
  const tabel = await screen.findByRole('table')
  expect(tabel).toHaveTextContent('Web')
  expect(tabel).toHaveTextContent('Desain')
  expect(tabel).toHaveTextContent('Data')
})

test('halaman tentang menampilkan nama dan NIM', () => {
  buka('/tentang')
  expect(screen.getByText(mahasiswa.nim)).toBeInTheDocument()
  expect(screen.getByText(mahasiswa.nama)).toBeInTheDocument()
})