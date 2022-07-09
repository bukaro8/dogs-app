
const instance = require('./includes/axios')
const { Dogs, Temperaments } = require('../db')

exports.getDogsByName = async (req,res) => {
    const { name } = req.query
    const dbDog = await Dogs.findOne({
        where: {name: name},
        include: [Temperaments]
    })
    if(dbDog){
        const dog = [{
            dog_id: dbDog.dog_id,
            name: dbDog.name,
            height: dbDog.height,
            weight: dbDog.weight,
            temperament: dbDog.temperaments.map(t => t.name).join(", "),
            life_span: dbDog.life_span
        }]
        return res.json(dog)
    } else {
        const { data } = await instance.get(`/breeds/search?q=${name}`)
        .catch(error => res.status(500).json(error))
        const dog = data.map(b => {
            return {
                dog_id: b.id,
                name: b.name,
                height: b.height.metric,
                weight: b.weight.metric,
                temperament: b.temperament,
                life_span: b.life_span
            }
        })
        if (dog.length) return res.json(dog)
    }
    return res.status(404).json({error: "The Dog doesn't exist"})
}