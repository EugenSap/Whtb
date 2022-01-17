import axios from "axios";

const instance = (token : string | null) => axios.create(
    {
        headers: {
            Authorization: `Bearer ${token}`
        }
    }
)

const _getUsers = () => {
    let token = sessionStorage.getItem('tokenKey')
    return instance(token).get(`/api/user`).then(response => response.data);
}

const _getGroups = () => {
    let token = sessionStorage.getItem('tokenKey')
    return instance(token).get(`/api/group`).then(response => response.data);
}

const _createGroup = (groupName: string, date: Date) => {
    let token = sessionStorage.getItem('tokenKey')
    return instance(token).post(`/api/group/CreateGroup?groupName=${groupName}&date=${date}`).then(response => response.data);
}

const _getGroup = (userId : string, groupId : string) => {
    let token = sessionStorage.getItem('tokenKey')
    return instance(token).get(`/api/group/GetGroupById?userId=${userId}&groupId=${groupId}`).then(response =>
    {
        return response.data}
    );
}

const _addPurchase = (purchaseName: string, purchaseCost: number, groupId: string, userId: string) => {
    let token = sessionStorage.getItem('tokenKey')
        return instance(token).post(`/api/group/AddPurchase?purchaseName=${purchaseName}&purchaseCost=${purchaseCost}&groupId=${groupId}&userId=${userId}`)
            .then(response => response.data);
}

const _assignPurchase = (groupId: string, userId: string, purchaseId: string) => {
    let token = sessionStorage.getItem('tokenKey')
    return instance(token).post(`/api/group/AssignPurchase?groupId=${groupId}&userId=${userId}&purchaseId=${purchaseId}`)
        .then(response => response.data);
}

const _setGroupDate = (groupId: string, date: Date) => {
    let token = sessionStorage.getItem('tokenKey')
    return instance(token).post(`/api/group/SetGroupDate?groupId=${groupId}&date=${date}`)
        .then(response => response.data);
}

const _login = (login: string, password: string) => {
    let token = sessionStorage.getItem('tokenKey')
    return instance(token).post(`/api/Auth/Login?username=${login}&password=${password}`).then(response => response.data);
}

const register = (login: string, nick: string, password: string) => {
    let token = sessionStorage.getItem('tokenKey')
    return instance(token).post(`/api/Auth/Register?username=${login}&nick=${nick}&password=${password}`).then(response => response.data);
}
export const API = {
    getUsers: _getUsers,
    getGroups: _getGroups,
    createGroup: _createGroup,
    getGroup: _getGroup,
    addPurchase: _addPurchase,
    assignPurchase: _assignPurchase,
    login: _login,
    register: register,
    setGroupDate: _setGroupDate
}