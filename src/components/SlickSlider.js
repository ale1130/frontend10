import React from 'react';

import Slider from "react-slick";
import { ConvertObjectToArraySlideshow, MEDIA_SLIDESHOWS_WEB_PATH } from '../constants/global';

import { useTranslation } from 'react-i18next';

<script>

    <link
        rel="stylesheet"
        type="text/css"
        charset="UTF-8"
        href="https://cdnjs.cloudflare.com/ajax/libs/slick-carousel/1.6.0/slick.min.css"
    />
    <link
        rel="stylesheet"
        type="text/css"
        href="https://cdnjs.cloudflare.com/ajax/libs/slick-carousel/1.6.0/slick-theme.min.css"
    />
</script>

export const SlickSlider = (props) => {

    const { t } = useTranslation();

    const logged = props.loggato;

    const SKIN = props.skin;

    const fadeImages = ConvertObjectToArraySlideshow(props.images[0]);

    const settings = {
        dots: true,
        infinite: true,
        slidesToShow:1,
        slidesToScroll: 1,
        autoplay: true,
        autoplaySpeed: 4000,
        className: "center",
        centerMode: true,
        infinite: true,
        centerPadding: "60px",
        adaptiveHeight: true,
        arrows: false
    };

    return (

        <>
            <Slider {...settings}>
                <img src='https://stagemedia.gamesolutions.org/slideshow/img3_620d0b14e2915.jpeg'></img>
                <img src='https://stagemedia.gamesolutions.org/slideshow/img2_620d0b14e2500.jpeg'></img>
                <img src='https://stagemedia.gamesolutions.org/slideshow/img1_620d0b14e2042.jpeg'></img>
            </Slider>
        </>
    )
}