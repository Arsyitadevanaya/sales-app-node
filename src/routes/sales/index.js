const express = require('express')
const {createSales, getSales, getSale, updateSale, deleteSale} = require('../../resolvers/sales')

const router = express.Router()

router.post('/', createSales)
router.get('/', getSales)
router.get('/:id', getSale)
router.put('/:id', updateSale)
router.delete('/:id', deleteSale)


module.exports = router