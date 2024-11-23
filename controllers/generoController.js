const { Genero } = require("../models");

exports.getAllGeneros = async (req, res) => {
  try {
    const generos = await Genero.findAll();
    res.render("generos", { generos, message: null });
  } catch (error) {
    res.status(500).render("error", { message: "Erro ao buscar gêneros", error });
  }
};

exports.createGenero = async (req, res) => {
  try {
    const { nome } = req.body;

    const generoExistente = await Genero.findOne({ where: { nome } });
    if (generoExistente) {
      return res.render("generos", { generos: await Genero.findAll(), message: "Gênero já existe." });
    }

    await Genero.create({ nome });
    res.redirect("/generos");
  } catch (error) {
    res.status(500).render("error", { message: "Erro ao criar gênero", error });
  }
};

exports.updateGenero = async (req, res) => {
  try {
    const { id } = req.params;
    const { nome } = req.body;

    const genero = await Genero.findByPk(id);
    if (!genero) {
      return res.status(404).render("error", { message: "Gênero não encontrado" });
    }

    genero.nome = nome;
    await genero.save();

    res.redirect("/generos");
  } catch (error) {
    res.status(500).render("error", { message: "Erro ao editar gênero", error });
  }
};

exports.deleteGenero = async (req, res) => {
  try {
    const { id } = req.params;

    const genero = await Genero.findByPk(id);
    if (!genero) {
      return res.status(404).render("error", { message: "Gênero não encontrado" });
    }

    await genero.destroy();

    res.redirect("/generos");
  } catch (error) {
    res.status(500).render("error", { message: "Erro ao deletar gênero", error });
  }
};
