const express = require("express");
const router = express.Router();
const faixaController = require("../controllers/faixaController");

router.post("/", faixaController.createFaixa);


module.exports = router;