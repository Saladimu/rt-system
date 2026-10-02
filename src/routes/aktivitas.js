// Replace the existing aktivitas.js with Google Sheets version
const express = require('express');
const router = express.Router();
const aktivitasController = require('../controllers/AktivitasController');

// Route untuk menampilkan semua aktivitas
router.get('/', async (req, res) => {
    try {
        const aktivitas = await aktivitasController.getAllAktivitas(req, res);
        // If res hasn't been sent yet, send the data
        if (!res.headersSent) {
            res.json(aktivitas);
        }
    } catch (err) {
        if (!res.headersSent) {
            res.status(500).json({ message: err.message });
        }
    }
});

// Route untuk menampilkan aktivitas berdasarkan id
router.get('/:id', async (req, res) => {
    try {
        const aktivitas = await aktivitasController.getAktivitasById(req, res);
        if (!res.headersSent) {
            res.json(aktivitas);
        }
    } catch (err) {
        if (!res.headersSent) {
            res.status(404).json({ message: 'Aktivitas tidak ditemukan' });
        }
    }
});

// Route untuk menambah aktivitas baru
router.post('/', async (req, res) => {
    try {
        const aktivitas = await aktivitasController.createAktivitas(req, res);
        if (!res.headersSent) {
            res.status(201).json(aktivitas);
        }
    } catch (err) {
        if (!res.headersSent) {
            res.status(400).json({ message: err.message });
        }
    }
});

// Route untuk mengupdate aktivitas
router.put('/:id', async (req, res) => {
    try {
        const aktivitas = await aktivitasController.updateAktivitas(req, res);
        if (!res.headersSent) {
            res.json(aktivitas);
        }
    } catch (err) {
        if (!res.headersSent) {
            res.status(404).json({ message: 'Aktivitas tidak ditemukan' });
        }
    }
});

// Route untuk menghapus aktivitas
router.delete('/:id', async (req, res) => {
    try {
        await aktivitasController.deleteAktivitas(req, res);
        if (!res.headersSent) {
            res.json({ message: 'Aktivitas berhasil dihapus' });
        }
    } catch (err) {
        if (!res.headersSent) {
            res.status(404).json({ message: 'Aktivitas tidak ditemukan' });
        }
    }
});

module.exports = router;