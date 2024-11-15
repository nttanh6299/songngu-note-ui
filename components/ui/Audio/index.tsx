interface AudioProps {
  src: string
  apiSrc?: string
}

export const Audio = ({ src, apiSrc }: AudioProps) => {
  return (
    <div className="flex-1 w-full flex space-x-2 items-center">
      <audio controls src={src} className="flex-1" />
      {apiSrc && <p className="text-xs text-slate-500">{apiSrc}</p>}
    </div>
  )
}
