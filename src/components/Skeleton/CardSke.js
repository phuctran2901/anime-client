import React from 'react';
import Skeleton from 'react-loading-skeleton';
function CardSke(props) {
    return (
        <div className="card-wrap">
            <Skeleton width="100%" height={150} />
            <Skeleton width="60%" height={20} />
            <Skeleton width="60%" height={20} />
        </div>
    );
}

export default CardSke;