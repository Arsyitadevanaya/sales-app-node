const knex = require('../../databases');
const { check, validationResult } = require('express-validator');

module.exports = {
    createUser: async (req, res) => {
        const { nama_pelanggan, alamat, telepon } = req.body;
        await check('nama_pelanggan').isString().notEmpty().run(req);
        await check('alamat').isString().notEmpty().run(req);
        await check('telepon').isString().notEmpty().run(req);
        const result = validationResult(req);
        if (!result.isEmpty()) return res.status(400).json({ errors: result.array() });
        try {
            const [user] = await knex('users').insert({
                nama_pelanggan, alamat, telepon
            });
            if (!user) throw new Error('Failed to create user');
            return res.status(200).json({ message: 'Success Create User' });
        } catch (error) {
            return res.status(500).json({ message: error.message });
        }
    },
    getUsers: async (req, res) => {
        try {
            const users = await knex('users').select('*');
            if (users.length === 0) return res.status(404).json({ message: 'User is Empty' });
            return res.status(200).json({ data: users, message: "Berhasil mengambil semua data users" });
        } catch (error) {
            return res.status(500).json({ message: error.message });
        }
    },
    getUser: async (req, res) => {
        const { id } = req.params;
        try {
            const user = await knex('users').select('*').where({ id });
            if (user.length === 0) return res.status(404).json({ message: 'User is Empty' });
            return res.status(200).json({ data: user, message: "Berhasil mengambil data user" });
        } catch (error) {
            return res.status(500).json({ message: error.message });
        }
    },
    updateUser: async (req, res) => {
        const { id } = req.params;
        const { nama_pelanggan, alamat, telepon } = req.body;
        await check('nama_pelanggan').isString().notEmpty().run(req);
        await check('alamat').isString().notEmpty().run(req);
        await check('telepon').isString().notEmpty().run(req);
        const result = validationResult(req);
        if (!result.isEmpty()) return res.status(400).json({ errors: result.array() });
        try {
            const user = await knex('users').where('id', id).update({
                nama_pelanggan, alamat, telepon
            });
            if (user === 0) throw new Error('Failed to update user');
            return res.status(200).json({ message: 'Success Update User' });
        } catch (error) {
            return res.status(500).json({ message: error.message });
        }
    },
    deleteUser: async (req, res) => {
        const { id } = req.params;
        try {
            const user = await knex('users').where({ id }).first();
            if (!user) return res.status(400).json({ message: "Data Tidak Ditemukan" });
            const users = await knex('users').where({ id }).del();
            return res.status(200).json({ data: users, message: "Berhasil menghapus user" });
        } catch (error) {
            return res.status(500).json({ message: error.message });
        }
    }
};
