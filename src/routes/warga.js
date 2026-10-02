const express = require('express');
const router = express.Router();
const wargaController = require('../controllers/WargaController');

// Route untuk menampilkan semua warga
router.get('/', async (req, res) => {
    try {
        const warga = await wargaController.getAllWarga(req, res);
        // If res hasn't been sent yet, send the data
        if (!res.headersSent) {
            res.json(warga);
        }
    } catch (err) {
        if (!res.headersSent) {
            res.status(500).json({ message: err.message });
        }
    }
});

// Route untuk menampilkan warga berdasarkan id
router.get('/:id', async (req, res) => {
    try {
        const warga = await wargaController.getWargaById(req, res);
        if (!res.headersSent) {
            res.json(warga);
        }
    } catch (err) {
        if (!res.headersSent) {
            res.status(404).json({ message: 'Warga tidak ditemukan' });
        }
    }
});

// Route untuk menambah warga baru
router.post('/', async (req, res) => {
    try {
        const warga = await wargaController.createWarga(req, res);
        if (!res.headersSent) {
            res.status(201).json(warga);
        }
    } catch (err) {
        if (!res.headersSent) {
            res.status(400).json({ message: err.message });
        }
    }
});

// Route untuk mengupdate warga
router.put('/:id', async (req, res) => {
    try {
        const warga = await wargaController.updateWarga(req, res);
        if (!res.headersSent) {
            res.json(warga);
        }
    } catch (err) {
        if (!res.headersSent) {
            res.status(404).json({ message: 'Warga tidak ditemukan' });
        }
    }
});

// Route untuk menghapus warga
router.delete('/:id', async (req, res) => {
    try {
        await wargaController.deleteWarga(req, res);
        if (!res.headersSent) {
            res.json({ message: 'Warga berhasil dihapus' });
        }
    } catch (err) {
        if (!res.headersSent) {
            res.status(404).json({ message: 'Warga tidak ditemukan' });
        }
    }
});

module.exports = router;