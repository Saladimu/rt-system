-- Sistem Aktivitas RT - Database Schema
-- Database: rt_system

-- Tabel Warga (Residents)
CREATE TABLE warga (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    nomor_kk TEXT NOT NULL,
    nama_kk TEXT NOT NULL,
    nama_lengkap TEXT NOT NULL,
    nik TEXT UNIQUE NOT NULL,
    tempat_lahir TEXT,
    tanggal_lahir DATE,
    jenis_kelamin ENUM('L', 'P') NOT NULL,
    agama TEXT,
    pekerjaan TEXT,
    alamat TEXT NOT NULL,
    rt TEXT NOT NULL,
    rw TEXT NOT NULL,
    no_rumah TEXT,
    telepon TEXT,
    email TEXT,
    status_keluarga ENUM('Kepala Keluarga', 'Istri', 'Anak', 'Lainnya') NOT NULL,
    status_kawin TEXT,
    pendidikan TEXT,
    golongan_darah TEXT,
    kewarganegaraan TEXT DEFAULT 'Indonesia',
    foto TEXT,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
);

-- Tabel Keluarga (Family Groups)
CREATE TABLE keluarga (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    nomor_kk TEXT UNIQUE NOT NULL,
    kepala_keluarga_id INTEGER NOT NULL,
    alamat TEXT NOT NULL,
    rt TEXT NOT NULL,
    rw TEXT NOT NULL,
    jumlah_anggota INTEGER DEFAULT 1,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (kepala_keluarga_id) REFERENCES warga(id)
);

-- Tabel Pengurus RT (RT Management)
CREATE TABLE pengurus_rt (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    warga_id INTEGER UNIQUE NOT NULL,
    jabatan TEXT NOT NULL, -- Ketua, Sekretaris, Bendahara, dll
    periode_mulai DATE NOT NULL,
    periode_selesai DATE,
    status ENUM 'Aktif', 'Nonaktif' DEFAULT 'Aktif',
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (warga_id) REFERENCES warga(id)
);

-- Tabel Aktivitas & Kegiatan RT
CREATE TABLE aktivitas_rt (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    judul TEXT NOT NULL,
    deskripsi TEXT,
    jenis_aktivitas TEXT NOT NULL, -- Rapat, Bakti Sosial, Olahraga, dll
    tanggal_mulai DATE NOT NULL,
    tanggal_selesai DATE,
    lokasi TEXT,
    koordinator_id INTEGER,
    status ENUM 'Planned', 'Ongoing', 'Completed', 'Cancelled' DEFAULT 'Planned',
    created_by INTEGER,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (koordinator_id) REFERENCES pengurus_rt(id),
    FOREIGN KEY (created_by) REFERENCES pengurus_rt(id)
);

-- Tabel Peserta Aktivitas
CREATE TABLE peserta_aktivitas (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    aktivitas_id INTEGER NOT NULL,
    warga_id INTEGER NOT NULL,
    kehadiran ENUM 'Hadir', 'Tidak Hadir', 'Izin', 'Sakit' DEFAULT 'Tidak Hadir',
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (aktivitas_id) REFERENCES aktivitas_rt(id),
    FOREIGN KEY (warga_id) REFERENCES warga(id)
);

-- Tabel Iuran & Donasi
CREATE TABLE transaksi_keuangan (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    jenis_transaksi TEXT NOT NULL, -- Iuran, Donasi, Pengeluaran
    kategori TEXT NOT NULL, -- Iuran RT, Donasi Bencana, dll
    nominal INTEGER NOT NULL,
    deskripsi TEXT,
    tanggal_transaksi DATE NOT NULL,
    created_by INTEGER,
    bukti_pembayaran TEXT,
    status_pembayaran ENUM 'Lunas', 'Belum Lunas', 'Terlambat' DEFAULT 'Belum Lunas',
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (created_by) REFERENCES pengurus_rt(id)
);

-- Tabel Pembayaran Iuran
CREATE TABLE pembayaran_iuran (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    transaksi_id INTEGER NOT NULL,
    warga_id INTEGER NOT NULL,
    periode TEXT NOT NULL,
    nominal INTEGER NOT NULL,
    tanggal_pembayaran DATE,
    metode_pembayaran TEXT,
    status ENUM 'Lunas', 'Belum Lunas', 'Terlambat' DEFAULT 'Belum Lunas',
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (transaksi_id) REFERENCES transaksi_keuangan(id),
    FOREIGN KEY (warga_id) REFERENCES warga(id)
);

