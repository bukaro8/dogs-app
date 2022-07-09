
const instance = require('./includes/axios')
const { Dogs, Temperaments } = require('../db')

exports.getDogs = async (req,res) => {
    const { data } = await instance.get('/breeds')
    .catch(error => res.status(400).json(error))
    let breeds = data.map((b,idx) => {
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
    const dogs = await Dogs.findAll({ include: [Temperaments] }).catch(error => console.log(error))
    if (dogs){
        dogs.forEach(dog => {
            breeds.push({
                dog_id:dog.dog_id,
                name:dog.name,
                height:dog.height,
                weight:dog.weight,
                life_span:dog.life_span,
                temperament:dog.temperaments.map(t => t.name).join(", ")
            })
        });
    }
    return res.json(breeds)
}