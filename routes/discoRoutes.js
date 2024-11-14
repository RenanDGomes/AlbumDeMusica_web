const express = require("express");
const router = express.Router();
const discoController = require("../controllers/discoController");

router.post("/", discoController.createDisco);
router.get("/", discoController.getAllDiscos);
router.delete('/:id', discoController.deleteDisco);
router.get('/:id', discoController.getDiscoById)

module.exports = router;