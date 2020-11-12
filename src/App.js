import React, { useState } from 'react'
import './App.css'
import Slider from './Slider.js'
import SideBar from './SideBar'
import SetImage from './SetImage'

const DEFAULT_OPTIONS = [
  {
    name: "Brightness",
    property: 'brightness',
    value: 100,
    range: {
      min: 0,
      max: 200
    },
    unit: '%'
  },
  {
    name: "Contrast",
    property: 'contrast',
    value: 100,
    range: {
      min: 0,
      max: 200
    },
    unit: '%'
  },
  {
    name: "Saturation",
    property: 'saturate',
    value: 100,
    range: {
      min: 0,
      max: 200
    },
    unit: '%'
  },
  {
    name: "Grayscale",
    property: 'grayscale',
    value: 0,
    range: {
      min: 0,
      max: 100
    },
    unit: '%'
  },
  {
    name: "Sepia",
    property: 'sepia',
    value: 0,
    range: {
      min: 0,
      max: 100
    },
    unit: '%'
  },
  {
    name: "Hue Rotate",
    property: 'hue-rotate',
    value: 0,
    range: {
      min: 0,
      max: 360
    },
    unit: 'deg'
  },
  {
    name: "Blur",
    property: 'blur',
    value: 0,
    range: {
      min: 0,
      max: 20
    },
    unit: 'px'
  },
]



function App() {
  const [selectedOptionsIndex, setSelectedOptionsIndex] = useState(0)
  const [options, setOptions] = useState(DEFAULT_OPTIONS)
  const selectedOption = options[selectedOptionsIndex]
  const [style, setStyle] = useState({})

  function handleSliderChange({ target }) {
    setOptions(prevOptions => {
      return prevOptions.map((option, index) => {
        if (index !== selectedOptionsIndex) { return option }
        return { ...option, value: target.value }
      })
    })

    getImageStyle();
  }

  function getImageStyle(params) {
    const filters = options.map(option => {
      return `${option.property}(${option.value}${option.unit})`
    })
    // filters.push(`background-image: url(${params})`)
    
    setStyle({...style, filter: filters.join(' ') })
    // console.log(style)
  }
  
  function onSetImageHandler(url){
    
    setStyle({...style, backgroundImage: `url(${url})`})
    // console.log(style)
    
  }

  // console.log(getImageStyle())
  return (
    <div className="container">
        <div className="main-image" style={style}></div>
      <div className="side-bar">
        {options.map((option, index) => {
          return (<SideBar
            key={index}
            name={option.name}
            active={index === selectedOptionsIndex}
            handleClick={() => { setSelectedOptionsIndex(index) }}
          />
          )
        })}
        <SetImage 
          onset={onSetImageHandler}
        />
      </div>
      <Slider
        min={selectedOption.range.min}
        max={selectedOption.range.max}
        value={selectedOption.value}
        handleChange={handleSliderChange}
      />
    </div>
  );
}

export default App;
