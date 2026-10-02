const gsheetService = require('../services/gsheetService');

// Fungsi untuk menampilkan semua aktivitas
exports.getAllAktivitas = async (req, res) => {
    try {
        const aktivitas = await gsheetService.getRows('aktivitas');
        res.json(aktivitas);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

// Fungsi untuk menampilkan aktivitas berdasarkan id
exports.getAktivitasById = async (req, res) => {
    try {
        const aktivitasList = await gsheetService.getRows('aktivitas');
        const aktivitas = aktivitasList.find(item => item.id === req.params.id);
        if (!aktivitas) {
            return res.status(404).json({ message: 'Aktivitas tidak ditemukan' });
        }
        res.json(aktivitas);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

// Fungsi untuk menambah aktivitas baru
exports.createAktivitas = async (req, res) => {
    try {
        // Generate a simple ID (in production, use UUID or similar)
        const newAktivitas = {
            ...req.body,
            id: Date.now().toString(), // Simple timestamp-based ID
            created_at: new Date().toISOString().slice(0, 19).replace('T', ' ')
        };
        await gsheetService.addRow('aktivitas', newAktivitas);
        res.status(201).json(newAktivitas);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
};

// Fungsi untuk mengupdate aktivitas
exports.updateAktivitas = async (req, res) => {
    try {
        const { id } = req.params;
        const updateData = {
            ...req.body,
            updated_at: new Date().toISOString().slice(0, 19).replace('T', ' ')
        };
        await gsheetService.updateRow('aktivitas', 'id', id, updateData);
        
        // Get the updated row
        const rows = await gsheetService.getRows('aktivitas');
        const updatedAktivitas = rows.find(item => item.id === id);
        
        if (!updatedAktivitas) {
            return res.status(404).json({ message: 'Aktivitas tidak ditemukan' });
        }
        res.json(updatedAktivitas);
    } catch (err) {
        res.status(404).json({ message: 'Aktivitas tidak ditemukan' });
    }
};

// Fungsi untuk menghapus aktivitas
exports.deleteAktivitas = async (req, res) => {
    try {
        const { id } = req.params;
        await gsheetService.deleteRow('aktivitas', 'id', id);
        res.json({ message: 'Aktivitas berhasil dihapus' });
    } catch (err) {
        res.status(404).json({ message: 'Aktivitas tidak ditemukan' });
    }
};