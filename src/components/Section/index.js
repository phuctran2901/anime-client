import React, { useEffect, useState } from 'react';
import { Col, Row, Container } from 'react-bootstrap';
import Slider from 'react-slick';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "./index.css";
import Card from '../Card';
import CardSke from '../Skeleton/CardSke';
import { URL_API } from '../../const';
function Section({ slug, label }) {
    const [slides, setSlides] = useState([]);
    useEffect(() => {
        const fetchData = () => {
            setSlides([]);
            fetch(`${URL_API}/${slug === "ranking" ? `${slug}/ngay` : slug}`)
                .then(res => res.json())
                .then(data => {
                    setSlides(data.data);
                })
        }
        fetchData();
    }, [slug])
    const settings = {
        dots: false,
        arrows: false,
        infinite: true,
        speed: 500,
        slidesToShow: 4,
        slidesToScroll: 1,
        responsive: [
            {
                breakpoint: 1024,
                settings: {
                    slidesToShow: 3,
                    slidesToScroll: 3,
                    infinite: true,
                }
            },
            {
                breakpoint: 768,
                settings: {
                    slidesToShow: 2,
                    slidesToScroll: 2,
                    initialSlide: 2
                }
            },
            {
                breakpoint: 480,
                settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1
                }
            }
        ]
    }
    return (
        <section className="section-wrap">
            <h2 className="section-title">{label}</h2>
            <Slider {...settings}>
                {slides.length !== 0 && slides.map(slide => {
                    return <Card key={slide.slug} card={slide} />
                })}
                {slides.length === 0 && [...Array(24)].map((a, i) => {
                    return (
                        <CardSke key={i} />
                    )
                })}
            </Slider>
        </section>
    );
}

export default Section;