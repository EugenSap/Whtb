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

const _getGroups = () => {
    return instance.get(`/api/group?guid=00000000-0000-0000-0000-000000000000`).then(response => response.data);
}

const _getGroup = (userId : string, groupId : string) => {
    return instance.get(`/api/group/GetGroupById?userId=${userId}&groupId=${groupId}`).then(response => response.data);
}

export const API = {
    getUsers: _getUsers,
    getGroups: _getGroups,
    getGroup: _getGroup
}