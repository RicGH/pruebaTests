const { Router } = require("express");
const {
  obtenerContactosGeneral,
  busquedaNombre,
  busquedaId,
  eliminarContacto,
} = require("../controllers/contacto");
const { validarCampos } = require("../middlewares/validateParams");
const router = Router();
router.get("/", obtenerContactosGeneral);
router.get("/busquedaNombre/:nombre?", validarCampos, busquedaNombre);
router.get("/obtenerId/:id?", validarCampos, busquedaId);
router.delete("/contactoDelete/:id?", validarCampos, eliminarContacto);

module.exports = router;
