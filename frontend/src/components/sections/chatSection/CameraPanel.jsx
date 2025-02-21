import { Camera, Send, X } from 'lucide-react';
import React, { useCallback, useRef, useState } from 'react'
import Webcam from 'react-webcam';

const CameraPanel = ({ setMessages, setShowCameraPanel }) => {
    const webcamRef = useRef(null);

    const [capturedImage, setCapturedImage] = useState(null);
    const [messageText, setMessageText] = useState('');
    const [messageDateTime, setMessageDateTime] = useState('');

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
            const timestamp = messageDateTime || new Date().toISOString();
            const newMessage = {
                type: 'user',
                text: messageText,
                image: capturedImage,
                timestamp
            };

            setMessages(prev => [...prev, newMessage]);
            setCapturedImage(null);
            setMessageText('');
            setMessageDateTime('');
            setShowCameraPanel(false);

            // Simulate AI response
            setTimeout(() => {
                setMessages(prev => [...prev, {
                    type: 'ai',
                    text: 'I received your image and message. How can I help you with this?',
                    timestamp: new Date().toISOString()
                }]);
            }, 1000);
        }
    };

    const retake = () => {
        setCapturedImage(null);
    };
    return (
        <div className="fixed inset-0 z-50 bg-black bg-opacity-75 flex items-center justify-center p-4">
            <div className="relative w-full max-w-4xl bg-gray-900 rounded-lg overflow-hidden">
                <button
                    onClick={() => setShowCameraPanel(false)}
                    className="absolute top-4 right-4 text-white hover:text-gray-300 z-10"
                >
                    <X size={24} />
                </button>

                <form onSubmit={handleImageMessageSubmit} className="p-6">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
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
                                </div>
                            )}
                        </div>

                        {/* Form Section */}
                        <div className="space-y-4">
                            <div>
                                <label htmlFor="message" className="block text-sm font-medium text-gray-300 mb-2">
                                    Message
                                </label>
                                <textarea
                                    id="message"
                                    rows={4}
                                    value={messageText}
                                    onChange={(e) => setMessageText(e.target.value)}
                                    placeholder="Enter your message..."
                                    className="w-full bg-gray-700 text-white rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-violet-500"
                                />
                            </div>
                            <div>
                                <label htmlFor="datetime" className="block text-sm font-medium text-gray-300 mb-2">
                                    Date and Time
                                </label>
                                <input
                                    type="datetime-local"
                                    id="datetime"
                                    value={messageDateTime}
                                    onChange={(e) => setMessageDateTime(e.target.value)}
                                    className="w-full bg-gray-700 text-white rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-violet-500"
                                />
                            </div>
                            <button
                                type="submit"
                                disabled={!capturedImage}
                                className="w-full bg-violet-600 px-6 py-3 rounded-lg text-white hover:bg-violet-700 shadow-lg transition-all duration-200 flex items-center justify-center space-x-2 disabled:opacity-50 disabled:cursor-not-allowed"
                            >
                                <Send size={20} />
                                <span>Send Message</span>
                            </button>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default CameraPanel
