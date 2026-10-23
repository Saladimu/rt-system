/* ============================================================
   KONFIGURASI IDENTITAS SISTEM RW 06
   ------------------------------------------------------------
   SAPA RW — Sistem Administrasi & Pelayanan Antarwarga tingkat
   RUKUN WARGA (RW). Bertanggung jawab atas beberapa RT di bawahnya.

   Ubah HANYA nilai di dalam RW_CONFIG di bawah ini untuk
   menyesuaikan informasi RW pada seluruh aplikasi
   (index.html dan public.html).

   Semua teks di halaman (judul, header, footer, sub-judul, tooltip,
   alt logo, dan placeholder form) diisi otomatis dari konfigurasi ini
   melalui atribut data-rt / data-rt-placeholder / data-rt-title /
   data-rt-aria-label / data-rt-alt.

   Identitas RW/kelurahan/alamat cukup diubah di sini (satu file) —
   teks turunan (dashboardTitle, wargaTitle, kasTitle, publicSubtitle,
   footer, wilayah, judul tab, placeholder) menyesuaikan otomatis.

   daftarRT: daftar RT yang berada di bawah RW ini. Digunakan oleh
   filter "Filter RT" di sidebar admin serta untuk agregasi ringkasan
   lintas-RT (mis. total jiwa, saldo kas gabungan).
   ============================================================ */
window.RW_CONFIG = {
    // Versi konfigurasi. Naikkan (mis. '2', '3', ...) setiap kali mengubah config.js.
    // Halaman membandingkannya dengan EXPECTED_CONFIG_VERSION (ada di index.html &
    // public.html) dan melakukan hard refresh otomatis bila berbeda, sehingga HTML
    // yang masih tersimpan di cache browser ikut diperbarui (sekali saja, ada guard).
    version: '1',
    appName: 'SAPA RW',
    appLongName: 'Sistem Administrasi & Pelayanan Antarwarga (Rukun Warga)',

    // Versi rilis aplikasi yang tampil di footer (mis. 'v1.0.0').
    // Naikkan saat ada rilis/perubahan besar. Berbeda dari `version` (penanda
    // sinkronisasi config) dan `APP_BUILD` (penanda build HTML).
    appVersion: 'v0.1.0',

    // Identitas RW
    rw: '06',
    kelurahan: 'Tanjung Duren Utara',
    kecamatan: 'Grogol Petamburan',
    kota: 'Jakarta Barat',
    provinsi: 'DKI Jakarta',

    // Nama kawasan / jalan tempat RW berada. Hanya dipakai untuk tampilan.
    alamatrwnya: 'Lontar',
    tahun: new Date().getFullYear(),
    alamatContoh: 'Jl. Lontar No. 06',
    lokasiContoh: 'Balai Warga RW 06',

    // Daftar RT di bawah RW ini. Setiap entri minimal punya nomor `rt`.
    // Kolom opsional: ketua (nama Ketua RT), kontak (No. HP/wa), jumlahKK,
    // jumlahJiwa — dipakai dashboard untuk ringkasan per-RT. Kosongkan array
    // ini bila daftar RT dikelola penuh lewat Google Sheets (tab Data_RT).
    daftarRT: [
        { rt: '017', ketua: '', kontak: '', jumlahKK: null, jumlahJiwa: null },
        { rt: '018', ketua: '', kontak: '', jumlahKK: null, jumlahJiwa: null },
        { rt: '019', ketua: '', kontak: '', jumlahKK: null, jumlahJiwa: null }
    ],

    // URL Web App Google Apps Script untuk Portal Publik (endpoint readPublic).
    // Salin URL Web App (yang berakhiran /exec) di sini agar public.html dapat
    // diakses cukup lewat "public.html" tanpa parameter ?url=...
    // Kosongkan ('') untuk memakai parameter ?url=... (kompatibilitas lama).
    publicApiUrl: '',

    // Path proxy same-origin (Cloudflare Pages Function, lihat folder `functions/`).
    // Dipakai sebagai jalur utama request ke Apps Script supaya browser tidak
    // memanggil script.google.com secara lintas-situs (menghindari blokir cookie
    // pihak ketiga/ITP/ekstensi yang membuat JSONP gagal). Bila proxy tidak
    // tersedia (mis. pratinjau lokal), aplikasi otomatis jatuh ke publicApiUrl.
    // Kosongkan ('') untuk selalu memakai publicApiUrl (URL langsung).
    apiBase: '/api',

    // URL halaman Portal Publik yang dibagikan ke warga. Satu domain dengan
    // admin (akses admin dikunci Cloudflare Access pada path "/" & "/index.html",
    // sedangkan "/public" + aset publik di-bypass). Contoh:
    // https://sapa-rw06.pages.dev/public
    // Kosongkan ('') untuk memakai public.html lokal (atau ?url=... bila publicApiUrl kosong).
    publicPortalUrl: '',

    // Daftar pilihan "Jenis Surat" pada fitur Pengajuan Surat. Dipakai oleh
    // index.html (admin) & public.html (form warga) agar seragam. Backend
    // (code.gs) menyimpan teksnya apa adanya; ubah daftar ini kapan saja lalu
    // naikkan `version` agar halaman lama ter-refresh otomatis.
    jenisSurat: [
        'Surat Pengantar KTP-el',
        'Surat Pengantar Kartu Keluarga (KK)',
        'Surat Pengantar Pindah Keluar',
        'Surat Pengantar Kedatangan Warga',
        'Surat Pengantar Akta Kelahiran',
        'Surat Keterangan Kematian',
        'Surat Keterangan Tidak Mampu (SKTM)',
        'Surat Keterangan Domisili (Perorangan)',
        'Surat Keterangan Domisili Usaha',
        'Surat Keterangan Belum Menikah / Pengantar Nikah',
        'Surat Pengantar SKCK',
        'Surat Keterangan Izin Keramaian / Acara Warga',
        'Surat Pengantar Rekomendasi RT/RW',
        'Lainnya'
    ],

    // Daftar status pengurusan surat (diubah oleh pengurus di halaman admin).
    statusSurat: ['Pending', 'Diproses', 'Selesai', 'Ditolak'],

    // Daftar pilihan "Jenis Pengaduan" pada fitur Lapor & Aspirasi. Dipakai oleh
    // index.html (admin) & public.html (form warga) agar seragam. Backend
    // (code.gs) menyimpan teksnya apa adanya.
    jenisPengaduan: [
        '🏠 Lingkungan & Kebersihan',
        '💡 Penerangan Jalan',
        '🚰 Saluran Air / Drainase',
        '🛣️ Jalan & Fasilitas Umum',
        '🔊 Ketertiban / Kebisingan',
        '🚗 Parkir / Akses Jalan',
        '🔐 Keamanan Lingkungan',
        '🗑️ Sampah',
        '🐕 Hewan / Gangguan Lingkungan',
        '👥 Kegiatan Warga',
        '📄 Administrasi RT/RW',
        '💬 Aspirasi / Saran',
        'Lainnya'
    ],

    // Daftar status penanganan pengaduan (diubah oleh pengurus di halaman admin).
    statusPengaduan: ['Diterima', 'Diproses', 'Selesai']
};

