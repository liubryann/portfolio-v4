import axios from 'axios';

const NASA_URL = 'https://liubryan.com/'
const LOCAL_URL = "http://localhost:3000/"

/**
 * Default client settings for accessing nasa api
 */
const client = axios.create({
  baseURL: LOCAL_URL
})

export default client;