import { QueryKey } from "@/constants/react-query"
import { getArticleList as getArticleListAPI } from "@/services/article"
import { useInfiniteQuery } from "@tanstack/react-query"
import flatten from "lodash/flatten"

import { ApiParameters } from "@/types/strapi"

interface UseArticleListProps {
  enabled: boolean
  params: ApiParameters
}

const useArticleList = ({ enabled, params }: UseArticleListProps) => {
  const {
    data,
    isPending,
    isFetchingNextPage: isLoadingMoreArticleList,
    hasNextPage: canLoadMoreArticleList,
    refetch: getArticleList,
    fetchNextPage: getNextArticleList,
  } = useInfiniteQuery({
    enabled,
    initialPageParam: params.pagination?.page ?? 0,
    refetchOnMount: true,
    refetchOnWindowFocus: false,
    queryKey: [QueryKey.ArticleList, params],
    queryFn: ({ pageParam = 0 }) =>
      getArticleListAPI({
        ...params,
        pagination: {
          page: pageParam,
          pageSize: params.pagination?.pageSize ?? 10,
        },
      }),
    getNextPageParam: (lastPage) =>
      lastPage.data?.length ? lastPage.meta.pagination.page + 1 : undefined,
  })
  const articleList = flatten(data?.pages?.map((page) => page?.data ?? []))
  const isFetchingArticleList = isPending

  return {
    articleList,
    isFetchingArticleList,
    isLoadingMoreArticleList,
    canLoadMoreArticleList,
    getArticleList,
    getNextArticleList,
  }
}

export default useArticleList
