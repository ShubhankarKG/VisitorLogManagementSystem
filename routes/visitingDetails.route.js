const express = require("express");
const router = express.Router();

const visitingDetailController = require("../controllers/visitingDetails.controller");

router.post('/', visitingDetailController.update_details);
router.post('/mail', visitingDetailController.send_email);
router.get('/:user', visitingDetailController.retrieve_details);

module.exports = router;

