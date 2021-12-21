import axios from "axios";

const instance = axios.create(
    {
        headers: {
        }
    }
)

const _getUsers = () => {
    return instance.get(`/api/user`).then(response => response.data);
}

export const API = {
    getUsers: _getUsers,
}