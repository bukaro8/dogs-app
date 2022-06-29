const { Router } = require('express');
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');
const { getDogs, getDogsByName, getDogsById } = require('../controllers/index')


const router = Router();

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);
router.get('/dogs',(req,res) => {
    if (req.query.name){
        return getDogsByName(req,res)
    }
    return getDogs(req,res)
})

router.get('/dogs/:id',getDogsById)

module.exports = router;
