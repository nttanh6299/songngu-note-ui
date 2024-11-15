export interface ApiParameters {
  sort?: string[] | string | null
  filters?: Filter | DeepFilter
  populate?: string[] | null
  fields?: string[] | null
  pagination?: {
    pageSize?: number
    page?: number
  }
  locale?: string[] | string | null
}

export interface DeepFilter {
  [key: string]: Filter
}

export interface Filter {
  [key: string]: FilterOperators
}

export interface Pagination {
  pageSize: number
  page: number
}

export interface FilterOperators {
  $eq?: string
  $eqi?: string
  $ne?: string
  $lt?: string
  $lte?: string
  $gt?: string
  $gte?: string
  $in?: string
  $notIn?: string
  $contains?: string
  $notContains?: string
  $containsi?: string
  $notContainsi?: string
  $null?: string
  $notNull?: string
  $between?: string
  $startsWith?: string
  $startsWithi?: string
  $endsWith?: string
  $endsWithi?: string
  $or?: string
  $and?: string
  $not?: string
}
