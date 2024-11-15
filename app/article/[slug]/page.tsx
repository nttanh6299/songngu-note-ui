import { Metadata, ResolvingMetadata } from "next"
import Image from "next/image"
import { redirect } from "next/navigation"
import {
  getArticle,
  getArticleList,
  getArticleMetadata,
} from "@/services/article"
import dayjs from "dayjs"

import { type Article } from "@/types/article"
import { getStaticUrl } from "@/lib/strapi"
import { Audio } from "@/components/ui/Audio"

// Next.js will invalidate the cache when a
// request comes in, at most once every 5 hours.
export const revalidate = 18000

// If a request comes in for a path that hasn't been generated,
// Next.js will server-render the page on-demand.
export const dynamicParams = true

export async function generateStaticParams() {
  const { data } = await getArticleList({
    pagination: { page: 0, pageSize: 100 },
    sort: ["publishedAt:desc"],
  })

  if (!data) {
    return []
  }

  return data.map((article) => ({
    slug: String(article.slug),
  }))
}

const fetchData = async (slug: string) => {
  try {
    const { data } = await getArticle(slug)
    return data
  } catch {
    redirect("/404")
  }
}

type Props = {
  params: Promise<{ slug: string }>
}
export async function generateMetadata(
  { params }: Props,
  parent: ResolvingMetadata
): Promise<Metadata> {
  try {
    const slug = (await params).slug
    const { data } = await getArticleMetadata(slug)
    const previousImages = (await parent).openGraph?.images || []

    return {
      title: data.metaTitle,
      description: data.metaDescription,
      keywords: data.keywords?.split(",") ?? [],
      openGraph: {
        images: [getStaticUrl(data.metaImage.url), ...previousImages],
      },
    }
  } catch {
    return {
      title: "Not found",
      description: "Not found",
      openGraph: {
        images: [],
      },
    }
  }
}

export default async function Article({
  params,
}: {
  params: { slug: string }
}) {
  const article = await fetchData(params.slug)

  return (
    <div className="max-w-3xl container px-4 sm:px-6 md:px-8 flex flex-col items-center pt-4 md:py-6 pb-3 sm:pb-6 md:pb-14">
      <div className="w-full flex-1 flex flex-col space-y-5 md:space-y-8">
        <div className="flex flex-col space-y-1.5">
          <h1 className="text-lg sm:text-xl md:text-2xl font-bold">
            {article.title}
          </h1>
          <div className="text-sm flex space-x-1 text-slate-500">
            <span>{dayjs(article.createdAt).format("DD/MM/YYYY")}</span>
            <span>-</span>
            <span>{article.author.name}</span>
          </div>
        </div>

        <Audio src={getStaticUrl(article.voice)} apiSrc="PlayHT" />

        <div className="relative w-full pt-[62.5%]">
          <Image
            src={getStaticUrl(article.thumbnail.url)}
            alt={article.title}
            fill
            unoptimized
            className="object-cover"
          />
        </div>

        <div className="pt-4 sm:pt-6 md:pt-10 flex flex-col space-y-10">
          {article.paragraphs?.map((paragraph) => (
            <div
              key={paragraph.id}
              className="flex flex-col space-y-3 md:space-y-4"
            >
              <p className="text-base">{paragraph.original}</p>
              {paragraph.translated?.map((t) => (
                <p key={t.id} className="text-base text-blue-500">
                  {t.content}
                </p>
              ))}
            </div>
          ))}
        </div>

        <Audio src={getStaticUrl(article.voice)} apiSrc="PlayHT" />

        {article.note?.noted && (
          <div className="pt-4 flex flex-col space-y-2">
            <h6 className="text-lg font-semibold">Summarize</h6>
            <div
              className="editor"
              dangerouslySetInnerHTML={{ __html: article.note.noted }}
            />
          </div>
        )}

        <div className="flex justify-end space-x-3 pt-6 sm:pt-8 md:pt-10">
          {article.categories?.map((cat) => (
            <div key={cat.id} className="text-sm text-slate-500">
              <span>{cat.title}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
