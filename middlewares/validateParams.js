const { response } = require("express");
const validarCampos = (req, res = response, next) => {
  const valor = Object.values(req.params);
  if (valor[0] === undefined) {
    return res.status(400).json({});
  }
  next();
};

module.exports = {
  validarCampos,
};
