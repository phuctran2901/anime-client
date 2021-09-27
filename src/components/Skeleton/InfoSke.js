import React from 'react';
import Skeleton from 'react-loading-skeleton';

function InfoSke(props) {
    return (
        <>
            <Skeleton width="40%" height={25} />
            <br />
            <Skeleton width="20%" height={25} />
            <br />
            <Skeleton width="40%" height={25} />
            <br />
            <Skeleton width="100%" height={300} />
        </>
    );
}

export default InfoSke;