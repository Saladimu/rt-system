const gsheetService = require('../services/gsheetService');

// Fungsi untuk menghasilkan dashboard
exports.getDashboard = async (req, res) => {
    try {
        // Get counts from each sheet
        const [warga, aktivitas, iuran, layanan] = await Promise.all([
            gsheetService.getRows('warga'),
            gsheetService.getRows('aktivitas'),
            gsheetService.getRows('transaksi_keuangan'),
            gsheetService.getRows('layanan_masyarakat')
        ]);

        // Calculate total iuran (sum of nominal where status is Lunas or similar)
        const totalIuran = iuran.reduce((sum, item) => {
            // Consider Lunas or similar statuses as paid
            const status = (item.status_pembayaran || '').toLowerCase();
            const nominal = parseInt(item.nominal) || 0;
            if (status === 'lunas' || status === 'paid' || status === 'settled') {
                return sum + nominal;
            }
            return sum;
        }, 0);

        // Count pending layanan (status Open or similar)
        const pendingLayanan = layanan.filter(item => {
            const status = (item.status || '').toLowerCase();
            return status === 'open' || status === 'pending' || status === 'in progress';
        }).length;

        const dashboard = {
            total_warga: warga.length,
            total_aktivitas: aktivitas.length,
            total_iuran: totalIuran,
            total_layanan: layanan.length,
            pending_layanan: pendingLayanan,
            created_at: new Date()
        };

        res.json(dashboard);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

// Fungsi untuk laporan statistik warga
exports.getWargaStats = async (req, res) => {
    try {
        const warga = await gsheetService.getRows('warga');
        
        // Group by rt, rw, and jenis_kelamin
        const statsMap = {};
        
        warga.forEach(wargaItem => {
            const rt = wargaItem.rt || 'unknown';
            const rw = wargaItem.rw || 'unknown';
            const jenis_kelamin = wargaItem.jenis_kelamin || 'unknown';
            
            const key = `${rt}-${rw}-${jenis_kelamin}`;
            if (!statsMap[key]) {
                statsMap[key] = { rt, rw, jenis_kelamin, count: 0 };
            }
            statsMap[key].count++;
        });
        
        // Convert to array and group by rt
        const statsArray = Object.values(statsMap);
        const groupedStats = {};
        
        statsArray.forEach(item => {
            const rt = item.rt;
            if (!groupedStats[rt]) {
                groupedStats[rt] = { rt, data: [], total: 0 };
            }
            groupedStats[rt].data.push({
                rw: item.rw,
                jenis_kelamin: item.jenis_kelamin,
                count: item.count
            });
            groupedStats[rt].total += item.count;
        });
        
        res.json(Object.values(groupedStats));
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

// Fungsi untuk laporan aktivitas
exports.getAktivitasStats = async (req, res) => {
    try {
        const aktivitas = await gsheetService.getRows('aktivitas');
        
        // Group by jenis_aktivitas and status
        const statsMap = {};
        
        aktivitas.forEach(aktivitasItem => {
            const jenis = aktivitasItem.jenis_aktivitas || 'unknown';
            const status = aktivitasItem.status || 'unknown';
            
            const key = `${jenis}-${status}`;
            if (!statsMap[key]) {
                statsMap[key] = { jenis, status, count: 0 };
            }
            statsMap[key].count++;
        });
        
        // Convert to array and group by jenis
        const statsArray = Object.values(statsMap);
        const groupedStats = {};
        
        statsArray.forEach(item => {
            const jenis = item.jenis;
            if (!groupedStats[jenis]) {
                groupedStats[jenis] = { jenis, data: [], total: 0 };
            }
            groupedStats[jenis].data.push({
                status: item.status,
                count: item.count
            });
            groupedStats[jenis].total += item.count;
        });
        
        res.json(Object.values(groupedStats));
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

// Fungsi untuk laporan keuangan
exports.getKeuanganStats = async (req, res) => {
    try {
        const iuran = await gsheetService.getRows('transaksi_keuangan');
        
        // Group by jenis_transaksi and kategori
        const statsMap = {};
        
        iuran.forEach(iuranItem => {
            const jenis = iuranItem.jenis_transaksi || 'unknown';
            const kategori = iuranItem.kategori || 'unknown';
            const nominal = parseInt(iuranItem.nominal) || 0;
            
            const key = `${jenis}-${kategori}`;
            if (!statsMap[key]) {
                statsMap[key] = { jenis, kategori, total: 0, count: 0 };
            }
            statsMap[key].total += nominal;
            statsMap[key].count++;
        });
        
        // Convert to array and group by jenis
        const statsArray = Object.values(statsMap);
        const groupedStats = {};
        
        statsArray.forEach(item => {
            const jenis = item.jenis;
            if (!groupedStats[jenis]) {
                groupedStats[jenis] = { jenis, data: [], grand_total: 0, grand_count: 0 };
            }
            groupedStats[jenis].data.push({
                kategori: item.kategori,
                total: item.total,
                count: item.count
            });
            groupedStats[jenis].grand_total += item.total;
            groupedStats[jenis].grand_count += item.count;
        });
        
        res.json(Object.values(groupedStats));
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

// Fungsi untuk laporan keamanan
exports.getKeamananStats = async (req, res) => {
    try {
        const keamanan = await gsheetService.getRows('jadwal_keamanan');
        
        // Group by status and jenis_kejadian (but jadwal_keamanan doesn't have jenis_kejadian)
        // Let's use laporan_keamanan for jenis_kejadian stats
        const [keamananJadwal, laporanKeamanan] = await Promise.all([
            gsheetService.getRows('jadwal_keamanan'),
            gsheetService.getRows('laporan_keamanan')
        ]);
        
        // Stats for jadwal keamanan (by status)
        const jadwalStatsMap = {};
        keamananJadwal.forEach(item => {
            const status = item.status || 'unknown';
            if (!jadwalStatsMap[status]) {
                jadwalStatsMap[status] = { status, count: 0 };
            }
            jadwalStatsMap[status].count++;
        });
        
        // Stats for laporan keamanan (by status and jenis_kejadian)
        const laporanStatsMap = {};
        laporanKeamanan.forEach(item => {
            const status = item.status || 'unknown';
            const jenis_kejadian = item.jenis_kejadian || 'unknown';
            
            const key = `${status}-${jenis_kejadian}`;
            if (!laporanStatsMap[key]) {
                laporanStatsMap[key] = { status, jenis_kejadian, count: 0 };
            }
            laporanStatsMap[key].count++;
        });
        
        // Format response
        const jadwalStats = Object.values(jadwalStatsMap).map(item => ({
            status: item.status,
            data: [{ jenis_kejadian: 'Jadwal Keamanan', count: item.count }],
            total: item.count
        }));
        
        // Group laporan stats by status
        const laporanGrouped = {};
        Object.values(laporanStatsMap).forEach(item => {
            const status = item.status;
            if (!laporanGrouped[status]) {
                laporanGrouped[status] = { status, data: [], total: 0 };
            }
            laporanGrouped[status].data.push({
                jenis_kejadian: item.jenis_kejadian,
                count: item.count
            });
            laporanGrouped[status].total += item.count;
        });
        
        const laporanStats = Object.values(laporanGrouped);
        
        res.json({
            jadwal_keamanan: jadwalStats,
            laporan_keamanan: laporanStats
        });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

// Fungsi untuk export laporan bulanan
exports.getMonthlyReport = async (req, res) => {
    try {
        const { year, month } = req.params;
        
        // Parse year and month as integers
        const yearInt = parseInt(year);
        const monthInt = parseInt(month);
        
        // Validate
        if (isNaN(yearInt) || isNaN(monthInt) || monthInt < 1 || monthInt > 12) {
            return res.status(400).json({ message: 'Invalid year or month parameter' });
        }
        
        // Calculate start and end dates for the month
        const startDate = new Date(yearInt, monthInt - 1, 1); // monthInt - 1 because JS months are 0-indexed
        const endDate = new Date(yearInt, monthInt, 0); // Last day of the month
        
        // Format dates for comparison (YYYY-MM-DD)
        const startDateStr = startDate.toISOString().split('T')[0];
        const endDateStr = endDate.toISOString().split('T')[0];
        
        // Fetch data from relevant sheets
        const [aktivitasBulan, iuranBulan, layananBulan] = await Promise.all([
            gsheetService.getRows('aktivitas'),
            gsheetService.getRows('transaksi_keuangan'),
            gsheetService.getRows('layanan_masyarakat')
        ]);
        
        // Filter aktivitas by date range
        const aktivitasFiltered = aktivitasBulan.filter(item => {
            const tanggalMulai = item.tanggal_mulai;
            if (!tanggalMulai) return false;
            const itemDate = new Date(tanggalMulai);
            return itemDate >= startDate && itemDate <= endDate;
        });
        
        // Filter iuran by date range
        const iuranFiltered = iuranBulan.filter(item => {
            const tanggalTransaksi = item.tanggal_transaksi;
            if (!tanggalTransaksi) return false;
            const itemDate = new Date(tanggalTransaksi);
            return itemDate >= startDate && itemDate <= endDate;
        });
        
        // Filter layanan by date range
        const layananFiltered = layananBulan.filter(item => {
            const createdAt = item.created_at;
            if (!createdAt) return false;
            // Try to parse the date (might be in different formats)
            let itemDate;
            try {
                // Try ISO format first
                itemDate = new Date(createdAt);
                if (isNaN(itemDate)) {
                    // Try parsing as YYYY-MM-DD HH:MM:SS
                    const [datePart] = createdAt.split(' ');
                    itemDate = new Date(datePart);
                }
            } catch (e) {
                return false; // Invalid date format
            }
            return itemDate >= startDate && itemDate <= endDate;
        });
        
        const report = {
            periode: `${monthInt}/${yearInt}`,
            aktivitas: aktivitasFiltered,
            iuran: iuranFiltered,
            layanan: layananFiltered,
            total_iuran: iuranFiltered.reduce((sum, item) => sum + (parseInt(item.nominal) || 0), 0),
            total_layanan: layananFiltered.length,
            generated_at: new Date()
        };

        res.json(report);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};