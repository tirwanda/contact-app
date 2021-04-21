const router = require('express').Router();
const adminController = require('../controllers/adminController');
const { uploadSingle, uploadMultiple } = require('../middlewares/multer');

router.get('/', adminController.viewDashboard);
router.post('/', uploadSingle, adminController.addContact);
router.put('/', uploadSingle, adminController.editContact);
router.delete('/:id', adminController.deleteContact);

module.exports = router;
