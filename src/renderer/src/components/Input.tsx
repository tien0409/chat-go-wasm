import { InputHTMLAttributes, useId } from 'react'

type InputProps = InputHTMLAttributes<HTMLInputElement> & {
  label?: string
}

const Input = (props: InputProps) => {
  const { label, ...rest } = props
  const id = useId()

  return (
    <div className="mb-6">
      {label && <label htmlFor={id}>{label}</label>}
      <input
        id={id}
        {...rest}
        className="w-full px-4 py-3 text-sm border overflow-hidden rounded border-gray-500 outline-cyan-500"
      />
    </div>
  )
}

export default Input
