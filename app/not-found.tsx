import Link from "next/link"
import { paths } from "@/constants/paths"
import { AlertTriangle } from "lucide-react"

export default function NotFound() {
  return (
    <div className="flex-1 flex flex-col space-y-4 justify-center items-center">
      <div className="bg-primary text-primary-foreground p-6">
        <div className="flex items-center gap-2 text-3xl font-bold">
          <AlertTriangle className="h-8 w-8" />
          <span>404 - Page Not Found</span>
        </div>
      </div>
      <Link href={paths.home.url().toString()} className="hover:underline">
        Go back to home
      </Link>
    </div>
  )
}
