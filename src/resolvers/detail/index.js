const knex = require('../../databases');
const { check, validationResult } = require('express-validator');

module.exports = {
    createDetail: async (req, res) => {
        const { id_penjualan, id_barang, jumlah, subtotal } = req.body;
        await check('jumlah').isInt().notEmpty().run(req);
        await check('subtotal').isDecimal().notEmpty().run(req);
        const result = validationResult(req);
        if (!result.isEmpty()) return res.status(400).json({ errors: result.array() });
        try {
            const [detail] = await knex('detail').insert({
                id_penjualan, id_barang, jumlah, subtotal
            });
            if (!detail) throw new Error('Failed to create detail');
            return res.status(200).json({ message: 'Success Create Detail' });
        } catch (error) {
            return res.status(500).json({ message: error.message });
        }
    },
    getDetails: async (req, res) => {
        try {
            const details = await knex('detail').select('*');
            if (details.length === 0) return res.status(404).json({ message: 'Detail is Empty' });
            return res.status(200).json({ data: details, message: "Berhasil mengambil semua data detail" });
        } catch (error) {
            return res.status(500).json({ message: error.message });
        }
    },
    getDetail: async (req, res) => {
        const { id_penjualan } = req.params;
        try {
            const detail = await knex('detail').select('*').where({ id_penjualan });
            if (detail.length === 0) return res.status(404).json({ message: 'Detail is Empty' });
            return res.status(200).json({ data: detail, message: "Berhasil mengambil data detail" });
        } catch (error) {
            return res.status(500).json({ message: error.message });
        }
    },
    updateDetail: async (req, res) => {
        const { id_penjualan } = req.params;
        const { id_barang, jumlah, subtotal } = req.body;
        await check('jumlah').isInt().notEmpty().run(req);
        await check('subtotal').isDecimal().notEmpty().run(req);
        const result = validationResult(req);
        if (!result.isEmpty()) return res.status(400).json({ errors: result.array() });
        try {
            const detail = await knex('detail').where('id_penjualan', id_penjualan).update({
                id_barang, jumlah, subtotal
            }).where({ id_penjualan });
            if (detail === 0) throw new Error('Failed to update detail');
            return res.status(200).json({ message: 'Success Update Detail' });
        } catch (error) {
            return res.status(500).json({ message: error.message });
        }
    },
    deleteDetail: async (req, res) => {
        const { id_penjualan } = req.params;
        try {
            const detail = await knex('detail').where({ id_penjualan }).first();
            if (!detail) return res.status(400).json({ message: "Data Tidak Ditemukan" });
            const details = await knex('detail').where({ id_penjualan }).del();
            return res.status(200).json({ data: details, message: "Berhasil menghapus detail" });
        } catch (error) {
            return res.status(500).json({ message: error.message });
        }
    }
};
