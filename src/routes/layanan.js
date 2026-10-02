// Replace the existing layanan.js with Google Sheets version
const express = require('express');
const router = express.Router();
const layananController = require('../controllers/LayananController');

// Route untuk menampilkan semua layanan masyarakat
router.get('/', async (req, res) => {
    try {
        const layanan = await layananController.getAllLayanan(req, res);
        // If res hasn't been sent yet, send the data
        if (!res.headersSent) {
            res.json(layanan);
        }
    } catch (err) {
        if (!res.headersSent) {
            res.status(500).json({ message: err.message });
        }
    }
});

// Route untuk menampilkan layanan berdasarkan id
router.get('/:id', async (req, res) => {
    try {
        const layanan = await layananController.getLayananById(req, res);
        if (!res.headersSent) {
            res.json(layanan);
        }
    } catch (err) {
        if (!res.headersSent) {
            res.status(404).json({ message: 'Layanan tidak ditemukan' });
        }
    }
});

// Route untuk menambah layanan baru
router.post('/', async (req, res) => {
    try {
        const layanan = await layananController.createLayanan(req, res);
        if (!res.headersSent) {
            res.status(201).json(layanan);
        }
    } catch (err) {
        if (!res.headersSent) {
            res.status(400).json({ message: err.message });
        }
    }
});

// Route untuk mengupdate layanan
router.put('/:id', async (req, res) => {
    try {
        const layanan = await layananController.updateLayanan(req, res);
        if (!res.headersSent) {
            res.json(layanan);
        }
    } catch (err) {
        if (!res.headersSent) {
            res.status(404).json({ message: 'Layanan tidak ditemukan' });
        }
    }
});

// Route untuk menghapus layanan
router.delete('/:id', async (req, res) => {
    try {
        await layananController.deleteLayanan(req, res);
        if (!res.headersSent) {
            res.json({ message: 'Layanan berhasil dihapus' });
        }
    } catch (err) {
        if (!res.headersSent) {
            res.status(404).json({ message: 'Layanan tidak ditemukan' });
        }
    }
});

// Route untuk menampilkan layanan berdasarkan status
router.get('/status/:status', async (req, res) => {
    try {
        const layanan = await layananController.getLayananByStatus(req, res);
        if (!res.headersSent) {
            res.json(layanan);
        }
    } catch (err) {
        if (!res.headersSent) {
            res.status(500).json({ message: err.message });
        }
    }
});

// Route untuk menampilkan layanan berdasarkan jenis layanan
router.get('/jenis/:jenis', async (req, res) => {
    try {
        const layanan = await layananController.getLayananByJenis(req, res);
        if (!res.headersSent) {
            res.json(layanan);
        }
    } catch (err) {
        if (!res.headersSent) {
            res.status(500).json({ message: err.message });
        }
    }
});

module.exports = router;