const { Router } = require('express');
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');
// const { getDogs, getDogsByName, getDogsById } = require('../controllers/index')
const { getDogs } = require('../controllers/getDogs')
const { getDogsByName } = require('../controllers/getDogsByName')
const { getDogsById } = require('../controllers/getDogsById')
const { postDog } = require('../controllers/postDog')

const router = Router();

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);
// router.get('/dogs',(req,res) => {
//     if (req.query.name){
//         return getDogsByName(req,res)
//     }
//     return getDogs(req,res)
// })
router.get('/dogs',getDogs)

router.get('/dogs/:id',getDogsById)

router.post('/dogs',(req,res) => postDog(req,res))

module.exports = router;
