const { Artista, Genero } = require("../models");

exports.createArtista = async (req, res) => {
  try {
    const { nome, generoMusical } = req.body;

    const [genero, created] = await Genero.findOrCreate({
      where: { nome: generoMusical },
    });

    const artista = await Artista.create({
      nome,
    });

    await artista.addGenero(genero);

    const artistaComGeneros = await Artista.findOne({
      where: { id: artista.id },
      include: [
        {
          model: Genero,
          as: "generos",
        },
      ],
    });

    res.status(201).json(artistaComGeneros);
  } catch (error) {
    res.status(500).json({ message: "Erro ao criar artista", error });
  }
};

exports.getAllArtistas = async (req, res) => {
  try {
    const artistas = await Artista.findAll({
      include: [
        {
          model: Genero,
          as: "generos",
        },
      ],
    });
    res.json(artistas);
  } catch (error) {
    res.status(500).json({ message: "Erro ao buscar artistas", error });
  }
};

exports.deleteArtista = async (req, res) => {
  try {
    const { id } = req.params;
    const artista = await Artista.findByPk(id);

    if (!artista) {
      return res.status(404).json({ message: "Artista não encontrado" });
    }
    await artista.destroy();
    res.status(200).json({ message: "Artista deletado com sucesso" });
  } catch (error) {
    res.status(500).json({ message: "Erro ao deletar artista", error });
  }
};
