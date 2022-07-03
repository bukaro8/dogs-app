const URL = "https://api.thedogapi.com/v1/breeds";
const axios = require("axios");

exports.getDogs = async (req, res) => {
    const { name } = req.query;

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
            weight: b.weight.metric,
            img: b.image.url,
            temperament: b.temperament,
            life_span: b.life_span,
        };
    });

    return res.status(200).send(breeds);
};
