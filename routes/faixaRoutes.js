const express = require("express");
const router = express.Router();
const faixaController = require("../controllers/faixaController");

router.post("/", faixaController.createFaixa);
router.delete("/:id", faixaController.deleteFaixa);

module.exports = router;
