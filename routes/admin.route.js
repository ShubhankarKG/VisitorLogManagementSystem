const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');

const admin_controller = require('../controllers/admin.controller');

router.post('/register', admin_controller.admin_register);
router.post('/login', admin_controller.admin_login);
router.get('/get_admin', auth, admin_controller.admin_details);

module.exports = router;