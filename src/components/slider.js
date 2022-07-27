import Carousel from 'react-bootstrap/Carousel'
import React, { useState } from "react";

import { useTranslation } from 'react-i18next';

import { MEDIA_SLIDESHOWS_WEB_PATH } from '../constants/global';


    {/*<script 
    src="https://unpkg.com/react/umd/react.production.min.js" 
    crossorigin></script>

    <script
    src="https://unpkg.com/react-dom/umd/react-dom.production.min.js"
    crossorigin></script>

    <script
    src="https://unpkg.com/react-bootstrap@next/dist/react-bootstrap.min.js"
    crossorigin></script>

    <link
    rel="stylesheet"
    href="https://cdn.jsdelivr.net/npm/bootstrap@5.1.3/dist/css/bootstrap.min.css"
    integrity="sha384-1BmE4kWBq78iYhFldvKuhfTAU6auU8tT94WrHftjDbrCEXSU1oBoqyl2QvZ6jIW3"
    crossorigin="anonymous"/>*/}


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