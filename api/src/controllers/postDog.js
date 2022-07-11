
// const instance = require('./includes/axios')
const { Dogs, Temperaments } = require('../db')

exports.postDog = async (req,res) => {
    let { name, weight, height, life_span, temperaments } = req.body

    if (!name || !weight.length || !height.length){
        return res.status(400).json(
            { error: "Attributes 'name', 'weight' and 'height' cannot be empty" }
        )
    }
    name = name.split(" ").map(n => n[0].toUpperCase() + n.slice(1).toLowerCase()).join(" ")
    weight = `${weight[0]} - ${weight[1]}`
    height = `${height[0]} - ${height[1]}`
    let dog = await Dogs.create({
        name,
        weight,
        height,
        life_span,
    }).catch(error => res.status(500).json({error:error.parent.detail}))
    // let instances = []
    if (temperaments.length){
        temperaments.foreach(async temperament => {
            temperament = temperament[0].toUpperCase() + temperament.slice(1).toLowerCase()
            const [t, created] = await Temperaments.findOrCreate({
                where: {name: temperament}
            }).catch(error => res.status(500).json({error:error.parent.detail}))
            // dog.setTemperaments(t) // borra las anteriores
            dog.addTemperaments(t)
        })
    }    
    // const dog = await Dogs.create({ // los temperamentos solo se guardan sin son nuevos
    //     name: name,
    //     weight: weight,
    //     height: height,
    //     life_span: life_span,
    //     temperaments: instances
    //     // .map(t => {
    //     //     return  { name: t}
    //     // })
    // }, {include: Temperaments}).catch(error => res.status(500).json(error))
    return res.status(201).json(dog)
}
