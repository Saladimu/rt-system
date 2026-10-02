const gsheetService = require('../services/gsheetService');

// Fungsi untuk menampilkan semua pengumuman
exports.getAllPengumuman = async (req, res) => {
    try {
        const pengumuman = await gsheetService.getRows('pengumuman');
        res.json(pengumuman);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

// Fungsi untuk menampilkan pengumuman berdasarkan id
exports.getPengumumanById = async (req, res) => {
    try {
        const pengumumanList = await gsheetService.getRows('pengumuman');
        const pengumuman = pengumumanList.find(item => item.id === req.params.id);
        if (!pengumuman) {
            return res.status(404).json({ message: 'Pengumuman tidak ditemukan' });
        }
        res.json(pengumuman);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

// Fungsi untuk menambah pengumuman baru
exports.createPengumuman = async (req, res) => {
    try {
        // Generate a simple ID (in production, use UUID or similar)
        const newPengumuman = {
            ...req.body,
            id: Date.now().toString(), // Simple timestamp-based ID
            created_at: new Date().toISOString().slice(0, 19).replace('T', ' ')
        };
        await gsheetService.addRow('pengumuman', newPengumuman);
        res.status(201).json(newPengumuman);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
};

// Fungsi untuk mengupdate pengumuman
exports.updatePengumuman = async (req, res) => {
    try {
        const { id } = req.params;
        const updateData = {
            ...req.body,
            updated_at: new Date().toISOString().slice(0, 19).replace('T', ' ')
        };
        await gsheetService.updateRow('pengumuman', 'id', id, updateData);
        
        // Get the updated row
        const rows = await gsheetService.getRows('pengumuman');
        const updatedPengumuman = rows.find(item => item.id === id);
        
        if (!updatedPengumuman) {
            return res.status(404).json({ message: 'Pengumuman tidak ditemukan' });
        }
        res.json(updatedPengumuman);
    } catch (err) {
        res.status(404).json({ message: 'Pengumuman tidak ditemukan' });
    }
};

// Fungsi untuk menghapus pengumuman
exports.deletePengumuman = async (req, res) => {
    try {
        const { id } = req.params;
        await gsheetService.deleteRow('pengumuman', 'id', id);
        res.json({ message: 'Pengumuman berhasil dihapus' });
    } catch (err) {
        res.status(404).json({ message: 'Pengumuman tidak ditemukan' });
    }
};