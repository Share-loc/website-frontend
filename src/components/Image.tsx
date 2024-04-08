interface ImageProps {
    src: string
    alt: string
}

const Image = (props: ImageProps) => {
  return (
    <div  className={`w-full h-[600px] bg-[url('${props.src}')] bg-cover bg-center`}></div>
  )
}

export default Image