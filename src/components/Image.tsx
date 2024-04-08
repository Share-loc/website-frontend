interface ImageProps {
    src: string
    alt: string
    width: string
    height: string
}

const Image = (props: ImageProps) => {
  return (
    <div  className="w-full flex justify-center">
        <img src={props.src} alt={props.alt} style={{width: props.width, height: props.height}} className="bg-orange-300 rounded-sm"/>
    </div>
  )
}

export default Image