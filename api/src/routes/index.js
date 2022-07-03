const { Router } = require("express");
const { getDogs } = require("../controllers/getDogs");
const { getDogById } = require("../controllers/getDogById");
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');

const router = Router();

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);

router.get("/dogs", getDogs);
router.get("/dogs/:id", getDogById);

module.exports = router;
