export interface Article {
  id: number
  documentId: string
  title: string
  createdAt: string
  slug: string
  tags: string
  voice: string
  thumbnail: Thumbnail
  author: {
    name: string
  }
  categories: Category[]
  seo: Seo
  paragraphs: Paragraph[]
  createdBy: DateBy
  note: {
    id: number
    noted: string
  }
}

export interface Category {
  id: number
  title: string
  slug: string
}

export interface Thumbnail {
  formats: Formats
  url: string
  folderPath: string
}

export interface Formats {
  large: Format
  small: Format
  medium: Format
  thumbnail: Format
}

export interface Format {
  url: string
}

export interface Paragraph {
  id: number
  original: string
  translated: Translated[]
}

export interface Translated {
  id: number
  language: string
  content: string
}

export interface DateBy {
  firstname: string
  lastname: string
}

export interface Seo {
  id: number
  metaTitle: string
  metaDescription: string
  keywords: string
  metaImage: Thumbnail
}
