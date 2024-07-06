import React from 'react';
import Slider, { Settings } from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import '../index.css';
import { CarouselProps } from './types';



const defaultSettings: Settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 2000,
    pauseOnHover: true
};

const Carousel: React.FC<CarouselProps> = ({ items, settings = defaultSettings }) => {
    return (
        <div className="carousel w-full overflow-hidden">
            <Slider {...settings}>
                {items.map((item, idx) => (
                    <div key={idx} className="carousel-slide w-full">
                        {item}
                    </div>
                ))}
            </Slider>
        </div>
    );
};

export default Carousel;
