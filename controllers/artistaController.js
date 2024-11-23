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

    const artistas = await Artista.findAll({
      include: [
        {
          model: Genero,
          as: "generos",
        },
      ],
    });

    res.render("artistas", { artistas, message: "Artista criado com sucesso!" });
  } catch (error) {
    res.status(500).render("error", { message: "Erro ao criar artista", error });
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
    res.render("artistas", { artistas });
  } catch (error) {
    res.status(500).render("error", { message: "Erro ao buscar artistas", error });
  }
};

exports.deleteArtista = async (req, res) => {
  try {
    const { id } = req.params;
    const artista = await Artista.findByPk(id);

    if (!artista) {
      return res.status(404).render("error", { message: "Artista não encontrado" });
    }

    await artista.destroy();

    const artistas = await Artista.findAll({
      include: [
        {
          model: Genero,
          as: "generos",
        },
      ],
    });

    res.render("artistas", { artistas, message: "Artista deletado com sucesso!" });
  } catch (error) {
    res.status(500).render("error", { message: "Erro ao deletar artista", error });
  }
};

exports.editarArtista = async (req, res) => {
  try {
    const { id } = req.params;
    const { nome, generoMusical } = req.body;

    console.log({ id, nome, generoMusical });

    const artista = await Artista.findByPk(id, {
      include: [{ model: Genero, as: "generos" }],
    });

    if (!artista) {
      return res.status(404).render("error", { message: "Artista não encontrado" });
    }

    if (nome) artista.nome = nome;

    if (generoMusical) {
      const generosNomes = generoMusical.split(",").map((g) => g.trim());
      const generos = await Promise.all(
        generosNomes.map((nome) =>
          Genero.findOrCreate({ where: { nome } }).then(([genero]) => genero)
        )
      );

      await artista.setGeneros(generos);
    }

    await artista.save();
    res.redirect("/artistas");
  } catch (error) {
    console.error("Erro ao editar artista:", error);
    res.status(500).render("error", { message: "Erro ao editar artista", error });
  }
};


exports.getArtistaById = async (req, res) => {
  try {
    const { id } = req.params;

    const artista = await Artista.findByPk(id, {
      include: [{ model: Genero, as: "generos" }],
    });

    if (!artista) {
      return res.status(404).render("error", { message: "Artista não encontrado" });
    }

    res.render("editarArtista", { artista });
  } catch (error) {
    res.status(500).render("error", { message: "Erro ao carregar artista para edição", error });
  }
};