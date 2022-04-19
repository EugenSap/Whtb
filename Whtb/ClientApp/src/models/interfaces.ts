export interface IUserType extends IWithId{
    nick : string,
    sum: number
}

export interface IPurchaseType extends IWithId{
    name : string,
    cost : number
    user : string
}

export interface IGroupType extends IPurchasesArrayType, IWithId{
    groupName : string,
    remainSum : number,
    allSum : number,
    dateTime : string
    groupStatus : number,
    userStatusForGroup : number,
    users : Array<IUserType>,
}

export interface IColumnType extends IPurchasesArrayType, IWithId {
    title: string,
    summ: number,
    purchaseIds: Array<string>
}

export interface IStateType extends IPurchasesArrayType {
    columns: Array<IColumnType>
    columnOrder: Array<string>
}

export interface IPurchasesArrayType {
    purchases: Array<IPurchaseType>
}

export interface IWithId {
    id: string
}

export interface IWithPurchase {
    purchase: IPurchaseType
}

export interface IWithIndex {
    index: number
}

export interface IWithHandleSubmit {
    handleSubmit: (event: React.FormEvent<HTMLFormElement>) => void
}