-- Tabel Pengumuman
CREATE TABLE pengumuman (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    judul TEXT NOT NULL,
    isi TEXT NOT NULL,
    prioritas ENUM 'Rendah', 'Sedang', 'Tinggi', 'Darurat' DEFAULT 'Sedang',
    target_audience TEXT, -- Semua Warga, RT, RW, dll
    created_by INTEGER,
    tanggal_mulai DATE NOT NULL,
    tanggal_selesai DATE,
    status ENUM 'Aktif', 'Nonaktif' DEFAULT 'Aktif',
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (created_by) REFERENCES pengurus_rt(id)
);

-- Tabel Keamanan Lingkungan
CREATE TABLE jadwal_keamanan (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    tanggal DATE NOT NULL,
    jam_mulai TIME NOT NULL,
    jam_selesai TIME NOT NULL,
    petugas_id INTEGER NOT NULL,
    area_patroli TEXT,
    catatan TEXT,
    status ENUM 'Scheduled', 'On Duty', 'Completed', 'Cancelled' DEFAULT 'Scheduled',
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (petugas_id) REFERENCES warga(id)
);

-- Tuple Laporan Keamanan
CREATE TABLE laporan_keamanan (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    tanggal DATE NOT NULL,
    jam TIME NOT NULL,
    lokasi TEXT NOT NULL,
    jenis_kejadian TEXT NOT NULL,
    deskripsi TEXT,
    pelapor_id INTEGER,
    ditangani_oleh INTEGER,
    status ENUM 'Pending', 'Ditangani', 'Selesai' DEFAULT 'Pending',
    tindakan_taken TEXT,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (pelapor_id) REFERENCES warga(id),
    FOREIGN KEY (ditangani_oleh) REFERENCES pengurus_rt(id)
);

-- Tuple Layanan Masyarakat
CREATE TABLE layanan_masyarakat (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    jenis_layanan TEXT NOT NULL, -- Pengaduan, Bantuan, Konsultasi
    judul TEXT NOT NULL,
    deskripsi TEXT NOT NULL,
    pelapor_id INTEGER NOT NULL,
    status ENUM 'Open', 'In Progress', 'Resolved', 'Closed' DEFAULT 'Open',
    prioritas ENUM 'Rendah', 'Sedang', 'Tinggi', 'Darurat' DEFAULT 'Sedang',
    ditangani_oleh INTEGER,
    tindakan_taken TEXT,
    resolusi TEXT,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    updated_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (pelapor_id) REFERENCES warga(id),
    FOREIGN KEY (ditangani_oleh) REFERENCES pengurus_rt(id)
);

-- Tuple Dokumen
CREATE TABLE dokumen_rt (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    jenis_dokumen TEXT NOT NULL, -- SK, ADART, Laporan, dll
    judul TEXT NOT NULL,
    file_path TEXT NOT NULL,
    deskripsi TEXT,
    uploaded_by INTEGER,
    tanggal_upload DATE NOT NULL,
    akses ENUM 'Publik', 'Terbatas', 'Privat' DEFAULT 'Publik',
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (uploaded_by) REFERENCES pengurus_rt(id)
);

-- Tuple Kehadiran Rapat
CREATE TABLE kehadiran_rapat (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    rapat_id INTEGER NOT NULL,
    warga_id INTEGER NOT NULL,
    kehadiran ENUM 'Hadir', 'Tidak Hadir', 'Izin', 'Sakit' DEFAULT 'Tidak Hadir',
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (rapat_id) REFERENCES aktivitas_rt(id),
    FOREIGN KEY (warga_id) REFERENCES warga(id)
);

-- Index untuk performa
CREATE INDEX idx_warga_rt_rw ON warga(rt, rw);
CREATE INDEX idx_aktivitas_tanggal ON aktivitas_rt(tanggal_mulai);
CREATE INDEX idx_transaksi_tanggal ON transaksi_keuangan(tanggal_transaksi);
CREATE INDEX idx_pengumuman_tanggal ON pengumuman(tanggal_mulai);
CREATE INDEX idx_keamanan_tanggal ON jadwal_keamanan(tanggal);
CREATE INDEX idx_layanan_status ON layanan_masyarakat(status);