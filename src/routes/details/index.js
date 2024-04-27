const express = require('express')
const {createDetail, getDetails, getDetail, updateDetail, deleteDetail} = require('../../resolvers/detail')

const router = express.Router()

router.post('/', createDetail)
router.get('/', getDetails)
router.get('/:id', getDetail)
router.put('/:id', updateDetail)
router.delete('/:id', deleteDetail)

module.exports = router