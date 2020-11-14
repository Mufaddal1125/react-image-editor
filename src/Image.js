import React from 'react'



export default function Image({src, style, cssClass, alt}) {
    return <img src={src} style={style} alt={alt} className={cssClass}></img>
}
