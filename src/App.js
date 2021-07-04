import React, {useState} from 'react'
import './App.css'
import Slider from './Slider.js'
import SideBar from './SideBar'
import SetImage from './SetImage'
import URLImage from './URLImage'
import {Stage, Layer} from 'react-konva'


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
    const [src, setSrc] = useState(`https://picsum.photos/${1280}/${window.innerHeight}`)


    function handleSliderChange({target}) {
        setOptions(prevOptions => {
            return prevOptions.map((option, index) => {
                if (index !== selectedOptionsIndex) {
                    return option
                }
                return {...option, value: target.value}
            })
        })


    }

    // function getImageStyle(params) {
    //   const filters = options.map(option => {
    //     return `${options.value}`
    //   })

    //   return {"style": {filter: filters.join(' ')}, blur: filters[6]}
    // }


    function onSetImageHandler(url) {
        setSrc(url)
    }

    const stageRef = React.useRef(null);
    function downloadURI(uri, name) {
        let link = document.createElement('a');
        link.download = name;
        link.href = uri;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    }
    const handleExport = () => {
        const uri = stageRef.current.toDataURL();
        // window.open(uri, '_blank');
        // we also can save uri as file
        // but in the demo on Konva website it will not work
        // because of iframe restrictions
        // but feel free to use it in your apps:
        downloadURI(uri, 'image.png');
    };
    return (
        <div className="container">
            <div className="main-image">
                <Stage width={window.innerWidth} height={window.innerHeight} ref={stageRef} >
                    <Layer className="image-parent">
                        <URLImage className="image" noise={options[5].value} posterize={options[4].value}
                                  pixel={options[2].value} luminance={options[3].value}
                                  contrast={options[1].value} brightness={options[0].value / 10}
                                  Blur={options[6].value} src={src}/>
                    </Layer>
                </Stage>
            </div>

            <div className="side-bar">
                {options.map((option, index) => {
                    return (<SideBar
                            key={index}
                            name={option.name}
                            active={index === selectedOptionsIndex}
                            handleClick={() => {
                                setSelectedOptionsIndex(index)
                            }}
                        />
                    )
                })}
                <SetImage
                    onset={onSetImageHandler}
                />
                <button className="set-image-button" onClick={handleExport}>Download Image</button>
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
