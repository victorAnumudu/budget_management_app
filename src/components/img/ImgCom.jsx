import { memo } from "react"
import localImgLoader from "../../helpers/localImageLoader"

const ImgCom = memo(({className, src, alt, absolute=false}) => {
  return (
    <img className={`dark:grayscale-50 ${className}`} src={ absolute ? src : localImgLoader(src)} alt={alt} />
  )
})

export default ImgCom
