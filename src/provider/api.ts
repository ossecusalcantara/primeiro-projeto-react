import axios, { AxiosInstance, AxiosResponse } from "axios";

export interface IDataRequest {
    url: string;
    data?: object;
    headers?: object;

}

export interface IDataResponse<T = any> {
    data: T;
    statusCode: number;
    message: string;
}

export interface IHttpClient<T = any> {
    api: T;

    get(data: IDataRequest): Promise<IDataResponse<T>>;
}

class Api implements IHttpClient<AxiosInstance> {
    api: AxiosInstance;

    constructor(baseUrl: string) {
        this.api = axios.create({
            baseURL: baseUrl,
        });
    }

    async get(data: IDataRequest): Promise<IDataResponse> {
        try {
            let resp: AxiosResponse = await this.api.get(data.url, {
                headers: data.headers
            });

            if(resp.status == 200) {
                return {
                    data: resp.data,
                    message: "ok",
                    statusCode: resp.status
                }
            } else {
                return {
                    data: null,
                    message: "",
                    statusCode: resp.status
                }
            }
        } catch (e) {
            return {
                data: null,
                message: "Error",
                statusCode: 500
            }
        }
    }
}

const api = new Api("http://localhost:8080");

export default api;