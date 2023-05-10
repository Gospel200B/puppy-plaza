const express = require('express');
const { createCategory, deleteCategory, getCategory, getCategoryList, updateCategory } = require('../controllers/category.controller');
const router = express.Router();

router.route('/create').post(createCategory);
router.route('/delete/:id').delete(deleteCategory);
router.route('/:id').get(getCategory);
router.route('/').get(getCategoryList)
router.route('/:id').put(updateCategory)

module.exports = router;