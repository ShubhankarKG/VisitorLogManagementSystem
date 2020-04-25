const express = require('express');
const router = express.Router();

const admin_controller = require('../controllers/admin.controller');

router.post('/register', admin_controller.admin_register);

module.exports = router;