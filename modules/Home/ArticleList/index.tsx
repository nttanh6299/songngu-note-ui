import { ArticleItem } from "@/modules/Home/ArticleItem"

import { Article } from "@/types/article"
import { Skeleton } from "@/components/ui/Skeleton"

interface ArticleListProps {
  articles: Article[]
  isLoading: boolean
}

const skeletons = Array.from({ length: 4 }).map((_, index) => index)

export const ArticleList = ({ articles, isLoading }: ArticleListProps) => {
  return (
    <div className="flex flex-col space-y-4 md:space-y-6 divide-y divide-border">
      {isLoading
        ? skeletons.map((index) => (
            <div
              key={index}
              className="flex space-x-4 justify-between pt-4 md:pt-6"
            >
              <div className="flex flex-col space-y-1.5 pt-0.5">
                <Skeleton className="w-[200px] md:w-[300px] h-7" />
                <Skeleton className="w-[100px] h-4" />
              </div>
              <div className="flex">
                <div className="relative w-[100px] sm:w-[120px] md:w-[160px] pt-[62.5%]">
                  <Skeleton className="absolute inset-0 rounded-lg" />
                </div>
              </div>
            </div>
          ))
        : articles?.map((article) => (
            <ArticleItem key={article.id} article={article} />
          ))}
    </div>
  )
}
