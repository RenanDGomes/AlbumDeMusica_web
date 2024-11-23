const { Disco, Artista, Faixa, Genero } = require("../models");

exports.createDisco = async (req, res) => {
  try {
    const { titulo, anoLancamento, capa, idArtista, faixas, idGenero } = req.body;

    const artista = await Artista.findByPk(idArtista);
    if (!artista) {
      return res.status(400).render("error", { message: "Artista não encontrado" });
    }

    const disco = await Disco.create({ titulo, anoLancamento, capa });

    await disco.addArtista(artista);

    if (Array.isArray(idGenero) && idGenero.length > 0) {
      const generosAssociados = await Genero.findAll({ where: { id: idGenero } });
      await disco.addGeneros(generosAssociados);
    }

    if (faixas && faixas.length > 0) {
      for (let faixa of faixas) {
        await Faixa.create({
          nome: faixa.nome,
          duracao: faixa.duracao,
          discoId: disco.id,
        });
      }
    }

    const discos = await Disco.findAll({
      include: [
        { model: Artista, as: "artistas" },
        { model: Genero, as: "generos" },
      ],
    });

    const artistas = await Artista.findAll();
    const generos = await Genero.findAll();

    res.render("discos", {
      discos,
      artistas,
      generos,
      message: "Disco criado com sucesso!",
    });
  } catch (error) {
    res.status(500).render("error", { message: "Erro ao criar disco", error });
  }
};

exports.getAllDiscos = async (req, res) => {
  try {
    const discos = await Disco.findAll({
      include: [
        { model: Artista, as: "artistas" },
        { model: Genero, as: "generos" },
      ],
    });

    const artistas = await Artista.findAll();
    const generos = await Genero.findAll();

    res.render("discos", { discos, artistas, generos });
  } catch (error) {
    res.status(500).render("error", { message: "Erro ao buscar discos", error });
  }
};

exports.deleteDisco = async (req, res) => {
  const { id } = req.params;

  try {
    const disco = await Disco.findByPk(id);
    if (!disco) {
      return res.status(404).render("error", { message: "Disco não encontrado" });
    }

    await disco.destroy();

    const discos = await Disco.findAll({
      include: [
        { model: Artista, as: "artistas" },
        { model: Genero, as: "generos" },
      ],
    });

    const artistas = await Artista.findAll();
    const generos = await Genero.findAll();

    res.render("discos", {
      discos,
      artistas,
      generos,
      message: "Disco deletado com sucesso!",
    });
  } catch (error) {
    res.status(500).render("error", { message: "Erro ao deletar disco", error });
  }
};

exports.getDiscoById = async (req, res) => {
  const { id } = req.params;

  try {
    const disco = await Disco.findByPk(id, {
      include: [
        { model: Artista, as: "artistas" },
        { model: Genero, as: "generos" },
        { model: Faixa, as: "faixas" },
      ],
    });

    if (!disco) {
      return res.status(404).render("error", { message: "Disco não encontrado" });
    }

    res.render("discoDetalhe", { disco });
  } catch (error) {
    res.status(500).render("error", { message: "Erro ao buscar disco", error });
  }
};

exports.editarDisco = async (req, res) => {
  const { id } = req.params;
  const { titulo, anoLancamento, capa, idArtista, faixas, idGenero } = req.body;

  try {
    const disco = await Disco.findByPk(id);
    if (!disco) {
      return res.status(404).render("error", { message: "Disco não encontrado" });
    }

    await disco.update({ titulo, anoLancamento, capa });

    const artista = await Artista.findByPk(idArtista);
    if (artista) {
      await disco.setArtistas([artista]);
    }

    if (Array.isArray(idGenero) && idGenero.length > 0) {
      const generosAssociados = await Genero.findAll({ where: { id: idGenero } });
      await disco.setGeneros(generosAssociados);
    }

    if (faixas) {
      await Faixa.destroy({ where: { discoId: disco.id } });

      for (let faixa of faixas) {
        await Faixa.create({
          nome: faixa.nome,
          duracao: faixa.duracao,
          discoId: disco.id,
        });
      }
    }

    const discos = await Disco.findAll({
      include: [
        { model: Artista, as: "artistas" },
        { model: Genero, as: "generos" },
      ],
    });

    res.render("discos", { discos, message: "Disco atualizado com sucesso!" });
  } catch (error) {
    res.status(500).render("error", { message: "Erro ao editar disco", error });
  }
};
