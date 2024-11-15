export type Option = {
  value: string
  label: string
}

export interface PaginationResponse {
  pagination: {
    page: number
    pageSize: number
    pageCount: number
    total: number
  }
}
