import * as React from "react"

import { cn } from "@/lib/utils"

export interface InputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  error?: string
  wrapperClassName?: string
  startAdornment?: React.ReactNode
  endAdornment?: React.ReactNode
}

const Input = React.forwardRef<HTMLInputElement, InputProps>((props, ref) => {
  const {
    wrapperClassName,
    className,
    type,
    error,
    disabled,
    startAdornment,
    endAdornment,
    ...rest
  } = props
  return (
    <div
      className={cn(
        "flex h-10 w-full items-center space-x-2 rounded-12 border border-border bg-background px-3 py-2 focus-within:border-primary hover:border-primary-200 hover:focus-within:border-primary",
        {
          "border-destructive focus-within:border-destructive hover:border-destructive hover:focus-within:border-destructive":
            !!error,
          "border-border bg-disabled hover:border-border": !!disabled,
        },
        wrapperClassName
      )}
    >
      {startAdornment}
      <input
        type={type}
        ref={ref}
        disabled={disabled}
        className={cn(
          "flex h-full w-full bg-transparent text-sm ring-offset-background placeholder:text-slate-400 focus-visible:outline-none focus-visible:ring-0 focus-visible:ring-offset-0 disabled:cursor-not-allowed disabled:text-mauve-300 disabled:placeholder:text-mauve-300",
          className
        )}
        {...rest}
      />
      {endAdornment}
    </div>
  )
})
Input.displayName = "Input"

export { Input }
