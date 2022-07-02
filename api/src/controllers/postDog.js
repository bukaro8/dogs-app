
// const instance = require('./includes/axios')
const { Dogs, Temperaments } = require('../db')

exports.postDog = async (req,res) => {
    const { name, weight, height, life_span, temperaments } = req.body
    
    const dog = await Dogs.create({
        name: name,
        weight: weight,
        height: height,
        life_span: life_span,
        temperaments: temperaments.map(t => {
            return  { name: t}
        })
    }, {include: Temperaments}).catch(error => res.status(500).json(error))
    // dog.setTemperaments(temperaments)
    return res.json(dog)
}