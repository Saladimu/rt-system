// Replace the existing pengumuman.js with Google Sheets version
const express = require('express');
const router = express.Router();
const pengumumanController = require('../controllers/PengumumanController');

// Route untuk menampilkan semua pengumuman
router.get('/', async (req, res) => {
    try {
        const pengumuman = await pengumumanController.getAllPengumuman(req, res);
        // If res hasn't been sent yet, send the data
        if (!res.headersSent) {
            res.json(pengumuman);
        }
    } catch (err) {
        if (!res.headersSent) {
            res.status(500).json({ message: err.message });
        }
    }
});

// Route untuk menampilkan pengumuman berdasarkan id
router.get('/:id', async (req, res) => {
    try {
        const pengumuman = await pengumumanController.getPengumumanById(req, res);
        if (!res.headersSent) {
            res.json(pengumuman);
        }
    } catch (err) {
        if (!res.headersSent) {
            res.status(404).json({ message: 'Pengumuman tidak ditemukan' });
        }
    }
});

// Route untuk menambah pengumuman baru
router.post('/', async (req, res) => {
    try {
        const pengumuman = await pengumumanController.createPengumuman(req, res);
        if (!res.headersSent) {
            res.status(201).json(pengumuman);
        }
    } catch (err) {
        if (!res.headersSent) {
            res.status(400).json({ message: err.message });
        }
    }
});

// Route untuk mengupdate pengumuman
router.put('/:id', async (req, res) => {
    try {
        const pengumuman = await pengumumanController.updatePengumuman(req, res);
        if (!res.headersSent) {
            res.json(pengumuman);
        }
    } catch (err) {
        if (!res.headersSent) {
            res.status(404).json({ message: 'Pengumuman tidak ditemukan' });
        }
    }
});

// Route untuk menghapus pengumuman
router.delete('/:id', async (req, res) => {
    try {
        await pengumumanController.deletePengumuman(req, res);
        if (!res.headersSent) {
            res.json({ message: 'Pengumuman berhasil dihapus' });
        }
    } catch (err) {
        if (!res.headersSent) {
            res.status(404).json({ message: 'Pengumuman tidak ditemukan' });
        }
    }
});

module.exports = router;