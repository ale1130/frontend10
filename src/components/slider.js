import Carousel from 'react-bootstrap/Carousel'
import React, { useState } from "react";

import { useTranslation } from 'react-i18next';

import { MEDIA_SLIDESHOWS_WEB_PATH } from '../constants/global';

function ControlledCarousel(props) {

    const SKIN = props.skin;
    
    const SliderData = props.immagini;

    const [index, setIndex] = useState(0);
  
    const handleSelect = (selectedIndex, e) => {
      setIndex(selectedIndex);
    };
  
    const {t} = useTranslation();

    return (
    <>
      <Carousel activeIndex={index} onSelect={handleSelect}>

        {SliderData.map((image,indice)=>{
            return(
                <Carousel.Item key={indice}>
                    <img src={MEDIA_SLIDESHOWS_WEB_PATH(SKIN)+image.url} alt={indice}/>
                    <div className="carousel-caption d-md-block  slide-adv">
                        <div className="content-adv">
                            <div className="button-adv">
                                {!props.isLogged && <><a onClick={props.openForm} className="botton-adv-1">{t('accedi')}</a></>}
                            </div>
                        </div>
                    </div>
                </Carousel.Item>
            )
        })}

      </Carousel>
    </>
    );
}

export default ControlledCarousel;