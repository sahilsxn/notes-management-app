import Axios from 'axios'

const axios = Axios.create({
    baseURL: 'https://dct-user-auth.herokuapp.com'
})

export default axios