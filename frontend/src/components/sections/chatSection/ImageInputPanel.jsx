import { Camera, Send, X } from 'lucide-react';
import React, { useCallback, useRef, useState } from 'react'
import Webcam from 'react-webcam';
import { globalVariable } from '../../../context/variables.context';


const ImageInputPanel = () => {
    const webcamRef = useRef(null);

    const { setShowCameraInputPanel, setTakenImage } = globalVariable()

    const [capturedImage, setCapturedImage] = useState(null);

    const videoConstraints = {
        width: 1280,
        height: 720,
        facingMode: 'environment'
    };

    const capture = useCallback(() => {
        if (webcamRef.current) {
            const imageSrc = webcamRef.current.getScreenshot();
            if (imageSrc) {
                setCapturedImage(imageSrc);
            }
        }
    }, [webcamRef]);

    const handleImageMessageSubmit = (e) => {
        e.preventDefault();
        if (capturedImage) {
            setTakenImage(capturedImage);
            setShowCameraInputPanel(false);
        }
    };

    const retake = () => {
        setCapturedImage(null);
    };
    return (
        <div className="fixed inset-0 z-50 bg-black bg-opacity-75 flex items-center justify-center p-4">
            <div className="relative w-full max-w-4xl bg-gray-900 rounded-lg overflow-hidden">
                <button
                    onClick={() => setShowCameraInputPanel(false)}
                    className="absolute top-4 right-4 text-white hover:text-gray-300 z-10"
                >
                    <X size={24} />
                </button>

                <form onSubmit={handleImageMessageSubmit} className="p-6">
                    <div className="grid grid-cols-1 lg:grid-cols-1 gap-6">
                        {/* Camera Section */}
                        <div className="relative">
                            {!capturedImage ? (
                                <>
                                    <Webcam
                                        ref={webcamRef}
                                        audio={false}
                                        screenshotFormat="image/jpeg"
                                        videoConstraints={videoConstraints}
                                        className="w-full aspect-video object-cover rounded-lg"
                                    />
                                    <button
                                        type="button"
                                        onClick={capture}
                                        className="absolute bottom-4 left-1/2 transform -translate-x-1/2 bg-violet-600 px-6 py-3 rounded-full text-white hover:bg-violet-700 shadow-lg transition-all duration-200 flex items-center space-x-2"
                                    >
                                        <Camera size={24} />
                                        {/* <span>Capture</span> */}
                                    </button>
                                </>
                            ) : (
                                <div className="relative">
                                    <img
                                        src={capturedImage}
                                        alt="Preview"
                                        className="w-full aspect-video object-cover rounded-lg"
                                    />
                                    <button
                                        type="button"
                                        onClick={retake}
                                        className="absolute bottom-4 left-1/2  transform -translate-x-1/2 bg-gray-600 px-6 py-3 rounded-full text-white hover:bg-gray-700 shadow-lg transition-all duration-200 flex items-center space-x-2"
                                    >
                                        {/* <Camera size={24} /> */}
                                        <span>Retake</span>
                                    </button>
                                    <button
                                        type="button"
                                        onClick={handleImageMessageSubmit}
                                        className="absolute bottom-4 left-1/3  transform -translate-x-1/2 bg-gray-600 px-6 py-3 rounded-full text-white hover:bg-gray-700 shadow-lg transition-all duration-200 flex items-center space-x-2"
                                    >
                                        {/* <Camera size={24} /> */}
                                        <span>Done</span>
                                    </button>
                                </div>
                            )}
                        </div>

                    </div>
                </form>
            </div>
        </div>
    )
}

export default ImageInputPanel
