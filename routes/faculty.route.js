const express = require("express");
const router = express.Router();

const faculty_controller = require("../controllers/faculty.controller");

router.get("/", faculty_controller.faculty_retrieve);
router.post("/create", faculty_controller.faculty_create);
router.post("/submit", faculty_controller.faculty_submit);

module.exports = router;