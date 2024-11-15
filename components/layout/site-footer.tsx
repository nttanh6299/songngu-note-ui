import Link from "next/link"

export const SiteFooter = () => {
  return (
    <div className="h-12 md:h-14 px-6 bg-background border-t border-border flex items-center justify-end">
      <Link href="https://github.com/nttanh6299" target="_blank">
        <span className="text-sm text-gray-500 hover:underline">©Benjamin</span>
      </Link>
    </div>
  )
}
