const express = require("express");
const router = express.Router();
const artistaController = require("../controllers/artistaController"); 

router.post("/", artistaController.createArtista);
router.get("/", artistaController.getAllArtistas);
router.put("/:id", artistaController.editarArtista); 
router.delete("/:id", artistaController.deleteArtista);

module.exports = router;
