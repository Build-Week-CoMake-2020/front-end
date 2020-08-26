import axios from 'axios'

const AxiosAuth = () => {
    const token = window.localStorage.getItem('token')

    return axios.create({
        baseURL: 'https://peaceful-everglades-45828.herokuapp.com/api',
        headers: {
            Authorization: token
        }
    })
}
export default AxiosAuth;