const gsheetService = require('../services/gsheetService');

// Fungsi untuk menampilkan semua keamanan
exports.getAllKeamanan = async (req, res) => {
    try {
        const keamanan = await gsheetService.getRows('jadwal_keamanan');
        res.json(keamanan);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

// Fungsi untuk menampilkan keamanan berdasarkan id
exports.getKeamananById = async (req, res) => {
    try {
        const keamananList = await gsheetService.getRows('jadwal_keamanan');
        const keamanan = keamananList.find(item => item.id === req.params.id);
        if (!keamanan) {
            return res.status(404).json({ message: 'Keamanan tidak ditemukan' });
        }
        res.json(keamanan);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

// Fungsi untuk menambah keamanan baru
exports.createKeamanan = async (req, res) => {
    try {
        // Generate a simple ID (in production, use UUID or similar)
        const newKeamanan = {
            ...req.body,
            id: Date.now().toString(), // Simple timestamp-based ID
            created_at: new Date().toISOString().slice(0, 19).replace('T', ' ')
        };
        await gsheetService.addRow('jadwal_keamanan', newKeamanan);
        res.status(201).json(newKeamanan);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
};

// Fungsi untuk mengupdate keamanan
exports.updateKeamanan = async (req, res) => {
    try {
        const { id } = req.params;
        const updateData = {
            ...req.body,
            updated_at: new Date().toISOString().slice(0, 19).replace('T', ' ')
        };
        await gsheetService.updateRow('jadwal_keamanan', 'id', id, updateData);
        
        // Get the updated row
        const rows = await gsheetService.getRows('jadwal_keamanan');
        const updatedKeamanan = rows.find(item => item.id === id);
        
        if (!updatedKeamanan) {
            return res.status(404).json({ message: 'Keamanan tidak ditemukan' });
        }
        res.json(updatedKeamanan);
    } catch (err) {
        res.status(404).json({ message: 'Keamanan tidak ditemukan' });
    }
};

// Fungsi untuk menghapus keamanan
exports.deleteKeamanan = async (req, res) => {
    try {
        const { id } = req.params;
        await gsheetService.deleteRow('jadwal_keamanan', 'id', id);
        res.json({ message: 'Keamanan berhasil dihapus' });
    } catch (err) {
        res.status(404).json({ message: 'Keamanan tidak ditemukan' });
    }
};