import axios from 'axios';

const PROD_URL = 'https://www.liubryan.com/'
const LOCAL_URL = "http://localhost:3000/"

const URL = process.env.NODE_ENV === 'production' ? PROD_URL : LOCAL_URL;
/**
 * Default client settings for accessing nasa api
 */
const client = axios.create({
  baseURL: URL
})

export default client;