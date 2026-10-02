# Struktur Google Sheet untuk Sistem Aktivitas RT

Berikut adalah struktur worksheet/tab yang diperlukan untuk setiap entitas dalam sistem aktivitas RT. Setiap worksheet harus memiliki header baris pertama sesuai dengan nama kolom yang ditentukan.

## 1. Warga
Nama worksheet: `warga`

Header kolom:
- id (string, unique)
- nomor_kk (string)
- nama_kk (string)
- nama_lengkap (string)
- nik (string, unique)
- tempat_lahir (string)
- tanggal_lahir (date string, format: YYYY-MM-DD)
- jenis_kelamin (string: L atau P)
- agama (string)
- pekerjaan (string)
- alamat (string)
- rt (string)
- rw (string)
- no_rumah (string)
- telepon (string)
- email (string)
- status_keluarga (string: Kepala Keluarga, Istri, Anak, Lainnya)
- status_kawin (string)
- pendidikan (string)
- golongan_darah (string)
- kewarganegaraan (string, default: Indonesia)
- foto (string, URL atau path)
- created_at (date string, format: YYYY-MM-DD HH:MM:SS)
- updated_at (date string, format: YYYY-MM-DD HH:MM:SS)

## 2. Aktivitas RT
Nama worksheet: `aktivitas`

Header kolom:
- id (string, unique)
- judul (string)
- deskripsi (string)
- jenis_aktivitas (string: Rapat, Bakti Sosial, Olahraga, Perayaan, Lainnya)
- tanggal_mulai (date string, format: YYYY-MM-DD)
- tanggal_selesai (date string, format: YYYY-MM-DD, boleh kosong)
- lokasi (string)
- koordinator_id (string, riferensi ke warga.id)
- status (string: Planned, Ongoing, Completed, Cancelled)
- created_by (string, riferensi ke warga.id)
- created_at (date string, format: YYYY-MM-DD HH:MM:SS)

## 3. Peserta Aktivitas
Nama worksheet: `peserta_aktivitas`

Header kolom:
- id (string, unique)
- aktivitas_id (string, riferensi ke aktivitas.id)
- warga_id (string, riferensi ke warga.id)
- kehadiran (string: Hadir, Tidak Hadir, Izin, Sakit)
- created_at (date string, format: YYYY-MM-DD HH:MM:SS)

## 4. Transaksi Keuangan (Iuran & Donasi)
Nama worksheet: `transaksi_keuangan`

Header kolom:
- id (string, unique)
- jenis_transaksi (string: Iuran, Donasi, Pengeluaran)
- kategori (string: Iuran RT, Donasi Bencana, Pengeluaran Listrik, dst.)
- nominal (integer)
- deskripsi (string)
- tanggal_transaksi (date string, format: YYYY-MM-DD)
- created_by (string, riferensi ke warga.id)
- bukti_pembayaran (string, URL atau path)
- status_pembayaran (string: Lunas, Belum Lunas, Terlambat)
- created_at (date string, format: YYYY-MM-DD HH:MM:SS)

## 5. Pembayaran Iuran
Nama worksheet: `pembayaran_iuran`

Header kolom:
- id (string, unique)
- transaksi_id (string, riferensi ke transaksi_keuangan.id)
- warga_id (string, riferensi ke warga.id)
- periode (string, format: YYYY-MM)
- nominal (integer)
- tanggal_pembayaran (date string, format: YYYY-MM-DD, boleh kosong jika belum dibayar)
- metode_pembayaran (string: Tunai, Transfer, E-Wallet, dst.)
- status (string: Lunas, Belum Lunas, Terlambat)
- created_at (date string, format: YYYY-MM-DD HH:MM:SS)

## 6. Pengumuman
Nama worksheet: `pengumuman`

Header kolom:
- id (string, unique)
- judul (string)
- isi (text)
- prioritas (string: Rendah, Sedang, Tinggi, Darurat)
- target_audience (string: Semua Warga, RT, RW, Laki-laki, Perempuan, Anak, Lansia)
- created_by (string, riferensi ke warga.id)
- tanggal_mulai (date string, format: YYYY-MM-DD)
- tanggal_selesai (date string, format: YYYY-MM-DD, boleh kosong)
- status (string: Aktif, Nonaktif)
- created_at (date string, format: YYYY-MM-DD HH:MM:SS)

