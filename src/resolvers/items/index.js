const knex = require('../../databases');
const { check, validationResult } = require('express-validator');

module.exports = {
    createItem: async (req, res) => {
        const { nama_barang, harga, stok } = req.body;
        await check('nama_barang').isString().notEmpty().run(req);
        await check('harga').isDecimal().notEmpty().run(req);
        await check('stok').isInt().notEmpty().run(req);
        const result = validationResult(req);
        if (!result.isEmpty()) return res.status(400).json({ errors: result.array() });
        try {
            const [item] = await knex('items').insert({
                nama_barang, harga, stok
            });
            if (!item) throw new Error('Failed to create item');
            return res.status(200).json({ message: 'Success Create Items' });
        } catch (error) {
            return res.status(500).json({ message: error.message });
        }
    },
    getItems: async (req, res) => {
        try {
            const items = await knex('items').select('*');
            if (items.length === 0) return res.status(404).json({ message: 'Items is Empty' });
            return res.status(200).json({ data: items, message: "Berhasil mengambil semua data barang" });
        } catch (error) {
            return res.status(500).json({ message: error.message });
        }
    },
    getItem: async (req, res) => {
        const { id } = req.params;
        try {
            const item = await knex('items').select('*').where({ id });
            if (item.length === 0) return res.status(404).json({ message: 'Item is Empty' });
            return res.status(200).json({ data: item, message: "Berhasil mengambil data barang" });
        } catch (error) {
            return res.status(500).json({ message: error.message });
        }
    },
    updateItem: async (req, res) => {
        const { id } = req.params;
        const { nama_barang, harga, stok } = req.body;
        await check('nama_barang').isString().notEmpty().run(req);
        await check('harga').isDecimal().notEmpty().run(req);
        await check('stok').isInt().notEmpty().run(req);
        const result = validationResult(req);
        if (!result.isEmpty()) return res.status(400).json({ errors: result.array() });
        try {
            const item = await knex('items').where('id', id).update({
                nama_barang, harga, stok
            });
            if (item === 0) throw new Error('Failed to update item');
            return res.status(200).json({ message: 'Success Update Item' });
        } catch (error) {
            return res.status(500).json({ message: error.message });
        }
    },
    deleteItem: async (req, res) => {
        const { id } = req.params;
        try {
            const item = await knex('items').where({ id }).first();
            if (!item) return res.status(400).json({ message: "Data Tidak Ditemukan" });
            const items = await knex('items').where({ id }).del();
            return res.status(200).json({ data: items, message: "Berhasil menghapus item" });
        } catch (error) {
            return res.status(500).json({ message: error.message });
        }
    }
};
