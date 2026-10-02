const express = require('express');
const cors = require('cors');
const path = require('path');
require('dotenv').config({ path: path.resolve(__dirname, '../../.env') });

// Import routes
const wargaRoutes = require('./routes/warga');
const aktivitasRoutes = require('./routes/aktivitas');
const pengumumanRoutes = require('./routes/pengumuman');
const keamananRoutes = require('./routes/keamanan');
const layananRoutes = require('./routes/layanan');
const iuranRoutes = require('./routes/iuran');

// Import controllers
const LaporanController = require('./controllers/LaporanController');

const app = express();

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.static(path.join(__dirname, '../public')));

// Routes
app.use('/api/warga', wargaRoutes);
app.use('/api/aktivitas', aktivitasRoutes);
app.use('/api/pengumuman', pengumumanRoutes);
app.use('/api/keamanan', keamananRoutes);
app.use('/api/layanan', layananRoutes);
app.use('/api/iuran', iuranRoutes);

// Dashboard routes
app.get('/api/dashboard', LaporanController.getDashboard);
app.get('/api/warga/stats', LaporanController.getWargaStats);
app.get('/api/aktivitas/stats', LaporanController.getAktivitasStats);
app.get('/api/keuangan/stats', LaporanController.getKeuanganStats);
app.get('/api/keamanan/stats', LaporanController.getKeamananStats);
app.get('/api/laporan/:year/:month', LaporanController.getMonthlyReport);

// Serve dashboard HTML
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '../public/index.html'));
});

// Error handling middleware
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({ message: 'Something went wrong!' });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});

module.exports = app;