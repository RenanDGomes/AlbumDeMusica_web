const { Faixa, Disco } = require('../models');

exports.createFaixa = async (req, res) => {
  try {
    const { nome, duracao, discoId } = req.body;

    const disco = await Disco.findByPk(discoId);
    if (!disco) {
      return res.status(404).render("error", { message: "Disco não encontrado" });
    }

    await Faixa.create({ nome, duracao, discoId });

    res.redirect(`/discos/${discoId}`);
  } catch (error) {
    res.status(500).render("error", { message: "Erro ao criar faixa", error });
  }
};

exports.deleteFaixa = async (req, res) => {
  try {
    const { id } = req.params;

    const faixa = await Faixa.findByPk(id);
    if (!faixa) {
      return res.status(404).render("error", { message: "Faixa não encontrada" });
    }

    const discoId = faixa.discoId; 
    await faixa.destroy();

    res.redirect(`/discos/${discoId}`);
  } catch (error) {
    res.status(500).render("error", { message: "Erro ao deletar faixa", error });
  }
};


