# Sistem Aktivitas RT (Rukun Tetangga)

## Deskripsi Proyek
Sistem manajemen komunitas RT yang lengkap untuk mengelola berbagai aktivitas kehidupan sehari-hari di lingkungan permukiman, menggunakan Google Sheet sebagai database.

## Fitur Utama

### 1. Manajemen Data Warga
- Pendaftaran data warga (KK, KTP, alamat, kontak)
- Update data warga
- Kelompok keluarga
- Data kepala keluarga

### 2. Aktivitas & Kegiatan RT
- Jadwal rapat RT
- Kegiatan bakti sosial
- Gotong royong
- Perayaan keagamaan
- Olahraga komunitas

### 3. Pengelolaan Keuangan
- Iuran RT berkala
- Donasi dan sumbangan
- Laporan keuangan
- Pembayaran online

### 4. Sistem Informasi
- Pengumuman resmi
- Berita terkini RT
- Surat menyurat
- Dokumen penting

### 5. Keamanan Lingkungan
- Jaga malam/patroli
- Laporan keamanan
- Daftar satpam
- Sistem alarm komunitas

### 6. Layanan Masyarakat
- Bantuan sosial
- Pengaduan warga
- Pemecahan masalah
- Koordinasi instansi

### 7. Laporan & Analitik
- Statistik kegiatan
- Partisipasi warga
- Laporan bulanan/tahunan
- Dashboard monitoring

## Teknologi
- Backend: Node.js/Express
- Database: Google Sheets (via Google Sheets API)
- Frontend: HTML/CSS/JavaScript (untuk integrasi)
- Dokumentasi: Markdown

## Struktur Folder
```
rt-system/
├── database/          # Struktur database (contoh Google Sheet)
├── src/              # Kode sumber
│   ├── models/       # Model data (adaptasi untuk Google Sheets)
│   ├── routes/       # API routes
│   ├── services/     # Business logic (termasuk Google Sheets service)
│   └── utils/        # Utility functions
├── public/           # File statis
├── docs/             # Dokumentasi
└── tests/            # Test cases
```

## Persyaratan

1. Node.js v14 atau lebih baru
2. Akun Google Cloud dengan akses ke Google Sheets API
3. File kredensial Google Cloud (credentials.json)

## Cara Setup

1. Clone repository ini
2. Install dependencies:
   ```bash
   npm install
   ```

3. Buat project di Google Cloud Console:
   - Buka https://console.cloud.google.com/
   - Buat project baru atau pilih project existing
   - Aktifkan Google Sheets API untuk project Anda
   - Buat kredensial OAuth 2.0 atau Service Account
   - Download file kredensial sebagai `credentials.json` dan letakkan di root folder proyek

4. Buat Google Sheet:
   - Buat spreadsheet baru di Google Sheets
   - Copy ID spreadsheet dari URL (antara `/d/` dan `/edit`)
   - Buat file `.env` berdasarkan `.env.example` dan isi `GOOGLE_SHEET_ID` dengan ID spreadsheet Anda
   - Buat worksheet/tab untuk setiap entitas (warga, aktivitas, iuran, dll.) dengan header yang sesuai

5. Jalankan aplikasi:
   ```bash
   npm start
   ```

## Struktur Google Sheet yang Diperlukan

Setiap entitas membutuhkan worksheet/tab dengan header kolom tertentu. Lihat file `database/sample_structure.md` untuk detail lengkap.

## API Endpoints

Semua endpoint diawali dengan `/api/`

### Warga
- GET `/api/warga` - Dapatkan semua warga
- GET `/api/warga/:id` - Dapatkan warga berdasarkan ID
- POST `/api/warga` - Tambah warga baru
- PUT `/api/warga/:id` - Update warga
- DELETE `/api/warga/:id` - Hapus warga

### Aktivitas
- GET `/api/aktivitas` - Dapatkan semua aktivitas
- GET `/api/aktivitas/:id` - Dapatkan aktivitas berdasarkan ID
- POST `/api/aktivitas` - Tambah aktivitas baru
- PUT `/api/aktivitas/:id` - Update aktivitas
- DELETE `/api/aktivitas/:id` - Hapus aktivitas

### Iuran
- GET `/api/iuran` - Dapatkan semua transaksi iuran
- GET `/api/iuran/:id` - Dapatkan transaksi berdasarkan ID
- POST `/api/iuran` - Tambah transaksi iuran baru
- PUT `/api/iuran/:id` - Update transaksi iuran
- DELETE `/api/iuran/:id` - Hapus transaksi iuran

### Pengumuman
- GET `/api/pengumuman` - Dapatkan semua pengumuman
- GET `/api/pengumuman/:id` - Dapatkan pengumuman berdasarkan ID
- POST `/api/pengumuman` - Tambah pengumuman baru
- PUT `/api/pengumuman/:id` - Update pengumuman
- DELETE `/api/pengumuman/:id` - Hapus pengumuman

### Keamanan
- GET `/api/keamanan` - Dapatkan semua catatan keamanan
- GET `/api/keamanan/:id` - Dapatkan catatan keamanan berdasarkan ID
- POST `/api/keamanan` - Tambah catatan keamanan baru
- PUT `/api/keamanan/:id` - Update catatan keamanan
- DELETE `/api/keamanan/:id` - Hapus catatan keamanan

### Layanan Masyarakat
- GET `/api/layanan` - Dapatkan semua layanan masyarakat
- GET `/api/layanan/:id` - Dapatkan layanan berdasarkan ID
- POST `/api/layanan` - Tambah layanan baru
- PUT `/api/layanan/:id` - Update layanan
- DELETE `/api/layanan/:id` - Hapus layanan

### Laporan
- GET `/api/dashboard` - Dapatkan statistik dashboard
- GET `/api/warga/stats` - Statistik warga
- GET `/api/aktivitas/stats` - Statistik aktivitas
- GET `/api/keuangan/stats` - Statistik keuangan
- GET `/api/keamanan/stats` - Statistik keamanan
- GET `/api/laporan/:year/:month` - Laporan bulanan

## Kontribusi

Silakan buat pull request atau laporkan issues jika ada yang perlu ditingkatkan.

## Lisensi

MIT