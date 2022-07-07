import React from "react";

import { useTranslation } from 'react-i18next';
import { PROVIDERS_LOGO_WEB_PATH, skinUrl, SKIN_FOOTER_IMG_WEB_PATH, SKIN_LOGO_WEB_PATH, TEMPLATE_WEBDIR } from "../constants/global";

function Footer(props) {

    const SKIN = props.skin;
    const providers = props.providers;

    const { t } = useTranslation();

    function help_popup(url) {
        var popup = window.open(url, "Help", "scrollbars=no,resizable=no,toolbar=no,menubar=no,status=no,location=no,directories=no,left=0,top=0,height=700,width=1262,innerHeight=700,innerWidth=1280");
        popup.focus();
    }

    const state = {
        footerlinks: [
            { id: 0, nome: t('regole'), link: "/help/index.php?id=2" },
            { id: 1, nome: t('regoles'), link: "/help/index.php?id=3" },
            { id: 3, nome: t('norma'), link: "/help/index.php?id=14" },
            { id: 4, nome: t('privacy'), link: "/help/index.php?id=1" },
            { id: 5, nome: t('cookies'), link: "/help/index.php?id=10" },
            { id: 6, nome: t('gioco'), link: "/help/index.php?id=11" },
            { id: 8, nome: t('siamo'), link: "/help/index.php?id=4" },
            { id: 9, nome: t('contatti'), link: "/help/index.php?id=13" },
        ],
    };

    return (
        <>
            <footer id="footer">

                <div className="container-fluid">

                    <div className="row">

                        <div className="col-md-12">
                            <div className="box-link-footer">



                                <ul>
                                    {state.footerlinks.map(object =>

                                        <li key={object.id}><a onClick={() => help_popup(skinUrl + object.link)}>{object.nome}</a></li>
                                    )}
                                    <li key={2}><a href="/multiplebonus">{t('bonusm')}</a></li>
                                    <li key={7}><a href="/affiliate">{t('affiliato')}</a></li>
                                </ul>
                            </div>
                        </div>
                    </div>

                </div>

                <div className="container">
                    <img className="logo-footer" src={SKIN_LOGO_WEB_PATH(SKIN) + SKIN["logo_img"]} />

                    <div className="row section-footer-play">

                        {(providers.map(provider =>
                            <div key={provider.id} className="col-md-1 col-4">
                                <img src={PROVIDERS_LOGO_WEB_PATH(SKIN) + provider.img} className="icon-play" />
                            </div>
                        ))}
                    </div>





                    <div>
                        {/*<img src={SKIN_FOOTER_IMG_WEB_PATH(SKIN) + SKIN["footer_img"]} className="multiplatform" /><br />*/}

                    </div>
                </div>

                <div className="container">


                    <div className="row">

                        <div className="col-lg-12 col-md-12 align-self-center">

                            <div className="copyright">
                                {SKIN["footer_text"]}
                            </div>

                        </div>
                    </div>
                </div>
            </footer>
            <div className="footer-bottom-bar">
                <div className="container">
                    <div className="row">
                        <div className="col-lg-4">
                            <img src={"https://betplay360.com" + TEMPLATE_WEBDIR(SKIN) + "/assets/img/icon-browser.png"} className="multiplatform icon-saturation" />
                        </div>

                        <div className="col-lg-4">


                            <p className="loghi-pag">



                                <img src="https://media.gamesolutions.org/pay_methods/1.png?v=10030" />



                            </p>


                        </div>

                        <div className="col-lg-4">
                            <div className="gioco-18">
                                +18 Play Responsibly
                            </div>


                        </div>


                    </div>
                </div>
            </div>
        </>
    );

}

export default Footer;