import React from 'react';

import { ConvertObjectToArraySlideshow, MEDIA_SLIDESHOWS_WEB_PATH } from '../constants/global';

import { useTranslation } from 'react-i18next';

export const SlickSlider = (props) => {

    const { t } = useTranslation();

    const logged = props.loggato;

    const SKIN = props.skin;

    const fadeImages = ConvertObjectToArraySlideshow(props.images[0]);

    return (

        <>
            <div className="margin-slider">
                <div id="slickSlider" className="slick-slider">

                    {fadeImages.map((fadeImage, index) => (

                        <>
                            <div className="slick-slide">
                                <div className="slider-item">
                                    <img src={MEDIA_SLIDESHOWS_WEB_PATH(SKIN) + fadeImage.url} />
                                    {!logged && <><a href="#" onClick={props.login} className="botton-adv-1">{t('accedi')}</a></>}
                                </div>
                            </div>   
                        </>
                    ))}
                </div>
            </div>
        </>
    )
}