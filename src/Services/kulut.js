import axios from "axios"

const baseUrl ="http://127.0.0.1:8000/api/kulutus/"

const getAll =() =>{
    const request = axios.get(baseUrl)
    return request.then(response => response.data)
}

const remove = id =>{
    return axios.delete(`${baseUrl}${id}`)
}

const create = uusiKulu =>{
    return axios.post(baseUrl, uusiKulu)
}

const update = (object) => {
    console.log('Päivitettävä data:', object);

    return axios.put(`${baseUrl}${object.id}/`, object)
  }
  



export default{getAll ,remove, create, update}
