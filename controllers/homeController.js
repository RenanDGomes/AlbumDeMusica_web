const { Disco, Artista, Genero } = require('../models');

exports.getIndex = async (req, res) => {
  try {
    const totalDiscos = await Disco.count();
    const totalArtistas = await Artista.count();
    const totalGeneros = await Genero.count(); 

    res.render('index', { 
      totalDiscos, 
      totalArtistas, 
      totalGeneros, 
      discosRecentes: [] 
    });
  } catch (error) {
    console.error(error);
    res.status(500).send('Erro ao carregar a página');
  }
};
