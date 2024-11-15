"use client"

import { useState } from "react"
import NextImage from "next/image"
import Link from "next/link"
import { paths } from "@/constants/paths"
import dayjs from "dayjs"

import { getStaticUrl } from "@/lib/strapi"
import { cn } from "@/lib/utils"
import useArticleList from "@/hooks/useArticleList"
import { useElementScroll } from "@/hooks/useScroll"
import { Button } from "@/components/ui/Button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/Dialog"
import { SearchInput } from "@/components/ui/SearchInput"
import { Icons } from "@/components/icons"

export const SearchArticle = () => {
  const [isOpen, setOpen] = useState(false)
  const [keyword, setKeyword] = useState("")
  const {
    articleList,
    isFetchingArticleList,
    canLoadMoreArticleList,
    isLoadingMoreArticleList,
    getNextArticleList,
  } = useArticleList({
    enabled: isOpen,
    params: {
      filters: {
        title: {
          $containsi: keyword,
        },
      },
      pagination: {
        page: 0,
        pageSize: 10,
      },
      sort: ["publishedAt:desc"],
      populate: ["author", "thumbnail"],
    },
  })
  const isEmptyList =
    !isFetchingArticleList && !canLoadMoreArticleList && !articleList?.length

  const { handleScroll } = useElementScroll({
    isLoading: isFetchingArticleList || isLoadingMoreArticleList,
    offset: [-100, 100],
    canScroll: canLoadMoreArticleList,
    delay: 200,
    callback: getNextArticleList,
  })

  const handleToggle = (value: boolean) => {
    setKeyword("")
    setOpen(value)
  }

  return (
    <Dialog open={isOpen} onOpenChange={handleToggle}>
      <DialogTrigger asChild>
        <Button size="icon" variant="ghost" className="focus-visible:ring-0">
          <Icons.search className="scale-75" strokeWidth={1.5} />
        </Button>
      </DialogTrigger>
      <DialogContent
        hideCloseButton
        className="p-0 h-[60vh] overflow-y-auto"
        onScroll={handleScroll}
      >
        <DialogHeader>
          <DialogTitle asChild>
            <div className="sticky top-0 z-[1] border-b border-border bg-background">
              <div className="flex items-center rounded-lg overflow-hidden pt-1">
                <SearchInput
                  wrapperClassName="border-none"
                  placeholder="Search and enter"
                  defaultValue={keyword}
                  onChange={setKeyword}
                />
                <div
                  className="lg:hidden text-sm pr-3 cursor-pointer select-none"
                  onClick={() => handleToggle(false)}
                >
                  Cancel
                </div>
              </div>
            </div>
          </DialogTitle>
          <DialogDescription className="flex-1 flex flex-col p-2 pt-1">
            <div className="flex-1 flex flex-col">
              {articleList?.map((article) => (
                <Link
                  key={article.documentId}
                  href={paths.article.url(article.slug).toString()}
                >
                  <div className="flex p-1.5 rounded-lg cursor-pointer hover:bg-slate-100">
                    <div className="flex space-x-2 items-center">
                      <div className="shrink-0">
                        <div className="relative w-14 pt-[62.5%] rounded-lg">
                          <NextImage
                            src={getStaticUrl(
                              article?.thumbnail?.formats?.thumbnail?.url
                            )}
                            alt=""
                            fill
                            unoptimized
                            className="object-cover rounded-lg"
                          />
                        </div>
                      </div>
                      <div className="flex-1 flex flex-col space-y-0.5 text-left">
                        <p className="text-foreground text-sm font-medium line-clamp-1">
                          {article.title}
                        </p>
                        <span className="text-slate-500 text-xs">
                          {dayjs(article.createdAt).format("MMM DD")}
                        </span>
                      </div>
                    </div>
                  </div>
                </Link>
              ))}
              {isEmptyList && (
                <div className="flex-1 flex flex-col justify-center items-center">
                  <p className="text-sm font-medium">
                    No results for {keyword}
                  </p>
                </div>
              )}
            </div>
            <div
              className={cn(
                "text-xs text-slate-500 text-center pt-2 md:pt-4 opacity-0 transition-opacity",
                {
                  "opacity-100":
                    !canLoadMoreArticleList || isLoadingMoreArticleList,
                }
              )}
            >
              {canLoadMoreArticleList ? "Loading..." : "No more found"}
            </div>
          </DialogDescription>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  )
}
