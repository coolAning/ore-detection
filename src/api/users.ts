import { APISchema } from '@/api/type'
import { attachAPI, service } from "@/api/request";

interface TestAPISchema extends APISchema {
    login: {
        request: {
            "account": string,
            "password": string
        },
        response: {
        },
    },
    upload: {
        request: {
            "file": File
        },
        response: {
            "file": string
        },
    },
    add: {
        request: {
            "uuids": string[],
        },
        response: {
        },
    },
    getInfo: {
        request: {
        },
        response: {
            "data": {
                // "guuid": string,
                "num": number,
                "useruuid": string
            }[],
            "guuid": string,
            "txuuid"?: string,
            "next": string,
        }[],
    },
    getConfirm:{
        request: {
        },
        response: {
            "count": number,
            "guuid": string,
            "time": string,
            "txuuid": string,
            "useruuid": string
        }[],
    },
    addTx:{
        request: {
            "guuid": string,
        },
        response: string,
    },
    confirm:{
        request: {
            "txuuid" : string
        },
        response: {
        },
    },
    getConfirmState:{
        request: {
            "txuuid" : string
        },
        response: string[],
    },
    cancel:{
        request: {
            "txuuid" : string
        },
        response: {
        },
    },
}
export const api = attachAPI<TestAPISchema>(service, {
    login: {
        method : 'POST',
        url : '/user/login',
    },
    upload:{
        method : 'POST',
        url : '/main/upload',
    },
    add:{
        method : 'POST',
        url : '/add',
    },
    getInfo:{
        method : 'GET',
        url : '/getInfo',
    },
    getConfirm:{
        method : 'GET',
        url : '/getConfirm',
    },
    addTx:{
        method : 'POST',
        url : '/addTx',
    },
    confirm:{
        method : 'POST',
        url : '/confirm',
    },
    getConfirmState:{
        method : 'POST',
        url : '/getConfirmState',
    },
    cancel:{
        method : 'POST',
        url : '/cancel',
    },
});
export type test = {
    [Key in keyof TestAPISchema] : TestAPISchema[Key]['response']
}
export default api