
const instance = require('./includes/axios')
const { Dogs, Temperaments } = require('../db')

exports.getDogs = async (req,res) => {
    const { pagina, pesoRaza } = req.query
    const { data } = await instance.get('/breeds')
    .catch(error => res.status(400).json(error))
    let breeds = data.map((b,idx) => {
        return {
            dog_id: b.id,
            name: b.name,
            height: b.height.metric,
            max_height: Number(b.height.metric.split(" - ").pop()),
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
                max_height: Number(b.height.metric.split(" - ").pop()),
                weight:dog.weight,
                life_span:dog.life_span,
                temperament:dog.temperaments.map(t => t.name).join(", ")
            })
        });
    }
    if (pagina) {
        const nBreedsPerPage = 8
        const offset = pagina * nBreedsPerPage;
        const limit = offset + nBreedsPerPage;
        if (pesoRaza === 'abc_asc') {
            return res.status(200).send(breeds.sort((a,b) => a.name.localeCompare(b.name)).slice(offset, limit));
        } else if (pesoRaza === 'abc_desc') {
            return res.status(200).send(breeds.sort((a,b) => b.name.localeCompare(a.name)).slice(offset, limit));
        } else if (pesoRaza === 'peso_asc') {
            return res.status(200).send(breeds.sort((a,b) => a.max_height - b.max_height).slice(offset, limit));
        } else if (pesoRaza === 'peso_desc') {
            return res.status(200).send(breeds.sort((a,b) => b.max_height - a.max_height).slice(offset, limit));
        }
        return res.status(200).json(breeds.slice(offset, limit));
    }
    return res.json(breeds)
}