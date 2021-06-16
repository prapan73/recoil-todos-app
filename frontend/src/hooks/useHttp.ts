import axios, { AxiosRequestConfig } from "axios";

const api = "http://localhost:3001/todos";

export function Post<T>(params: T, config: AxiosRequestConfig): Promise<void> {
  return axios.post(api, params, config);
}

export function Patch<T>(
  id: string,
  params: T,
  config: AxiosRequestConfig
): Promise<void> {
  return axios.patch(`${api}/${id}`, params, config);
}

export function Delete(id: string, config: AxiosRequestConfig): Promise<void> {
  return axios.delete(`${api}/${id}`, config);
}
