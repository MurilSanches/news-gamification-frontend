import React from 'react'

interface InputProps extends React.ComponentPropsWithoutRef<'input'> {
  error?: boolean
}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, error, ...props }, ref) => {
    return (
      <input
        ref={ref}
        className={`
          w-full rounded-md border border-yellow bg-white p-2
          text-black transition-all duration-200 focus:outline-none
          ${error && 'border-brown'}
          ${className || ''}
        `}
        {...props}
      />
    )
  }
)

Input.displayName = 'Input' // Boa prática para debug

export default Input
