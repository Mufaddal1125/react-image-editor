import React, { useState } from 'react'
import './App.css'
import Slider from './Slider.js'
import SideBar from './SideBar'
import SetImage from './SetImage'
// import Image from './Image'
import URLImage from './URLImage'
import {Stage, Layer} from 'react-konva'
// import Canvas from './Canvas'


const DEFAULT_OPTIONS = [
  {
    name: "Brightness",
    property: 'brightness',
    value: 1,
    range: {
      min: 0,
      max: 2
    },
    unit: '%',
    step: 0.1
  },
  {
    name: "Contrast",
    property: 'contrast',
    value: 10,
    range: {
      min: -20,
      max: 20
    },
    unit: '%',
    step: 0.5
  },
  {
    name: "Pixelate",
    property: 'pixel',
    value: 0.1,
    range: {
      min: 0.1,
      max: 10
    },
    unit: '%',
    step: 0.1

  },
  {
    name: "Luminance",
    property: 'luminance',
    value: 0,
    range: {
      min: -1,
      max: 1
    },
    unit: '%',
    step: 0.1

  },
  {
    name: "Posterize",
    property: 'posterize',
    value: 0.1,
    range: {
      min: 0,
      max: 0.1
    },
    unit: '%',
    step: 0.01
  },
  {
    name: "Noise",
    property: 'noise',
    value: 0,
    range: {
      min: 0,
      max: 2
    },
    unit: 'deg',
    step: 0.1
  },
  {
    name: "Blur",
    property: 'blur',
    value: 0,
    range: {
      min: 0,
      max: 20
    },
    unit: 'px',
    step: 1
  },
]




function App() {
  const [selectedOptionsIndex, setSelectedOptionsIndex] = useState(0)
  const [options, setOptions] = useState(DEFAULT_OPTIONS)
  const selectedOption = options[selectedOptionsIndex]
  
  const [src, setSrc] = useState('https://images.unsplash.com/photo-1480506132288-68f7705954bd?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1093&q=80')
  

  function handleSliderChange({ target }) {
    setOptions(prevOptions => {
      return prevOptions.map((option, index) => {
        if (index !== selectedOptionsIndex) { return option }
        return { ...option, value: target.value }
      })
    })

    
  }

  // function getImageStyle(params) {
  //   const filters = options.map(option => {
  //     return `${options.value}`
  //   })
    
  //   return {"style": {filter: filters.join(' ')}, blur: filters[6]}
  // }
  
  

  function onSetImageHandler(url){
    setSrc(url)
  }
  
  
  return (
    <div className="container">
      <div className="main-image">
      <Stage width={window.innerWidth} height={window.innerHeight}>
        <Layer>
          
        <URLImage noise={options[5].value / 1} posterize={options[4].value / 1} pixel={options[2].value / 1} luminance={options[3].value / 1} contrast={options[1].value / 1} brightness={options[0].value / 10} Blur={options[6].value} src={src}></URLImage>
          
        </Layer>
      </Stage>
      </div>
      
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
        step={selectedOption.step}
        handleChange={handleSliderChange}
      />
    </div>
  );
}

export default App;
