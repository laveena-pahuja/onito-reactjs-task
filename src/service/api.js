import axios from 'axios';

const url = "http://localhost:3002/profile/";

export const getallUsers = async (id) => {
    id = id || '';
    return await axios.get(`${url}/${id}`);
}

export const addUser = async (user) => {
    return await axios.post(url,user);
}