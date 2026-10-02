const express = require('express');
const router = express.Router();
const iuranController = require('../controllers/IuranController');

// Route untuk menampilkan semua iuran
router.get('/', async (req, res) => {
    try {
        const iuran = await iuranController.getAllIuran(req, res);
        // If res hasn't been sent yet, send the data
        if (!res.headersSent) {
            res.json(iuran);
        }
    } catch (err) {
        if (!res.headersSent) {
            res.status(500).json({ message: err.message });
        }
    }
});

// Route untuk menampilkan iuran berdasarkan id
router.get('/:id', async (req, res) => {
    try {
        const iuran = await iuranController.getIuranById(req, res);
        if (!res.headersSent) {
            res.json(iuran);
        }
    } catch (err) {
        if (!res.headersSent) {
            res.status(404).json({ message: 'Iuran tidak ditemukan' });
        }
    }
});

// Route untuk menambah iuran baru
router.post('/', async (req, res) => {
    try {
        const iuran = await iuranController.createIuran(req, res);
        if (!res.headersSent) {
            res.status(201).json(iuran);
        }
    } catch (err) {
        if (!res.headersSent) {
            res.status(400).json({ message: err.message });
        }
    }
});

// Route untuk mengupdate iuran
router.put('/:id', async (req, res) => {
    try {
        const iuran = await iuranController.updateIuran(req, res);
        if (!res.headersSent) {
            res.json(iuran);
        }
    } catch (err) {
        if (!res.headersSent) {
            res.status(404).json({ message: 'Iuran tidak ditemukan' });
        }
    }
});

// Route untuk menghapus iuran
router.delete('/:id', async (req, res) => {
    try {
        await iuranController.deleteIuran(req, res);
        if (!res.headersSent) {
            res.json({ message: 'Iuran berhasil dihapus' });
        }
    } catch (err) {
        if (!res.headersSent) {
            res.status(404).json({ message: 'Iuran tidak ditemukan' });
        }
    }
});

module.exports = router;