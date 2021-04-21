const express = require('express');
const router = express.Router();
const apiController = require('../controllers/apiController');
// const { uploadSingle } = require('../middlewares/multer');

router.get('/contact', apiController.contact);

module.exports = router;
