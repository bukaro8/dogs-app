
const instance = require('./includes/axios')

exports.getDogsById = async (req,res) => {
    const { id } = req.params
    const { data } = await instance.get('/breeds')
    .catch(error => res.status(400).json(error))
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