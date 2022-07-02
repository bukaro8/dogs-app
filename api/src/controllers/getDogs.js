
const instance = require('./includes/axios')
const { Dogs, Temperaments } = require('../db')

exports.getDogs = async (req,res) => {
    const { data } = await instance.get('/breeds')
    .catch(error => res.status(400).json(error))
    // const dogs = await Dogs.findAll({ include: Temperaments }).catch(error => console.log(error))
    // if (dogs){
    //     console.log(JSON.stringify(dogs))
    // }
    const breeds = data.map(b => {
        return {
            dog_id: b.id,
            name: b.name,
            height: b.height.metric,
            weight: b.weight.metric,
            img: b.image.url,
            temperament: b.temperament,
            life_span: b.life_span
        }
    })
    return res.json(breeds)
}