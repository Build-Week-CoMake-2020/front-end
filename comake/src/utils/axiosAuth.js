import axios from 'axios'

const AxiosAuth = () => {
    const token = window.localStorage.getItem('token')

    return axios.create({
        baseURL: 'https://peaceful-everglades-45828.herokuapp.com/api/users/:id',
        headers: {
            Authorization: token
        }
    })
}
export default AxiosAuth;