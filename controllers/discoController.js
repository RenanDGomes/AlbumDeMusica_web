const { Disco, Artista, Faixa, Genero } = require("../models");

exports.createDisco = async (req, res) => {
  try {
    const { titulo, ano, capa, idArtista, faixas, idGenero } = req.body;

    const artista = await Artista.findByPk(idArtista);
    if (!artista) {
      return res.status(400).json({ message: "Artista não encontrado" });
    }

    const disco = await Disco.create({
      titulo,
      ano,
      capa,
    });

    await disco.addArtista(artista);

    if (Array.isArray(idGenero) && idGenero.length > 0) {
      const generosAssociados = await Genero.findAll({
        where: { id: idGenero },
      });
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

    const discoComArtistaEGeneros = await Disco.findByPk(disco.id, {
      include: [
        {
          model: Artista,
          as: "artistas",
        },
        {
          model: Genero,
          as: "generos",
        },
      ],
    });

    res.status(201).json(discoComArtistaEGeneros);
  } catch (error) {
    res.status(500).json({ message: "Erro ao criar disco", error });
  }
};

exports.getAllDiscos = async (req, res) => {
  try {
    const discos = await Disco.findAll();
    res.json(discos);
  } catch (error) {
    res.status(500).json({ message: "Erro ao buscar discos", error });
  }
};

exports.deleteDisco = async (req, res) => {
  const { id } = req.params;

  try {
    const disco = await Disco.findByPk(id);
    if (!disco) {
      return res.status(404).json({ message: "Disco não encontrado" });
    }

    await disco.destroy();

    res.status(200).json({ message: "Disco deletado com sucesso" });
  } catch (error) {
    res.status(500).json({ message: "Erro ao deletar disco", error });
  }
};
exports.getDiscoById = async (req, res) => {
  const { id } = req.params;

  try {
    const disco = await Disco.findByPk(id, {
      include: [
        {
          model: Artista,
          as: "artistas",
        },
        {
          model: Genero,
          as: "generos",
        },
        {
          model: Faixa,
          as: "faixas",
        },
      ],
    });

    if (!disco) {
      return res.status(404).json({ message: "Disco não encontrado" });
    }

    res.status(200).json(disco);
  } catch (error) {
    res.status(500).json({ message: "Erro ao buscar disco", error });
  }
};
