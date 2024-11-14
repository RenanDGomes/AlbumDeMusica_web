const express = require("express");
const router = express.Router();
const generoController = require("../controllers/generoController");

router.post("/", generoController.createGenero);
router.get("/", generoController.getAllGeneros);
router.delete("/:id", generoController.deleteGenero);
router.put("/:id", generoController.updateGenero);

module.exports = router;