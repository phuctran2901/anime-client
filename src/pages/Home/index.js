import React from 'react';
import Carousel from '../../components/Carousel';
import Section from '../../components/Section';
function Home(props) {
    return (
        <>
            <Carousel />
            <Section
                slug="recently"
                label="Mới cập nhật"
            />
            <Section
                slug="recommended"
                label="Hôm nay bạn xem gì ?"
            />
            <Section
                slug="ranking"
                label="Xem nhiều trong hôm nay"
            />
        </>
    );
}

export default Home;