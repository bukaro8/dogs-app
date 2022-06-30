const axios = require('axios')
require('dotenv').config();
const instance = axios.create({
    baseURL: 'https://api.thedogapi.com/v1',
    timeout: 1500
});
instance.defaults.headers.common['x-api-key'] = process.env.API_KEY;
module.exports = instance