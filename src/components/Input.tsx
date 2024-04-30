interface InputProps {
    children?: React.ReactNode
    label: string
    id: string
    name: string
    type: string
    autoComplete?: string
    required: boolean
}

const Input = ({ children, label, id, name, type, autoComplete, required = true }: InputProps) => {
  return (
            <div>
                <label htmlFor="email" className="block text-sm font-medium leading-6 text-gray-900">
                    { label }
                </label>
                {children}
                <div className="mt-2">
                    <input
                    id={ id }
                    name={ name }
                    type={ type }
                    autoComplete={ autoComplete }
                    {...required && { required }}
                    className="block w-full rounded-md border-0 py-1.5 text-black shadow-sm ring-1 ring-inset ring-black placeholder:text-black focus:ring-2 focus:ring-inset focus:ring-blue sm:text-sm sm:leading-6"
                    />
                </div>
            </div>
  )
}

export default Input