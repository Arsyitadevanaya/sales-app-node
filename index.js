const express = require('express')
const morgan = require('morgan')

require('dotenv').config()

const app = express()

const userRouter= require('./src/routes/users')
const saleRouter= require('./src/routes/sales')
const itemRouter= require('./src/routes/items')
const detailRouter= require('./src/routes/details')

app.use(express.json())
app.use(express.urlencoded({extended:true}))
app.use(morgan('dev'))

app.use('/users', userRouter)
app.use('/sale', saleRouter)
app.use('/item', itemRouter)
app.use('/detail', detailRouter)

app.listen(process.env.PORT, () => {
  console.log(`Server running on http://localhost:${process.env.PORT}`);
});