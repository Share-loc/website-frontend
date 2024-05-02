interface NavButtonProps {
    text: string
    href: string
    children: React.ReactNode
}

const NavButton = ({text, href, children}: NavButtonProps) => {
  return (
    <li className="text-blue hover:text-blue-500 cursor-pointer transition-colors duration-300 ease-in-out" >
        <a 
        href={href}
        className="flex items-center gap-2 lg:mx-0 sm:mx-5 mx-1"
        >
            <div className="p-2 lg:p-0 border-blue border-[1px] lg:border-0 rounded-full">
                {children}
            </div>
            <p className="hidden lg:block text-sm">
                {text}
            </p>
        </a>
    </li>
  )
}

export default NavButton