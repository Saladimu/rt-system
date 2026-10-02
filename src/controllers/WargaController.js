const gsheetService = require('../services/gsheetService');

// Fungsi untuk menampilkan semua warga
exports.getAllWarga = async (req, res) => {
    try {
        const warga = await gsheetService.getRows('warga');
        res.json(warga);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

// Fungsi untuk menampilkan warga berdasarkan id
exports.getWargaById = async (req, res) => {
    try {
        const wargaList = await gsheetService.getRows('warga');
        const warga = wargaList.find(item => item.id === req.params.id);
        if (!warga) {
            return res.status(404).json({ message: 'Warga tidak ditemukan' });
        }
        res.json(warga);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

// Fungsi untuk menambah warga baru
exports.createWarga = async (req, res) => {
    try {
        // Generate a simple ID (in production, use UUID or similar)
        const newWarga = {
            ...req.body,
            id: Date.now().toString(), // Simple timestamp-based ID
            created_at: new Date().toISOString().slice(0, 19).replace('T', ' '),
            updated_at: new Date().toISOString().slice(0, 19).replace('T', ' ')
        };
        await gsheetService.addRow('warga', newWarga);
        res.status(201).json(newWarga);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
};

// Fungsi untuk mengupdate warga
exports.updateWarga = async (req, res) => {
    try {
        const { id } = req.params;
        const updateData = {
            ...req.body,
            updated_at: new Date().toISOString().slice(0, 19).replace('T', ' ')
        };
        await gsheetService.updateRow('warga', 'id', id, updateData);
        
        // Get the updated row
        const rows = await gsheetService.getRows('warga');
        const updatedWarga = rows.find(item => item.id === id);
        
        if (!updatedWarga) {
            return res.status(404).json({ message: 'Warga tidak ditemukan' });
        }
        res.json(updatedWarga);
    } catch (err) {
        res.status(404).json({ message: 'Warga tidak ditemukan' });
    }
};

// Fungsi untuk menghapus warga
exports.deleteWarga = async (req, res) => {
    try {
        const { id } = req.params;
        await gsheetService.deleteRow('warga', 'id', id);
        res.json({ message: 'Warga berhasil dihapus' });
    } catch (err) {
        res.status(404).json({ message: 'Warga tidak ditemukan' });
    }
};