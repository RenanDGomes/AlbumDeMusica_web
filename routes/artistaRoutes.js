const express = require("express");
const router = express.Router();
const artistaController = require("../controllers/artistaController");

router.post("/", artistaController.createArtista);
router.get("/", artistaController.getAllArtistas);
router.delete("/:id", artistaController.deleteArtista);

module.exports = router;
