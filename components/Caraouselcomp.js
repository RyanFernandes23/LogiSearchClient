import React from 'react'
import { Card, CardContent } from "@/components/ui/card"
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel"
import monstera from "@/public/monstera.jpg"
import Image from "next/image"

const Caraouselcomp = ({ images }) => {
  // Group images into sets of 3
  const groupedImages = images?.reduce((acc, curr, i) => {
    const groupIndex = Math.floor(i / 3);
    if (!acc[groupIndex]) {
      acc[groupIndex] = [];
    }
    acc[groupIndex].push(curr);
    return acc;
  }, []) || [];

  return (
    <Carousel className="w-full mx-auto">
      <CarouselContent>
        {groupedImages.map((group, groupIndex) => (
          <CarouselItem key={groupIndex}>
            <div className="grid grid-cols-3 gap-4 p-1">
              {group.map((image, index) => (
                <Card key={index} className="border-none bg-gray-800/50 group relative">
                  <CardContent className="flex aspect-square items-center justify-center p-2">
                    <a 
                      href={image.url || image.image} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="w-full h-full relative"
                    >
                      <img 
                        src={image.image} 
                        alt={image.title || 'Image'} 
                        className="w-full h-full object-cover rounded-lg transition-opacity group-hover:opacity-80"
                      />
                      <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity bg-black/60 rounded-lg">
                        <span className="text-white text-sm p-2 text-center break-all">
                          {image.url || image.image}
                        </span>
                      </div>
                    </a>
                  </CardContent>
                </Card>
              ))}
            </div>
          </CarouselItem>
        ))}
      </CarouselContent>
      <CarouselPrevious className="bg-gray-800/80 hover:bg-gray-700" />
      <CarouselNext className="bg-gray-800/80 hover:bg-gray-700" />
    </Carousel>
  )
}
export default Caraouselcomp

