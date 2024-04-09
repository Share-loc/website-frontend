interface InputFormProps {
    id: string
    name: string
    type: string
    label: string
    color: string
}

const InputForm = (props: InputFormProps) => {
  return (
            <div>
                <label htmlFor={props.type} className="block text-sm font-medium leading-6 text-gray-900">
                    {props.label}
                </label>
                <div className="mt-2">
                    <input
                    id={props.id}
                    name={props.name}
                    type={props.type}
                    required
                    className={`block w-full rounded-md border-0 py-1.5 ${props.color} shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6`}
                    />
                </div>
            </div>
  )
}

export default InputForm