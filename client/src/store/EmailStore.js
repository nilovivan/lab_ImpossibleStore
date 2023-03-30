import {makeAutoObservable} from "mobx";

export default class EmailStore {
    constructor() {
        this._isEmailAuth = false
        this._pochta = {}
        this._messages = []
        makeAutoObservable(this)
    }

    setMessages(messages) {
        this._messages = messages
    }
    setIsEmailAuth(bool) {
        this._isEmailAuth = bool
    }
    setPochta(pochta) {
        this._pochta = pochta
    }

    get isEmailAuth() {
        return this._isEmailAuth
    }
    get pochta() {
        return this._pochta
    }
    get messages() {
        return this._messages
    }
}
