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
    return instance.get(`/api/group/GetGroupById?userId=${userId}&groupId=${groupId}`).then(response =>
    {
        return response.data}
    );
}

const _addPurchase = (purchaseName: string, purchaseCost: number, groupId: string, userId: string) => {
        return instance.post(`/api/group/AddPurchase?purchaseName=${purchaseName}&purchaseCost=${purchaseCost}&groupId=${groupId}&userId=${userId}`)
            .then(response => response.data);
}

const _assignPurchase = (groupId: string, userId: string, purchaseId: string) => {
    return instance.post(`/api/group/AssignPurchase?groupId=${groupId}&userId=${userId}&purchaseId=${purchaseId}`)
        .then(response => response.data);
}

export const API = {
    getUsers: _getUsers,
    getGroups: _getGroups,
    getGroup: _getGroup,
    addPurchase: _addPurchase,
    assignPurchase: _assignPurchase
}