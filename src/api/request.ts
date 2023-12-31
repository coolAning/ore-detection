
import axios, { AxiosInstance, AxiosRequestHeaders, AxiosError } from 'axios';
import {
    APISchema,
    CreateRequestConfig,
    CreateRequestClient,
    APIurl,
} from './type';

export function attachAPI<T extends APISchema>(
    client: AxiosInstance,
    apis: CreateRequestConfig<T>['apis'],
): CreateRequestClient<T> {
    const hostApi: CreateRequestClient<T> = Object.create(null);
    for (const apiName in apis) {
        const apiConfig = apis[apiName];
        let apiPath = apiConfig as APIurl;

        hostApi[apiName] = (params) => {
            const _params = { ...(params || {}) };
            let url = apiPath.url
            console.log(url)
            return client.request({
                url,
                method: apiPath.method,
                data: params,
            });
        };
    }
    return hostApi;
}
import { ElMessage } from "element-plus";
export const service = axios.create({
    baseURL: "http://localhost:5000", //"http://172.28.66.254:8000" "http://localhost:5000"
    timeout: 10000,
})
export const getBaseUrl = () => {
    return service.defaults.baseURL;
  };
service.interceptors.request.use(config => {
    config.headers.Authorization = localStorage.getItem('token')
    return config
}, error => {
    return Promise.reject(new Error(error))
})

service.interceptors.response.use((response) => {

    const meta = response.data
    if (meta.code === 0) {
        // ElMessage.success(meta.message);
        // response.data = meta.result
        return meta
    } else {
        ElMessage.error(meta.msg)
        return Promise.reject(new Error(meta.message))
    }
}, error => {
    error.response && ElMessage.error(error.response.data)
    return Promise.reject(new Error((error.response.data)))
})

export default service