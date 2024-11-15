import { paths } from "@/constants/paths"

export type SiteConfig = typeof siteConfig

export const siteConfig = {
  name: "BenjaNote",
  description: "Benja Note",
  mainNav: [
    {
      title: "Home",
      href: paths.home.url().toString(),
    },
  ],
  links: {
    github: "https://github.com/nttanh6299/songngu-note-ui",
  },
}
