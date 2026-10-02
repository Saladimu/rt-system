const gsheetService = require('../services/gsheetService');

// Fungsi untuk menampilkan semua layanan masyarakat
exports.getAllLayanan = async (req, res) => {
    try {
        const layanan = await gsheetService.getRows('layanan_masyarakat');
        res.json(layanan);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

// Fungsi untuk menampilkan layanan berdasarkan id
exports.getLayananById = async (req, res) => {
    try {
        const layananList = await gsheetService.getRows('layanan_masyarakat');
        const layanan = layananList.find(item => item.id === req.params.id);
        if (!layanan) {
            return res.status(404).json({ message: 'Layanan tidak ditemukan' });
        }
        res.json(layanan);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

// Fungsi untuk menambah layanan baru
exports.createLayanan = async (req, res) => {
    try {
        // Generate a simple ID (in production, use UUID or similar)
        const newLayanan = {
            ...req.body,
            id: Date.now().toString(), // Simple timestamp-based ID
            created_at: new Date().toISOString().slice(0, 19).replace('T', ' '),
            updated_at: new Date().toISOString().slice(0, 19).replace('T', ' ')
        };
        await gsheetService.addRow('layanan_masyarakat', newLayanan);
        res.status(201).json(newLayanan);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
};

// Fungsi untuk mengupdate layanan
exports.updateLayanan = async (req, res) => {
    try {
        const { id } = req.params;
        const updateData = {
            ...req.body,
            updated_at: new Date().toISOString().slice(0, 19).replace('T', ' ')
        };
        await gsheetService.updateRow('layanan_masyarakat', 'id', id, updateData);
        
        // Get the updated row
        const rows = await gsheetService.getRows('layanan_masyarakat');
        const updatedLayanan = rows.find(item => item.id === id);
        
        if (!updatedLayanan) {
            return res.status(404).json({ message: 'Layanan tidak ditemukan' });
        }
        res.json(updatedLayanan);
    } catch (err) {
        res.status(404).json({ message: 'Layanan tidak ditemukan' });
    }
};

// Fungsi untuk menghapus layanan
exports.deleteLayanan = async (req, res) => {
    try {
        const { id } = req.params;
        await gsheetService.deleteRow('layanan_masyarakat', 'id', id);
        res.json({ message: 'Layanan berhasil dihapus' });
    } catch (err) {
        res.status(404).json({ message: 'Layanan tidak ditemukan' });
    }
};

// Fungsi untuk menampilkan layanan berdasarkan status
exports.getLayananByStatus = async (req, res) => {
    try {
        const status = req.params.status;
        const layananList = await gsheetService.getRows('layanan_masyarakat');
        const layanan = layananList.filter(item => item.status === status);
        res.json(layanan);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

// Fungsi untuk menampilkan layanan berdasarkan jenis layanan
exports.getLayananByJenis = async (req, res) => {
    try {
        const jenis = req.params.jenis;
        const layananList = await gsheetService.getRows('layanan_masyarakat');
        const layanan = layananList.filter(item => item.jenis_layanan === jenis);
        res.json(layanan);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};