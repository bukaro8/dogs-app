const URL = "https://api.thedogapi.com/v1/breeds";
const axios = require("axios");

exports.getDogById = async (req, res) => {
    const { id } = req.params;
    const { data } = await axios
        .get(`${URL}`, {
            headers: { "x-api-key": process.env.API_KEY },
        })
        .catch((error) => res.status(400).json(error));

    const dogFound = data.find((dog) => dog.id === parseInt(id));
    if (dogFound === undefined)
        return res.status(404).json({ error: "The Dog doesn't exist" });

    const dog = {
        dog_id: dogFound.id,
        name: dogFound.name,
        height: dogFound.height.metric,
        weight: dogFound.weight.metric,
        img: b.image.url,
        temperament: dogFound.temperament,
        life_span: dogFound.life_span,
    };

    return res.status(200).json(dog);
};
