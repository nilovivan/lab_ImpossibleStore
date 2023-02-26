import {makeAutoObservable} from "mobx";

export default class DeviceStore {
    constructor() {
        //TODO: сделать пустой массив и подгружаться будет с сервера
        this._types = [
            {id: 1, name: "Холодильники"},
            {id: 2, name: "Смартфоны"},
            {id: 3, name: "Ноутбуки"},
            {id: 4, name: "Колонки"},
        ]
        this._devices = [
            //TODO: сделать пустой массив и подгружаться будет с сервера
            {id: 1, name: "тык", price: 25000},
            {id: 2, name: "пук", price: 25000},
            {id: 3, name: "пак", price: 25000},
            {id: 4, name: "кек", price: 25000},
            {id: 5, name: "лол", price: 25000},
            {id: 6, name: "буба", price: 25000},
        ]
        this._selectedType = {}
        this._page = 1
        this._totalCount = 0
        this._limit = 3
        makeAutoObservable(this)
    }

    setTypes(types) {
        this._types = types
    }
    
    setDevices(devices) {
        this._devices = devices
    }

    setSelectedType(type) {
        this.setPage(1)
        this._selectedType = type
    }

    setPage(page) {
        this._page = page
    }

    setTotalCount(count) {
        this._totalCount = count
    }

    get types() {
        return this._types
    }

    get devices() {
        return this._devices
    }

    get selectedType() {
        return this._selectedType
    }

    get totalCount() {
        return this._totalCount
    }

    get limit() {
        return this._limit
    }
}