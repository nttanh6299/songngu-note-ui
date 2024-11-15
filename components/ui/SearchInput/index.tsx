import { ChangeEvent, KeyboardEvent, useEffect, useRef, useState } from "react"
import { X } from "lucide-react"

import { cn } from "@/lib/utils"
import { Input } from "@/components/ui/Input"
import { Icons } from "@/components/icons"

interface SearchInputProps {
  defaultValue: string
  placeholder?: string
  wrapperClassName?: string
  onChange: (value: string) => void
}

export const SearchInput = ({
  defaultValue,
  placeholder,
  wrapperClassName,
  onChange,
}: SearchInputProps) => {
  const inputRef = useRef<HTMLInputElement>(null)
  const [input, setInput] = useState(defaultValue || "")

  useEffect(() => setInput(defaultValue), [defaultValue])

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const searchVal = e.target.value
    setInput(searchVal)

    if (!searchVal) {
      onChange("")
    }
  }

  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    const searchVal = e.currentTarget.value?.trim()
    if (e.key === "Enter" && defaultValue !== searchVal) {
      onChange(searchVal)
    }
  }

  const handleClear = () => {
    setInput("")
    onChange("")
    inputRef.current?.focus?.()
  }

  const handleClick = () => {
    if (input !== defaultValue) {
      onChange(input)
    }
  }

  return (
    <Input
      tabIndex={-1}
      ref={inputRef}
      value={input}
      placeholder={placeholder}
      onChange={handleChange}
      onKeyDown={handleKeyDown}
      className="font-normal"
      wrapperClassName={wrapperClassName}
      startAdornment={
        <div className="cursor-pointer flex select-none" onClick={handleClick}>
          <Icons.search className="scale-75" strokeWidth={1.5} />
        </div>
      }
      endAdornment={
        <X
          onClick={handleClear}
          className={cn("w-5 h-5 cursor-pointer select-none invisible", {
            visible: !!input,
          })}
        />
      }
    />
  )
}
