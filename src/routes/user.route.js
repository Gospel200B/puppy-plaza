const express = require('express');
const router = express.Router();
const {registerUser, getUser, getAllUser, updateUser, deleteUser, loginUser, countUsers} = require('../controllers/user.controller')

router.route('/signup').post(registerUser)
router.route('/:id').get(getUser)
router.route('/').get(getAllUser)
router.route('/:id').put(updateUser)
router.route('/:id').delete(deleteUser)
router.route('/login').post(loginUser)
router.route('/get/count').get(countUsers)

module.exports = router;