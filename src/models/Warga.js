// This model is kept for reference but the actual data operations use Google Sheets service
// In a real implementation with Google Sheets, we wouldn't use Mongoose models
// This file shows what the data structure would look like

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const wargaSchema = new Schema({
    id: {
        type: String,
        unique: true
    },
    nomor_kk: {
        type: String,
        required: true
    },
    nama_kk: {
        type: String,
        required: true
    },
    nama_lengkap: {
        type: String,
        required: true
    },
    nik: {
        type: String,
        required: true,
        unique: true
    },
    tempat_lahir: {
        type: String
    },
    tanggal_lahir: {
        type: Date
    },
    jenis_kelamin: {
        type: String,
        enum: ['L', 'P'],
        required: true
    },
    agama: {
        type: String
    },
    pekerjaan: {
        type: String
    },
    alamat: {
        type: String,
        required: true
    },
    rt: {
        type: String,
        required: true
    },
    rw: {
        type: String,
        required: true
    },
    no_rumah: {
        type: String
    },
    telepon: {
        type: String
    },
    email: {
        type: String
    },
    status_keluarga: {
        type: String,
        enum: ['Kepala Keluarga', 'Istri', 'Anak', 'Lainnya'],
        required: true
    },
    status_kawin: {
        type: String
    },
    pendidikan: {
        type: String
    },
    golongan_darah: {
        type: String
    },
    kewarganegaraan: {
        type: String,
        default: 'Indonesia'
    },
    foto: {
        type: String
    },
    created_at: {
        type: Date,
        default: Date.now
    },
    updated_at: {
        type: Date,
        default: Date.now
    }
});

const Warga = mongoose.model('Warga', wargaSchema);

module.exports = Warga;