import axios from 'axios'


const baseUrl = "http://localhost:3001/persons"

const getAll = () => {
    return axios
            .get(baseUrl)
            .then(res => res.data)
}

const create = (newObj) => {
    return axios
            .post(baseUrl, newObj)
            .then(res => res.data)
}

const update = (id, updatedObj) => {
    return axios
            .put(`${baseUrl}/${id}`, updatedObj)
            .then(res => res.data)
}

const deleteItem = (id) => {
    return axios
            .delete(`${baseUrl}/${id}`)
            .then(res => res.data)
}

const services = {getAll, create, update, deleteItem}

export default services;