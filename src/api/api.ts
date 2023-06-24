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
    }
}
export const api = attachAPI<TestAPISchema>(service, {
    login: {
        method : 'POST',
        url : '/user/login',
    },
    upload:{
        method : 'POST',
        url : '/main/upload',
    }
});
export type test = {
    [Key in keyof TestAPISchema] : TestAPISchema[Key]['response']
}
export default api