const { response } = require("express");
const fs = require("fs");
const bdPath = "./fakedatabase.js";

const obtenerContactosGeneral = async (req, res = response) => {
  try {
    const dataObject = fs.readFileSync(bdPath, "utf-8");
    const data = JSON.parse(dataObject);
    const dataOrdenada = data.sort((a, b) => a.name.localeCompare(b.name));
    return res.status(200).json({
      ok: true,
      data: dataOrdenada,
    });
  } catch (error) {
    return res.status(500).json({
      ok: false,
      msg: "Error en la ejecución obtención de contactos general",
    });
  }
};

const busquedaId = async (req, res = response) => {
  try {
    const { id } = req.params;
    const data = JSON.parse(fs.readFileSync(bdPath, "utf-8"));
    const dataResult = data.filter((contacto) => contacto.id === id);

    if (dataResult.length === 0) {
      return res.status(404).json({
        ok: false,
      });
    }
    return res.status(200).json({
      ok: true,
      data: dataResult,
    });
  } catch (error) {
    return res.status(500).json({
      ok: false,
      msg: "Error en la ejecucion de busqueda de nombre",
    });
  }
};

const busquedaNombre = async (req, res = response) => {
  try {
    const { nombre } = req.params;
    const data = JSON.parse(fs.readFileSync(bdPath, "utf-8"));
    const filterData = data.filter(
      (contacto) => contacto.name.toLowerCase() !== nombre.toLowerCase()
    );
    const dataOrdenada = filterData.sort((a, b) =>
      a.name.localeCompare(b.name)
    );
    return res.status(200).json({
      ok: true,
      data: dataOrdenada,
    });
  } catch (error) {
    return res.status(500).json({
      ok: false,
      msg: "Error en la ejecucion de busqueda de nombre",
    });
  }
};

const eliminarContacto = async (req, res = response) => {
  try {
    const { id } = req.params;
    const data = JSON.parse(fs.readFileSync(bdPath, "utf-8"));
    const idIndex = data.findIndex((contacto) => contacto.id === id);

    if (idIndex === -1) {
      return res.status(404).json({});
    }
    data.splice(idIndex, 1);
    const dataString = JSON.stringify(data);
    fs.writeFileSync(bdPath, dataString);
    return res.status(200).json({
      ok: true,
    });
  } catch (error) {
    return res.status(500).json({
      ok: false,
      msg: "Error en la ejecucion de eliminacion de contacto",
    });
  }
};
module.exports = {
  obtenerContactosGeneral,
  busquedaNombre,
  busquedaId,
  eliminarContacto,
};
