const express = require("express");
const router = express.Router();

const faculty_controller = require("../controllers/faculty.controller");

router.post("/create", faculty_controller.faculty_create);

module.exports = router;