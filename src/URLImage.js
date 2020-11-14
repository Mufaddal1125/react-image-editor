// import React, { useRef, useEffect } from 'react'
// import ReactDOMServer from 'react-dom/server'

// import Image from './Image'



// const Canvas = (props) => {


//     const canvasRef = useRef(null)



//     const jsxImage = ReactDOMServer.renderToStaticMarkup(<Image src={props.src} style={props.style} alt={props.alt} className={props.cssClass} />)
//     const image = new DOMParser().parseFromString(jsxImage, "text/xml");


//     useEffect(() => {
//         const canvas = canvasRef.current
//         const context = canvas.getContext('2d')

//         console.log(image.firstChild)
//         context.drawImage(image.firstChild, 0, 0, canvas.width, canvas.height);

//         //Our first draw
//         // context.fillStyle = '#000000'
//         // context.fillRect(0, 0, context.canvas.width, context.canvas.height)
//     }, [props, image])


//     return <canvas ref={canvasRef} {...props} />
// }

// export default Canvas

import React from 'react';
import { Image } from 'react-konva';
import Konva from 'konva'
import useImage from 'use-image'

// the first very simple and recommended way:

// custom component that will handle loading image from url
// you may add more logic here to handle "loading" state
// or if loading is failed
// VERY IMPORTANT NOTES:
// at first we will set image state to null
// and then we will set it to native image instance when it is loaded

// example of functional component
const URLImage = (props) => {
  const URL = props.src;
  const [image] = useImage(URL, 'Anonimus');
  const imageRef = React.useRef();

  // when image is loaded we need to cache the shape
  React.useEffect(() => {
    if (image) {
      // you many need to reapply cache on some props changes like shadow, stroke, etc.
      imageRef.current.cache();
      // since this update is not handled by "react-konva" and we are using Konva methods directly
      // we have to redraw layer manually
      imageRef.current.getLayer().batchDraw();
    }
  }, [image]);

  return (
    <Image
      ref={imageRef}
      x={10}
      y={10}
      image={image}
      filters={[Konva.Filters.HSL, Konva.Filters.Pixelate ,Konva.Filters.Blur, Konva.Filters.Brighten, Konva.Filters.Contrast, Konva.Filters.Posterize, Konva.Filters.Noise]}
      blurRadius={props.Blur}
      luminance={props.luminance}
      noise={props.noise}
      pixelSize={props.pixel}
      brightness={props.brightness}
      contrast={props.contrast}
      levels={props.posterize}

    />
  );
};


export default URLImage;