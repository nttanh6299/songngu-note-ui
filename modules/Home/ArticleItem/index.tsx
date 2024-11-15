"use client"

import NextImage from "next/image"
import Link from "next/link"
import { paths } from "@/constants/paths"
import dayjs from "dayjs"

import { Article } from "@/types/article"
import { getStaticUrl } from "@/lib/strapi"

interface ArticleItemProps {
  article: Article
}

export const ArticleItem = ({ article }: ArticleItemProps) => {
  return (
    <Link href={paths.article.url(article.slug).toString()}>
      <div className="group flex space-x-4 justify-between pt-4 md:pt-6 cursor-pointer">
        <div className="flex flex-col justify-between space-y-1.5">
          <div className="flex flex-col space-y-1.5">
            <p className="text-xs sm:text-sm md:text-lg font-bold">
              {article.title}
            </p>
            <span className="text-slate-500 text-tiny sm:text-xs uppercase">
              {dayjs(article.createdAt).format("MMM DD YYYY")} •{" "}
              {article.author.name}
            </span>
          </div>
        </div>
        <div>
          <div className="relative w-[100px] sm:w-[120px] md:w-[160px] pt-[62.5%]">
            <NextImage
              src={getStaticUrl(article?.thumbnail?.formats?.thumbnail?.url)}
              alt=""
              fill
              unoptimized
              className="object-cover rounded-lg"
            />
          </div>
        </div>
      </div>
    </Link>
  )
}
