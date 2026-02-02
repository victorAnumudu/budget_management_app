import { LazyLoadImage } from 'react-lazy-load-image-component';
import 'react-lazy-load-image-component/src/effects/blur.css';

export default function LazyImageLoader({ src, alt }) {
  return (
    <LazyLoadImage
        alt={alt}
        effect="blur"
        wrapperProps={{
            // If you need to, you can tweak the effect transition using the wrapper style.
            style: {transitionDelay: "1s"},
        }}
        src={src} 
        className='h-full w-full object-cover object-center'
    />
  )
}
