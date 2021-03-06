import axios from "axios";
import { IPurchaseType } from "../models/interfaces";

const config = {
    headers: {'Content-Type': 'application/json'}
}

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

const _addFriend = (id: string) => {
    let token = sessionStorage.getItem('tokenKey');
    return instance(token).post(`/api/User/AddFriend?friendId=${id}`).then(response => response.data);
}
const _getGroups = () => {
    let token = sessionStorage.getItem('tokenKey')
    return instance(token).get(`/api/group`).then(response => response.data);
}

const _createGroup = (groupName: string, date: Date) => {
    let token = sessionStorage.getItem('tokenKey')
    return instance(token).post(`/api/group/CreateGroup?groupName=${groupName}&date=${date}`).then(response => response.data);
}

const _getGroup = (groupId : string) => {
    let token = sessionStorage.getItem('tokenKey')
    return instance(token).get(`/api/group/GetGroupById?groupId=${groupId}`).then(response =>
    {
        return response.data}
    );
}

const _addPurchase = (purchaseName: string, purchaseCost: number, groupId: string) => {
    let token = sessionStorage.getItem('tokenKey')
        return instance(token).post(`/api/group/AddPurchase?purchaseName=${purchaseName}&purchaseCost=${purchaseCost}&groupId=${groupId}`)
            .then(response => response.data);
}

const _addUserToGroup = (userId: string, groupId: string) => {
    let token = sessionStorage.getItem('tokenKey')
        return instance(token).post(`/api/group/AddUserToGroup?userId=${userId}&groupId=${groupId}`)
            .then(response => response.data);
}

const _assignPurchase = (groupId: string, userId: string, purchaseId: string) => {
    console.log(`/api/group/AssignPurchase?groupId=${groupId}&userId=${userId}&purchaseId=${purchaseId}`);
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

const _requestUserInfo = (id: string) => {
    let token = sessionStorage.getItem('tokenKey')
    return instance(token).get(`/api/User/GetUserInfo?userId=${id}`).then(response => response.data);
}

const register = (login: string, nick: string, password: string) => {
    let token = sessionStorage.getItem('tokenKey')
    return instance(token).post(`/api/Auth/Register?username=${login}&nick=${nick}&password=${password}`).then(response => response.data);
}

const _getPurchase = (purchaseId : string) => {
    let token = sessionStorage.getItem('tokenKey')
    return instance(token).get(`/api/purchase?guid=${purchaseId}`).then(response =>
    {
        return response.data
    }
    );
}

const _postPurchase = (purchase: IPurchaseType) => {
    let token = sessionStorage.getItem('tokenKey')
    return instance(token).post(`/api/purchase`, purchase, config).then(response => response.data);
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
    setGroupDate: _setGroupDate,
    addFriend: _addFriend,
    requestUserInfo: _requestUserInfo,
    getPurchase: _getPurchase,
    postPurchase: _postPurchase,
    addUserToGroup: _addUserToGroup
}