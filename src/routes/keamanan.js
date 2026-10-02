// Replace the existing keamanan.js with Google Sheets version
const express = require('express');
const router = express.Router();
const keamananController = require('../controllers/KeamananController');

// Route untuk menampilkan semua keamanan
router.get('/', async (req, res) => {
    try {
        const keamanan = await keamananController.getAllKeamanan(req, res);
        // If res hasn't been sent yet, send the data
        if (!res.headersSent) {
            res.json(keamanan);
        }
    } catch (err) {
        if (!res.headersSent) {
            res.status(500).json({ message: err.message });
        }
    }
});

// Route untuk menampilkan keamanan berdasarkan id
router.get('/:id', async (req, res) => {
    try {
        const keamanan = await keamananController.getKeamananById(req, res);
        if (!res.headersSent) {
            res.json(keamanan);
        }
    } catch (err) {
        if (!res.headersSent) {
            res.status(404).json({ message: 'Keamanan tidak ditemukan' });
        }
    }
});

// Route untuk menambah keamanan baru
router.post('/', async (req, res) => {
    try {
        const keamanan = await keamananController.createKeamanan(req, res);
        if (!res.headersSent) {
            res.status(201).json(keamanan);
        }
    } catch (err) {
        if (!res.headersSent) {
            res.status(400).json({ message: err.message });
        }
    }
});

// Route untuk mengupdate keamanan
router.put('/:id', async (req, res) => {
    try {
        const keamanan = await keamananController.updateKeamanan(req, res);
        if (!res.headersSent) {
            res.json(keamanan);
        }
    } catch (err) {
        if (!res.headersSent) {
            res.status(404).json({ message: 'Keamanan tidak ditemukan' });
        }
    }
});

// Route untuk menghapus keamanan
router.delete('/:id', async (req, res) => {
    try {
        await keamananController.deleteKeamanan(req, res);
        if (!res.headersSent) {
            res.json({ message: 'Keamanan berhasil dihapus' });
        }
    } catch (err) {
        if (!res.headersSent) {
            res.status(404).json({ message: 'Keamanan tidak ditemukan' });
        }
    }
});

module.exports = router;