import React, { useEffect, useRef, useState } from 'react';
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "./index.css";
import { FcNext, FcPrevious } from 'react-icons/fc';
import CarouselSlideItem from './CarouselSlideItem';
import { URL_API } from '../../const';
import CarouselSke from '../Skeleton/CarouselSke';
function Carousel(props) {
    const [listSlide, setListSlide] = useState([]);
    const slide = useRef();
    const settings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1
    }
    useEffect(() => {
        const fetchSlide = () => {
            fetch(`${URL_API}/slide`)
                .then(res => res.json())
                .then(data => {
                    setListSlide(data.data);
                })
        }
        fetchSlide();
    }, [])
    return (
        <div className="slider-wrapper">
            <Slider {...settings} ref={slide}>
                {listSlide.length !== 0 && listSlide.map(slide => {
                    return (
                        <CarouselSlideItem key={slide.slug} slide={slide} />
                    )
                })}
                {listSlide.length === 0 && [...Array(5)].map((a, i) => {
                    return (
                        <CarouselSke key={i} />
                    )
                })}
            </Slider>
            <div className="slider-button-next" onClick={() => slide.current.slickNext()}>
                <FcNext
                />
            </div>
            <div className="slider-button-pre" onClick={() => slide.current.slickPrev()}>
                <FcPrevious
                />
            </div>
        </div>
    );
}

export default Carousel;