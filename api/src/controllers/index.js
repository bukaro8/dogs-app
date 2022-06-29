const axios = require('axios')

module.exports = {
    getDogs: async (req,res) => {
        const { data } = await axios.get(
            `https://api.thedogapi.com/v1/breeds`,{
            headers: {'x-api-key': process.env.API_KEY}
        })
        .catch(error => res.status(400).json(error))
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
    },
    getDogsByName: async (req,res) => {
        const { name } = req.query
        const { data } = await axios.get(
            `https://api.thedogapi.com/v1/breeds/search?q=${name}`,{
            headers: {'x-api-key': process.env.API_KEY}
        })
        .catch(error => res.status(400).json(error))
        const dog = data.map(b => {
            return {
                dog_id: b.id,
                name: b.name,
                height: b.height.metric,
                weight: b.weight.metric,
                // img: b.image.url,
                temperament: b.temperament,
                life_span: b.life_span
            }
        })
        return res.json(dog)
    },
    getDogsById: async (req,res) => {
        const { id } = req.params
        const { data } = await axios.get(
            `https://api.thedogapi.com/v1/breeds`,{
            headers: {'x-api-key': process.env.API_KEY}
        }).catch(error => res.status(400).json(error))
        const dogFound = data.find(dog => dog.id === parseInt(id))
        if (!dogFound) return res.status(404).json({error: "The Dog doesn't exist"})
        const dog = {
            dog_id: dogFound.id,
            name: dogFound.name,
            height: dogFound.height.metric,
            weight: dogFound.weight.metric,
            // img: b.image.url,
            temperament: dogFound.temperament,
            life_span: dogFound.life_span
        }
        return res.json(dog)
    }
}
