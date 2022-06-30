
const instance = require('./includes/axios')

exports.getDogsByName = async (req,res) => {
    const { name } = req.query
    const { data } = await instance.get(`/breeds/search?q=${name}`)
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
}