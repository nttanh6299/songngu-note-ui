import { Article } from "@/types/article"
import { ApiParameters } from "@/types/strapi"
import { ResponseType, axiosClient, queryBuilder } from "@/lib/axios"

export const getArticleList = async (
  params: ApiParameters
): Promise<ResponseType<Article[]>> => {
  const { data } = await axiosClient.get<ResponseType<Article[]>>(
    `/articles?${queryBuilder(params)}`
  )
  return data
}

export const getArticle = async (
  slug: string
): Promise<ResponseType<Article>> => {
  const { data } = await axiosClient.get<ResponseType<Article>>(
    `/articles/slug/${slug}`
  )
  return data
}

export const getArticleMetadata = async (
  slug: string
): Promise<ResponseType<Article["seo"]>> => {
  const { data } = await axiosClient.get<ResponseType<Article["seo"]>>(
    `/articles/seo/${slug}`
  )
  return data
}
