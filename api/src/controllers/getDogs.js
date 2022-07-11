const URL = "https://api.thedogapi.com/v1/breeds";
const axios = require("axios");

exports.getDogs = async (req, res) => {
    const { name, pagina, pesoRaza } = req.query;

    if (name) {
        const { data } = await axios
            .get(`${URL}/search?q=${name}`, {
                headers: { "x-api-key": process.env.API_KEY },
            })
            .catch((error) => res.status(400).json(error));

        const dog = data.map((b) => {
            return {
                dog_id: b.id,
                name: b.name,
                height: b.height.metric,
                weight: b.weight.metric,
                // img: b.image.url,
                temperament: b.temperament,
                life_span: b.life_span,
            };
        });

        return res.status(200).send(dog);
    }

    const { data } = await axios
        .get(`${URL}`, {
            headers: { "x-api-key": process.env.API_KEY },
        })
        .catch((error) => res.status(400).json(error));

    const breeds = data.map((b) => {
        return {
            dog_id: b.id,
            name: b.name,
            height: b.height.metric,
            max_height: Number(b.height.metric.split(" - ").pop()),
            weight: b.weight.metric,
            img: b.image.url,
            temperament: b.temperament,
            life_span: b.life_span,
        };
    });

    if (pagina) {
        const offset = pagina * 8;
        const limit = offset + 8;
        if (pesoRaza === 'abc_asc') {
            return res.status(200).send(breeds.sort((a,b) => a.name.localeCompare(b.name)).slice(offset, limit));
            // items.sort((a, b) => a.value - b.value);
        } else if (pesoRaza === 'abc_desc') {
            return res.status(200).send(breeds.sort((a,b) => b.name.localeCompare(a.name)).slice(offset, limit));
        } else if (pesoRaza === 'peso_asc') {
            return res.status(200).send(breeds.sort((a,b) => a.max_height - b.max_height).slice(offset, limit));
        } else if (pesoRaza === 'peso_desc') {
            return res.status(200).send(breeds.sort((a,b) => b.max_height - a.max_height).slice(offset, limit));
        }
        return res.status(200).send(breeds.slice(offset, limit));
    }
    return res.status(200).send(breeds);
};
