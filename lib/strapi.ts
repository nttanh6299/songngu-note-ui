import { STATIC_ENDPOINT } from "@/config/env"

export const getStaticUrl = (url?: string) => {
  if (!url) return ""
  return `${STATIC_ENDPOINT}/${url}`
}
