const gsheetService = require('../services/gsheetService');

// Fungsi untuk menampilkan semua iuran
exports.getAllIuran = async (req, res) => {
    try {
        const iuran = await gsheetService.getRows('transaksi_keuangan');
        res.json(iuran);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

// Fungsi untuk menampilkan iuran berdasarkan id
exports.getIuranById = async (req, res) => {
    try {
        const iuranList = await gsheetService.getRows('transaksi_keuangan');
        const iuran = iuranList.find(item => item.id === req.params.id);
        if (!iuran) {
            return res.status(404).json({ message: 'Iuran tidak ditemukan' });
        }
        res.json(iuran);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

// Fungsi untuk menambah iuran baru
exports.createIuran = async (req, res) => {
    try {
        // Generate a simple ID (in production, use UUID or similar)
        const newIuran = {
            ...req.body,
            id: Date.now().toString(), // Simple timestamp-based ID
            created_at: new Date().toISOString().slice(0, 19).replace('T', ' ')
        };
        await gsheetService.addRow('transaksi_keuangan', newIuran);
        res.status(201).json(newIuran);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
};

// Fungsi untuk mengupdate iuran
exports.updateIuran = async (req, res) => {
    try {
        const { id } = req.params;
        const updateData = {
            ...req.body,
            updated_at: new Date().toISOString().slice(0, 19).replace('T', ' ')
        };
        await gsheetService.updateRow('transaksi_keuangan', 'id', id, updateData);
        
        // Get the updated row
        const rows = await gsheetService.getRows('transaksi_keuangan');
        const updatedIuran = rows.find(item => item.id === id);
        
        if (!updatedIuran) {
            return res.status(404).json({ message: 'Iuran tidak ditemukan' });
        }
        res.json(updatedIuran);
    } catch (err) {
        res.status(404).json({ message: 'Iuran tidak ditemukan' });
    }
};

// Fungsi untuk menghapus iuran
exports.deleteIuran = async (req, res) => {
    try {
        const { id } = req.params;
        await gsheetService.deleteRow('transaksi_keuangan', 'id', id);
        res.json({ message: 'Iuran berhasil dihapus' });
    } catch (err) {
        res.status(404).json({ message: 'Iuran tidak ditemukan' });
    }
};