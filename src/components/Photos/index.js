import React, { useState } from 'react'
import Cropper from 'react-easy-crop'

function Photos() {
  const [ crop, setCrop ] = useState({ x: 0, y: 0 })
  const [ zoom, setZoom ] = useState(1)

  return (
    <Cropper 
      crop={crop}
      zoom={zoom}
      aspect={ 1/1 }
      onCropChange={setCrop}
      onZoomChange={setZoom}
      image="https://img.huffingtonpost.com/asset/5ab4d4ac2000007d06eb2c56.jpeg?cache=sih0jwle4e&ops=1910_1000"
    />
  )
}

export default Photos