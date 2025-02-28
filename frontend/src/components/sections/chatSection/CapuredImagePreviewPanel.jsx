import React from 'react'
import { globalVariable } from '../../../context/variables.context';
import { X } from 'lucide-react';

const CapuredImagePreviewPanel = () => {
    const { takenImage, setTakenImage} = globalVariable();
     if(!takenImage) return null;
  return (
    <div className="fixed inset-0 z-50 bg-black bg-opacity-75 flex items-center justify-center p-4">
        <div className="relative w-full max-w-4xl bg-gray-900 rounded-lg overflow-hidden">
            <button
            onClick={() => setTakenImage(null)}
            className="absolute top-4 right-4 text-white hover:text-gray-300 z-10"
            >
            <X size={24} />
            </button>
            <img src={takenImage} alt="Captured Image" className="w-full h-full object-contain" />
        </div>
      
    </div>
  )
}

export default CapuredImagePreviewPanel
