import React from 'react';
import Skeleton from 'react-loading-skeleton';

function SearchSke(props) {
    return (
        <div style={{ width: "100%", display: "flex" }}>
            <div style={{ width: "40%" }}>
                <Skeleton width="100%" height={56} />
            </div>
            <div style={{ width: "60%", marginLeft: "5px" }}>
                <Skeleton width="60%" height={12} />
                <br />
                <Skeleton width="40%" height={12} />
            </div>
        </div>
    );
}

export default SearchSke;