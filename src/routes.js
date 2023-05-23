const express = require("express")
const router = express.Router()
const listaController = require("./controllers/listaController")

router.post("/lista", listaController.adicionaItem)
router.delete("/lista/:id", listaController.retiraItem)
router.patch("/lista/:id", listaController.modificarItem)
router.get("/lista/:id", listaController.verItem)
router.get("/lista", listaController.verTudo)

module.exports = router