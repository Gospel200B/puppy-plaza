const express = require ('express');
const router = express.Router();
const categoryRouter = require('./category.route')
const productRouter = require ('../routes/product.route')

router.use('/category', categoryRouter)
router.use('/product', productRouter)


module.exports = router