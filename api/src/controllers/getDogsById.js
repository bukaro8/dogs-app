
const instance = require('./includes/axios')
const { Dogs, Temperaments } = require('../db')

exports.getDogsById = async (req,res) => {
    const { id } = req.params
    let dog;
    if (isNaN(id)){
        const dogFound = await Dogs.findByPk(id, { include: [Temperaments] })
        if(!dogFound) return res.status(404).json({error: "The Dog doesn't exist"})
        dog = {
            dog_id: dogFound.dog_id,
            name: dogFound.name,
            height: dogFound.height,
            weight: dogFound.weight,
            temperament: dogFound.temperaments.map(t => t.name).join(", "),
            life_span: dogFound.life_span
        }
    } else {
        const { data } = await instance.get('/breeds')
        .catch(error => res.status(500).json(error))
        const dogFound = data.find(dog => dog.id === parseInt(id))
        if (!dogFound) return res.status(404).json({error: "The Dog doesn't exist"})
        dog = {
            dog_id: dogFound.id,
            name: dogFound.name,
            height: dogFound.height.metric,
            weight: dogFound.weight.metric,
            temperament: dogFound.temperament,
            life_span: dogFound.life_span
        }
    }
    return res.json(dog)
}