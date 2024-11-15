import axios, { AxiosError } from "axios"
import QueryString from "qs"

import { PaginationResponse } from "@/types/common"
import { ApiParameters } from "@/types/strapi"
import { API_ENDPOINT } from "@/config/env"

export interface ResponseType<Data = unknown> {
  data: Data
  meta: PaginationResponse
  message?: string
  errorCode?: string | number
  description?: string
}

export function queryBuilder(params: ApiParameters) {
  return QueryString.stringify(params, { arrayFormat: "brackets" })
}

export const axiosClient = axios.create({
  baseURL: API_ENDPOINT,
  headers: {
    "Content-Type": "application/json",
  },
})

axiosClient.interceptors.request.use(
  async (request) => {
    if (request?.headers?.basic) {
      return request
    }
    return request
  },
  function rej(error) {
    return Promise.reject(error)
  }
)

axiosClient.interceptors.response.use(
  (response) => {
    return response
  },
  async (error: AxiosError) => {
    const originalRequest = error.config

    if (
      originalRequest &&
      error.response &&
      (error.response.status === 401 || error.response.status === 403)
    ) {
    }

    if (error.response) {
      return Promise.reject(error.response)
    }
    if (error.request) {
      return Promise.reject(error.request)
    }
    return Promise.reject(error.message)
  }
)
