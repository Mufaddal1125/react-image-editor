import React from 'react'

export default function Slider({min, max, value, handleChange, step}) {
    return (
        <div className="slider-container">
            <input step={step} min={min} max={max} value={value} onChange={handleChange} type="range"></input>
        </div>
    )
}