## 7. Jadwal Keamanan
Nama worksheet: `jadwal_keamanan`

Header kolom:
- id (string, unique)
- tanggal (date string, format: YYYY-MM-DD)
- jam_mulai (time string, format: HH:MM)
- jam_selesai (time string, format: HH:MM)
- petugas_id (string, riferensi ke warga.id)
- area_patroli (string)
- catatan (string)
- status (string: Scheduled, On Duty, Completed, Cancelled)
- created_at (date string, format: YYYY-MM-DD HH:MM:SS)

## 8. Laporan Keamanan
Nama worksheet: `laporan_keamanan`

Header kolom:
- id (string, unique)
- tanggal (date string, format: YYYY-MM-DD)
- jam (time string, format: HH:MM)
- lokasi (string)
- jenis_kejadian (string: Kecurangan, Kerusakan, Kekacauan, Kebakaran, Banjir, Lainnya)
- deskripsi (text)
- pelapor_id (string, riferensi ke warga.id)
- ditangani_oleh (string, riferensi ke warga.id, boleh kosong)
- status (string: Pending, Ditangani, Selesai)
- tindakan_taken (text)
- created_at (date string, format: YYYY-MM-DD HH:MM:SS)

## 9. Layanan Masyarakat
Nama worksheet: `layanan_masyarakat`

Header kolom:
- id (string, unique)
- jenis_layanan (string: Pengaduan, Bantuan, Konsultasi, Informasi, Lainnya)
- judul (string)
- deskripsi (text)
- pelapor_id (string, riferensi ke warga.id)
- status (string: Open, In Progress, Resolved, Closed)
- prioritas (string: Rendah, Sedang, Tinggi, Darurat)
- ditangani_oleh (string, riferensi ke warga.id, boleh kosong)
- tindakan_taken (text)
- resolusi (text)
- created_at (date string, format: YYYY-MM-DD HH:MM:SS)
- updated_at (date string, format: YYYY-MM-DD HH:MM:SS)

## 10. Dokumen RT
Nama worksheet: `dokumen_rt`

Header kolom:
- id (string, unique)
- jenis_dokumen (string: SK, ADART, Laporan, Surat, Lainnya)
- judul (string)
- file_path (string, URL atau path)
- deskripsi (string)
- uploaded_by (string, riferensi ke warga.id)
- tanggal_upload (date string, format: YYYY-MM-DD)
- akses (string: Publik, Terbatas, Privat)
- created_at (date string, format: YYYY-MM-DD HH:MM:SS)

## Petunjuk Penggunaan

1. Buat Google Sheet baru
2. Untuk setiap entitas di atas, buat worksheet/tab dengan nama yang sesuai
3. Isi baris pertama (header) dengan nama kolom yang tepat sesuai daftar di atas
4. Pastikan tidak ada spasi ekstra di awal atau akhir nama header
5. Data akan dimulai dari baris kedua dan seterusnya
6. Sistem akan otomatis membaca dan menulis data berdasarkan struktur ini

## Tipe Data Keterangan

- **string**: Teks apa pun
- **integer**: Bilangan bulat
- **date string**: Format tanggal YYYY-MM-DD
- **time string**: Format waktu HH:MM (24 jam)
- **datetime string**: Format YYYY-MM-DD HH:MM:SS
- **text**: Teks yang dapat panjang (untuk deskripsi, catatan, dll.)

## Contoh Data

Untuk worksheet `warga`, baris data mungkin terlihat seperti:
```
warga001, KK001, Budi Santoso, Budi Santoso, 1234567890123456, Jakarta, 1990-01-15, L, Islam, Perangkat Desa, Jl. Merdeka No. 12, 01, 01, 12A, 081234567890, budi@email.com, Kepala Keluarga, Menikah, SMA, O, Indonesia, https://example.com/foto.jpg, 2024-01-15 10:30:00, 2024-01-15 10:30:00
```

Pastikan untuk menggunakan komas sebagai pemisah nilai dalam Google Sheet, atau lebih baik lagi, masukkan data secara manual melalui antarmuka Google Sheet dan biarkan sistem yang menangani format.