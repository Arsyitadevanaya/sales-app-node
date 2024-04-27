const knex = require('../../databases');
const { check, validationResult } = require('express-validator');

module.exports = {
    createSales: async (req, res) => {
        const { id_pelanggan, tanggal } = req.body;
        await check('tanggal').isDate().notEmpty().run(req);
        const result = validationResult(req);
        if (!result.isEmpty()) return res.status(400).json({ errors: result.array() });
        try {
            const [sales] = await knex('sales').insert({
                id_pelanggan, tanggal
            });
            if (!sales) throw new Error('Failed to create sales');
            return res.status(200).json({ message: 'Success Create Sales' });
        } catch (error) {
            return res.status(500).json({ message: error.message });
        }
    },
    getSales: async (req, res) => {
        try {
            const sales = await knex('sales').select('*');
            if (sales.length === 0) return res.status(404).json({ message: 'Sales is Empty' });
            return res.status(200).json({ data: sales, message: "Berhasil mengambil semua data penjualan" });
        } catch (error) {
            return res.status(500).json({ message: error.message });
        }
    },
    getSale: async (req, res) => {
        const { id } = req.params;
        try {
            const sale = await knex('sales').select('*').where({ id });
            if (sale.length === 0) return res.status(404).json({ message: 'Sale is Empty' });
            return res.status(200).json({ data: sale, message: "Berhasil mengambil data penjualan" });
        } catch (error) {
            return res.status(500).json({ message: error.message });
        }
    },
    updateSale: async (req, res) => {
        const { id } = req.params;
        const { id_pelanggan, tanggal } = req.body;
        await check('tanggal').isString().notEmpty().run(req);
        const result = validationResult(req);
        if (!result.isEmpty()) return res.status(400).json({ errors: result.array() });
        try {
            const sale = await knex('sales').where('id', id).update({
                id_pelanggan, tanggal
            });
            if (sale === 0) throw new Error('Failed to update sale');
            return res.status(200).json({ message: 'Success Update Sale' });
        } catch (error) {
            return res.status(500).json({ message: error.message });
        }
    },
    deleteSale: async (req, res) => {
        const { id } = req.params;
        try {
            const sale = await knex('sales').where({ id }).first();
            if (!sale) return res.status(400).json({ message: "Data Tidak Ditemukan" });
            const sales = await knex('sales').where({ id }).del();
            return res.status(200).json({ data: sales, message: "Berhasil menghapus penjualan" });
        } catch (error) {
            return res.status(500).json({ message: error.message });
        }
    }
};
