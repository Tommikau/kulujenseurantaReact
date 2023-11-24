import axios from "axios"

const baseUrl ="http://127.0.0.1:8000/api/kulutus/"

let token=null


const setToken = newToken =>{
    token=`Token ${newToken}`

}

const headers = { Authorization: `Token ${token}` };


const getAll =() =>{
    const config ={
        headers:{Authorization: token},
    }
    const request = axios.get(baseUrl,config)
    return request.then(response => response.data)
}

const remove = id => {
    const config ={
        headers:{Authorization: token},
    }
    return axios.delete(`${baseUrl}${id}`,config)
}

const create = uusikulu =>{
    const config ={
        headers:{Authorization: token},
    }
    console.log('Käytettävä token: '+ token);
    return axios.post(baseUrl, uusikulu,config)
}      

const update =(object) => {
    const config ={
        headers:{Authorization: token},
    }
    return axios.put(`${baseUrl}${object.id}/`, object,config)
}


export default{getAll ,remove, create, update, setToken}
