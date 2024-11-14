const express = require("express");
const { sequelize } = require("./models");
const discoRoutes = require("./routes/discoRoutes");
const artistaRoutes = require("./routes/artistaRoutes");
const faixaRoutes = require("./routes/faixaRoutes");
const generoRoutes = require("./routes/generoRoutes");
const homeRoutes = require("./routes/homeRoutes");
const path = require("path");
const PORT = process.env.PORT || 3001;
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

app.use(express.static(path.join(__dirname, 'public')));
app.use("/faixas", faixaRoutes);
app.use("/discos", discoRoutes);
app.use("/artistas", artistaRoutes);
app.use("/generos", generoRoutes);
app.use("/", homeRoutes);

sequelize
  .sync()
  .then(() => {
    app.listen(PORT, () =>
      console.log(`Server is running on http://localhost:${PORT}`)
    );
  })
  .catch((error) => {
    console.error("Erro ao sincronizar com o banco de dados", error);
  });
