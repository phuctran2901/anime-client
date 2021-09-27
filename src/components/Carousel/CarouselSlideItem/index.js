import React from 'react';
import { AiFillPlayCircle } from 'react-icons/ai';
import { Link } from 'react-router-dom';
import { formatNumber } from '../../../untils/formatNumber';
function CarouselSlideItem(props) {
    const { slide } = props;
    return (
        <Link to={`/xem-phim/${slide.slug}`} className="slider-item">
            <img src={slide.thumbnail} alt={slide.name} className="slider-thumnail"
            />
            <div className="slider-content">
                <AiFillPlayCircle
                    fontSize="80px"
                    color="white"
                />
                <div>
                    <h1 className="slider-title">{slide.name}</h1>
                    <p className="slider-view">{formatNumber(slide.views)} lượt xem</p>
                </div>
            </div>
        </Link>
    );
}

export default CarouselSlideItem;