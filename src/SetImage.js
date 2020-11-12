import React, {useState} from 'react'

export default function SetImage({onset}) {

    const [url, setUrl] = useState('')

    return (
        <div className="set-image">
            <h4>Set Image:</h4>
            <input type="url" className="set-image-url" onChange={(event) => setUrl(event.target.value)} placeholder="Paste Image URL Here"></input>
            <button className="set-image-button" onClick={() => onset(url)}>Set Image</button>
        </div>
    )
}
