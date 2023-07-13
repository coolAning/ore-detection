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
        request: FormData
        response: {
            "file": string
        },
    },
    changePassword: {
        request: {
            "account": string,
            "old_password": string,
            "new_password": string,
        },
        response: {
        },
    },
    getCamera: {
        request: {
        },
        response: {
            "interval": number,
            "rtsp": string,
        }
    },
    setCamera: {
        request: {
            "rtsp": string,
            "interval": number
        },
        response: {
        },
    },
}
export const api = attachAPI<TestAPISchema>(service, {
    login: {
        method: 'POST',
        url: '/user/login',
    },
    upload: {
        method: 'POST',
        url: '/main/upload',
    },
    changePassword: {
        method: 'POST',
        url: '/user/changePassword',
    },
    getCamera: {
        method: 'GET',
        url: '/main/getCamera',
    },
    setCamera: {
        method: 'POST',
        url: '/main/setCamera',
    },

});
export type test = {
    [Key in keyof TestAPISchema]: TestAPISchema[Key]['response']
}
export default api