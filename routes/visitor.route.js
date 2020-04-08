const express = require('express');
const router = express.Router();

const visitor_controller = require('../controllers/visitor.controller');

router.get('/test', visitor_controller.test);

router.post('/create', visitor_controller.visitor_create);

router.get('/validate', visitor_controller.visitor_validate);

router.get('/:id', visitor_controller.visitor_details);

router.put(':/id/update', visitor_controller.visitor_update);

router.delete(':/id/delete', visitor_controller.visitor_delete);
module.exports = router;