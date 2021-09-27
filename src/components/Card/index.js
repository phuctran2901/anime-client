import React from 'react';
import "./index.css";
import { formatNumber } from '../../untils/formatNumber';
import { MdPlayArrow } from 'react-icons/md';
import { Link } from 'react-router-dom';
function Card(props) {
    const { card } = props;
    return (
        <div className="card-wrap">
            <div className="card-thumbnail">
                {card.time ? <div className="card-time">{card.time}</div> : ""}
                <div className="card-overlay"></div>
                <img src={card.thumbnail} />
                <Link to={`/xem-phim/${card.slug}`} className="card-play">
                    <MdPlayArrow
                        fontSize="36px"
                        color="white"
                    />
                </Link>
            </div>
            <div className="card-title">
                <Link to={`/xem-phim/${card.slug}`} className="card-name">{card.name}</Link>
                {card.latestEpisode.name ? <p className="card-lastEpisode">
                    {card.latestEpisode.name}
                </p> : ""}
                {card.latestEpisode.views || card.views ? <p className="card-view">Lượt xem :  {formatNumber(card.latestEpisode.views || card.views)}</p> : ""}
            </div>
        </div>
    );
}

export default Card;