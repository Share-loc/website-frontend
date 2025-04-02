'use client'

import { useState } from 'react'
import { ChevronLeft, ChevronRight } from 'lucide-react'

interface itemPictures {
  fullPath: string
  path: string
}

interface ProductGalleryProps {
  images: itemPictures[]
}

export default function ProductGallery({ images }: ProductGalleryProps) {
  const [currentIndex, setCurrentIndex] = useState(0)

  const goToPrevious = () => {
    setCurrentIndex((prevIndex) => 
      prevIndex === 0 ? images.length - 1 : prevIndex - 1
    )
  }

  const goToNext = () => {
    setCurrentIndex((prevIndex) => 
      prevIndex === images.length - 1 ? 0 : prevIndex + 1
    )
  }

  return (
    <div>
      <div className="relative aspect-square mb-4">
        <img
          src={images[currentIndex].fullPath}
          alt={images[currentIndex].path}
          className="object-cover rounded-md h-full"
        />
        <button
          className="absolute left-2 top-1/2 transform -translate-y-1/2"
          onClick={goToPrevious}
        >
          <ChevronLeft className="h-4 w-4" />
        </button>
        <button
          className="absolute right-2 top-1/2 transform -translate-y-1/2"
          onClick={goToNext}
        >
          <ChevronRight className="h-4 w-4" />
        </button>
      </div>
      <div className="flex space-x-2">
        {images.map((image, index) => (
          <button
            key={index}
            onClick={() => setCurrentIndex(index)}
            className={`flex-shrink-0 rounded-md ${
              index === currentIndex ? 'ring-2 ring-primary' : ''
            }`}
          >
            <img
              src={image.fullPath}
              alt={image.path}
              width={80}
              height={80}
              className="object-cover rounded-md h-full"
            />
          </button>
        ))}
      </div>
    </div>
  )
}

