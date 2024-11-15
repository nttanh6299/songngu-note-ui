export const paths = {
  home: {
    url: () => ({
      toString: () => `/`,
    }),
  },
  article: {
    url: (slug: string) => ({
      toString: () => `/article/${slug}`,
    }),
  },
}
