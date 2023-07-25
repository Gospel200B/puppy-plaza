const express = require ('express');
const router = express.Router();
const categoryRouter = require('./category.route')
const productRouter = require ('../routes/product.route')
const userRouter = require('../routes/user.route')

router.use('/category', categoryRouter)
router.use('/product', productRouter)
router.use('/user', userRouter)


module.exports = router