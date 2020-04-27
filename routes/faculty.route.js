const express = require("express");
const router = express.Router();
const auth = require('../middleware/auth');
const faculty_controller = require("../controllers/faculty.controller");

router.get("/", auth, faculty_controller.faculty_retrieve);
router.post("/create",auth, faculty_controller.faculty_create);

module.exports = router;