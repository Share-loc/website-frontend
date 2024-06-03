interface ActionButtonProps {
  text : string,
  onClick : () => void
  children : React.ReactNode
}

const ActionButton = ({ text, onClick, children }: ActionButtonProps) => {
  return (
    <li className="text-blue hover:text-blue-500 cursor-pointer transition-colors duration-300 ease-in-out" >
        <button 
        onClick={onClick}
        className="flex items-center gap-2 lg:mx-0 sm:mx-5 mx-1"
        >
            <div className="p-2 lg:p-0 border-blue border-[1px] lg:border-0 rounded-full">
                {children}
            </div>
            <p className="hidden lg:block text-sm">
                {text}
            </p>
        </button>
    </li>
  )
}

export default ActionButton