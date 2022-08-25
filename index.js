//CONFIGURACIÓN
const express = require("express");
const bodyParser = require("body-parser");
const port = 3000;
const app = express();
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use((req, res, next) => {
  const methodValid = ["GET", "DELETE"];
  if (!methodValid.includes(req.method)) {
    return res.status(404).json({
      ok: false,
    });
  }

  next();
});
//RUTAS
app.use("/contactos", require("./routes/contactos"));
app.use("*", (req, res) => {
  res.status(405).json({});
});

//SERVIDOR
app.listen(port, () => {
  console.log(`Servidor corriendo en el puerto ${port}`);
});
