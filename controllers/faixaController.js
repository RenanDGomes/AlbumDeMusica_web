const { Faixa, Disco } = require('../models');

exports.createFaixa = async (req, res) => {
  try {
    const { nome, duracao, discoId } = req.body;

    const disco = await Disco.findByPk(discoId);
    if (!disco) {
      return res.status(404).json({ message: 'Disco não encontrado' });
    }

    const faixa = await Faixa.create({
      nome,
      duracao,
      discoId,  
    });

    res.status(201).json(faixa);
  } catch (error) {
    res.status(500).json({ message: 'Erro ao criar faixa', error });
  }
};

exports.deleteFaixa = async (req,res) => {
    try {
        const { id } = req.params;
        const faixa = await Faixa.findByPk(id);

        if (!faixa) {
            return res.status(404).json({ message: "Faixa não encontrada"});
        }
        await faixa.destroy();
        return res.status(200).json({ message: `Faixa ${faixa.nome}deletada`})
    } catch (error) {
        res.status(500).json({ message: "Erro ao deletar faixa", error})
    }
};



