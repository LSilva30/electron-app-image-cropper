import React, { useState, useCallback } from 'react';
import Cropper from 'react-easy-crop';
import { readFile, saveCroppedImage } from '../../helpers/images';

function Photos() {
  const [imageSrc, setImageSrc] = useState(null);
  const [crop, setCrop] = useState({ x: 0, y: 0 });
  const [zoom, setZoom] = useState(1);
  const [fileName, setFileName] = useState(null);
  const [croppedAreaPixels, setCroppedAreaPixels] = useState(null);

  const onCropComplete = useCallback((croppedArea, _croppedAreaPixels) => {      //<-- once picture is cropped, it renders the cropped pictures to be shwon on screen
    setCroppedAreaPixels(_croppedAreaPixels)
  }, [])
  
  
  const handleFileChange = async (e) => {
    if (e.target.files && e.target.files.length > 0) {     //<-- if we get back an array of files && make sure there is at least 1 file( ... > 0)
      const file = e.target.files[0] 
      setFileName(file.path)                      //<-- then grab that file
      const imageDataUrl = await readFile(file)     // <-- (await means -->)dont go on UNTIL we have an image. once we receive a file, then we set it as imageDataUrl
      setImageSrc(imageDataUrl)               //<-- our SETTER from state is now setting imageDataUrl(which is our image file) INTO our GETTER: 'imageSRC' thats being used on line: 34
    }
  }

  const handleSave = () => {
    saveCroppedImage(fileName, imageSrc, croppedAreaPixels)
    setImageSrc(null)                              //<-- once image is saved, will bring back to the "choose file" page again
    setZoom(1)                                     //<-- resets zoom to default setting AFTER save
    setCrop({ x: 0, y: 0 })                        //<-- resets crop to default setting AFTER save
  }

  if (!imageSrc) {
    return (                              //<-- at the start there is no image. once a file is CHANGED. then RUN the function handleFileChange
      <> 
        <h1>Please choose a photo to crop</h1>
        <input type="file" accept="image/*" onChange={handleFileChange} /> 
      </>
    );
  }

  return (                                //<-- once the function is run, take us to the Cropper
    <div className="crop-area">
      <Cropper
        crop={crop}
        zoom={zoom}
        aspect={1 / 1}
        onCropChange={setCrop}
        onZoomChange={setZoom}
        onCropComplete={onCropComplete}
        image={imageSrc}                   //<-- this is grabbing the info from line: 14 which is where we're getting our imageSrc data from in our Cropper tool
      />
      <button className="save-btn" onClick={handleSave}>Save</button>
    </div>
  );
}

export default Photos;
