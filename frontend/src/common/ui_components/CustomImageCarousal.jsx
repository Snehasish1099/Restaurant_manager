import React, { useState, useEffect } from "react";

const CustomImageCarousal = ({ images, autoPlay = true, interval = 3000 }) => {
    const [currentIndex, setCurrentIndex] = useState(1); // Start from the first cloned image
    const [isTransitioning, setIsTransitioning] = useState(true);

    // Create cloned images to enable smooth looping
    const extendedImages = [images[images.length - 1], ...images, images[0]];

    useEffect(() => {
        if (autoPlay) {
            const slideInterval = setInterval(() => {
                goToNextSlide();
            }, interval);
            return () => clearInterval(slideInterval);
        }
    }, [currentIndex, autoPlay, interval]);

    const goToPreviousSlide = () => {
        if (currentIndex === 1) {
            // Instant jump to the last cloned image (without transition)
            setIsTransitioning(false);
            setCurrentIndex(extendedImages.length - 2);
            setTimeout(() => setIsTransitioning(true), 50);
        } else {
            setCurrentIndex((prevIndex) => prevIndex - 1);
        }
    };

    const goToNextSlide = () => {
        if (currentIndex === extendedImages.length - 2) {
            // Instant jump to the first cloned image (without transition)
            setIsTransitioning(false);
            setCurrentIndex(1);
            setTimeout(() => setIsTransitioning(true), 50);
        } else {
            setCurrentIndex((prevIndex) => prevIndex + 1);
        }
    };

    return (
        <div className="relative w-full h-[250px] md:h-[350px] lg:h-[500px] overflow-hidden rounded-lg">
            {/* Images Wrapper */}
            <div
                className={`flex transition-transform duration-700 ease-in-out ${!isTransitioning ? "transition-none" : ""}`}
                style={{ transform: `translateX(-${currentIndex * 100}%)` }}
            >
                {extendedImages.map((image, index) => (
                    <img
                        key={index}
                        src={image}
                        alt={`Slide ${index}`}
                        className="w-full h-[250px] md:h-[350px] lg:h-[500px] object-cover flex-shrink-0"
                    />
                ))}
            </div>

            {/* Navigation Buttons */}
            <button
                className="hidden md:block absolute top-1/2 left-4 transform -translate-y-1/2 bg-black bg-opacity-50 text-white p-3 rounded-full shadow-md hover:bg-opacity-70"
                onClick={goToPreviousSlide}
            >
                ❮
            </button>
            <button
                className="hidden md:block absolute top-1/2 right-4 transform -translate-y-1/2 bg-black bg-opacity-50 text-white p-3 rounded-full shadow-md hover:bg-opacity-70"
                onClick={goToNextSlide}
            >
                ❯
            </button>

            {/* Indicators */}
            <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2">
                {images.map((_, index) => (
                    <button
                        key={index}
                        className={`w-3 h-3 rounded-full transition-colors duration-300 ${
                            index + 1 === currentIndex ? "bg-white scale-125" : "bg-gray-400"
                        }`}
                        onClick={() => setCurrentIndex(index + 1)}
                    />
                ))}
            </div>
        </div>
    );
};

export default CustomImageCarousal;