// Alias mundur-kompatibel: sebagian kode lama membaca window.RT_CONFIG.
window.RT_CONFIG = window.RW_CONFIG;

(function () {
    var c = window.RW_CONFIG;

    function rwShort() { return 'RW ' + c.rw; }
    function rwFull() { return 'RW ' + c.rw + ' ' + c.kelurahan; }
    function wilayah() { return c.alamatrwnya + ', ' + c.kelurahan + ', ' + c.kecamatan; }
    function copyright() { return '\u00A9 ' + c.tahun + ' ' + c.appName + ' \u00B7 ' + rwShort() + ' ' + c.alamatrwnya + ', ' + c.kelurahan; }
    function rtLabel(rt) { return 'RT ' + String(rt == null ? '' : rt); }

    // Nilai untuk setiap atribut data-rt.
    var values = {
        appName: c.appName,
        appLongName: c.appLongName,
        appNameRt: c.appName,
        appVersion: c.appVersion,
        dashboardTitle: 'Ringkasan ' + rwShort(),
        headerName: c.appName,
        rtShort: rwShort(),
        rtFull: rwFull(),
        kelurahan: c.kelurahan,
        wilayah: wilayah(),
        wargaTitle: 'Data Warga ' + rwShort(),
        kasTitle: 'Iuran Kas ' + rwShort(),
        wargaSubtitle: 'Pendataan warga ' + c.kelurahan,
        pengumumanSubtitle: 'Papan informasi resmi ' + c.appName,
        publicSubtitle: 'Portal Publik ' + rwShort(),
        footerAdmin: copyright() + ' \u00B7 ' + c.appVersion,
        footerPublic: copyright() + ' - Portal Publik \u00B7 ' + c.appVersion,
        titleAdmin: c.appName + ' - Dashboard ' + rwShort(),
        titlePublic: c.appName + ' - Portal Publik ' + rwShort(),
        aboutTitle: 'Tentang ' + c.appName,
        logoAlt: 'Logo ' + c.appName
    };

    // Nilai untuk setiap atribut data-rt-placeholder.
    var placeholders = {
        alamat: c.alamatContoh,
        pj: 'Ketua RW ' + c.rw,
        lokasi: c.lokasiContoh,
        suratNo: 'mis. 474/' + c.rw + '-RW/X/' + c.tahun
    };

    function apply() {
        document.querySelectorAll('[data-rt]').forEach(function (el) {
            var val = values[el.getAttribute('data-rt')];
            if (val !== undefined && val !== null) el.textContent = val;
        });
        document.querySelectorAll('[data-rt-title]').forEach(function (el) {
            var val = values[el.getAttribute('data-rt-title')];
            if (val !== undefined && val !== null) el.setAttribute('title', val);
        });
        document.querySelectorAll('[data-rt-aria-label]').forEach(function (el) {
            var val = values[el.getAttribute('data-rt-aria-label')];
            if (val !== undefined && val !== null) el.setAttribute('aria-label', val);
        });
        document.querySelectorAll('[data-rt-alt]').forEach(function (el) {
            var val = values[el.getAttribute('data-rt-alt')];
            if (val !== undefined && val !== null) el.setAttribute('alt', val);
        });
        document.querySelectorAll('[data-rt-placeholder]').forEach(function (el) {
            var val = placeholders[el.getAttribute('data-rt-placeholder')];
            if (val) el.setAttribute('placeholder', val);
        });
    }

    window.RW = {
        config: c,
        rwShort: rwShort,
        rwFull: rwFull,
        wilayah: wilayah,
        rtLabel: rtLabel,
        apply: apply,
        daftarRT: function () { return Array.isArray(c.daftarRT) ? c.daftarRT.slice() : []; }
    };
    // Alias mundur-kompatibel untuk kode lama yang memanggil window.RT.*.
    window.RT = window.RW;

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', apply);
    } else {
        apply();
    }
})();
