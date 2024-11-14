const { Genero } = require("../models");

exports.createGenero = async (req, res) => {
  try {
    const { nome } = req.body;

    const generoExistente = await Genero.findOne({ where: { nome } });
    if (generoExistente) {
      return res.status(400).json({ message: "Gênero já existe" });
    }

    const genero = await Genero.create({ nome });

    res.status(201).json(genero);
  } catch (error) {
    res.status(500).json({ message: "Erro ao criar gênero", error });
  }
};

exports.getAllGeneros = async (req, res) => {
  try {
    const generos = await Genero.findAll();
    res
      .status(200)
      .json({ message: "Gêneros encontrados com sucesso", generos });
  } catch (error) {
    console.error(error);
    res.status(500).send({ error: "Erro ao buscar gêneros" });
  }
};

exports.deleteGenero = async (req, res) => {
  try {
    const { id } = req.params;
    const genero = await Genero.findByPk(id);

    if (!genero) {
      return res.status(404).json({ message: "Genero não encontrado" });
    }
    await genero.destroy();
    res.status(200).json({ message: "Genero deletado com sucesso" });
  } catch (error) {
    res.status(500).json({ message: "Erro ao deletar genero", error });
  }
};

exports.updateGenero = async (req, res) => {
  try {
    const { id } = req.params;
    const { nome } = req.body;

    const genero = await Genero.findByPk(id);
    if (!genero) {
      return res.status(404).json({ message: "Gênero não encontrado" });
    }

    const generoExistente = await Genero.findOne({ where: { nome } });
    if (generoExistente && generoExistente.id !== parseInt(id)) {
      return res
        .status(400)
        .json({ message: "Já existe um gênero com esse nome" });
    }

    genero.nome = nome;
    await genero.save();

    res.status(200).json({ message: "Gênero atualizado com sucesso", genero });
  } catch (error) {
    res.status(500).json({ message: "Erro ao atualizar gênero", error });
  }
};
