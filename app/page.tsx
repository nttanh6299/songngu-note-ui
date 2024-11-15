"use client"

import { ArticleList } from "@/modules/Home/ArticleList"
import { SearchArticle } from "@/modules/Home/SearchArticle"

import { cn } from "@/lib/utils"
import useArticleList from "@/hooks/useArticleList"
import { useDocumentScroll } from "@/hooks/useScroll"

// const tabs: TabOption[] = [
//   { value: "latest", label: "Latest", component: <div>1</div> },
//   { value: "top", label: "Top", component: <div>2</div> },
// ]

export default function IndexPage() {
  // const [activeTab, setActiveTab] = useState(tabs[0].value)
  const {
    articleList,
    isFetchingArticleList,
    canLoadMoreArticleList,
    isLoadingMoreArticleList,
    getNextArticleList,
  } = useArticleList({
    enabled: true,
    params: {
      pagination: {
        page: 0,
        pageSize: 10,
      },
      sort: ["publishedAt:desc"],
      populate: ["author", "thumbnail"],
    },
  })

  useDocumentScroll({
    isLoading: isFetchingArticleList || isLoadingMoreArticleList,
    canScroll: canLoadMoreArticleList,
    delay: 200,
    offset: 50,
    callback: getNextArticleList,
  })

  return (
    <section className="max-w-3xl container px-4 sm:px-6 md:px-8 grid items-center pt-2 sm:pt-4 md:py-6 pb-3 sm:pb-6 md:pb-10">
      <div className="flex flex-col">
        <div className="flex justify-between items-center border-b border-border pb-1">
          <div />
          {/* <Tabs defaultValue={activeTab} className="invisible w-[220px]">
            <TabsList className="w-full grid grid-cols-2">
              {tabs.map((tab) => (
                <TabsTrigger
                  key={tab.value}
                  value={tab.value}
                  onClick={() => setActiveTab(tab.value)}
                >
                  {tab.label}
                </TabsTrigger>
              ))}
            </TabsList>
          </Tabs> */}

          <SearchArticle />
        </div>

        <ArticleList isLoading={isFetchingArticleList} articles={articleList} />

        <div
          className={cn(
            "text-xs text-slate-500 text-center pt-4 md:pt-6 opacity-0 transition-opacity",
            {
              "opacity-100": isLoadingMoreArticleList,
            }
          )}
        >
          Loading...
        </div>
      </div>
    </section>
  )
}
