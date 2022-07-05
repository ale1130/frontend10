import React from "react";

import { useTranslation } from 'react-i18next';

function Footer(props){

    const {t} = useTranslation();

    const state = {
        footerlinks:[
            {id:0, nome:t('footerlinks.regole')},
            {id:1, nome:t('footerlinks.regoles')},
            {id:2, nome:t('footerlinks.bonus')},
            {id:3, nome:t('footerlinks.norma')},
            {id:4, nome:t('footerlinks.privacy')},
            {id:5, nome:t('footerlinks.cookies')},
            {id:6, nome:t('footerlinks.gioco')},
            {id:7, nome:t('footerlinks.affiliato')},
            {id:8, nome:t('footerlinks.siamo')},
            {id:9, nome:t('footerlinks.contatti')},
        ],
    };

    return(
        <>
        <footer id="footer">

            <div className="container-fluid">

                <div className="row">

                    <div className="col-md-12">
                        <div className="box-link-footer">
                            <ul>
                                {state.footerlinks.map(object =>
                                    
                                    <li key={object.id}><a href="">{object.nome}</a></li>
                                )}
                            </ul>
                        </div>
                    </div>
                </div>

            </div>
            <div className="container-fluid">


                <div className="row">

                    <div className="col-lg-12 col-md-12">
                        <img src={props.logo} className="logo-footer" />
                    </div>

                    <div className="col-lg-12 col-md-12 align-self-center">

                        <div className="row section-footer-play">
                        <div className="col-lg-1 col-md-2 col-3">
                            <img src="https://media.betzonelab.com/providers/img/150.png" className="icon-play provider-x" />
                        </div>
                        <div className="col-lg-1 col-md-2 col-3">
                            <img src="https://media.betzonelab.com/providers/img/150.png" className="icon-play provider-y" />
                        </div>

                            {props.imagesfooter}

                        </div>

                    </div>

                </div>


            </div>

            <div className="container">


                <div className="row">

                    <div className="col-lg-12 col-md-12 align-self-center">

                        <div className="copyright">     
                            {props.footer_text}
                        </div>

                    </div>
                </div>
            </div>
        </footer>
        <div className="footer-bottom-bar">
        <div className="container">
            <div className="row">
            <div className="col-lg-4">
                <img src="https://rabitcasino.com/templates/acqua/assets/img/icon-browser.png" className="multiplatform" />
            </div>
    
            <div className="col-lg-4" >
                <p className="loghi-pag">                                                          
                    <img src="https://media.gamesolutions.org/pay_methods/1.png?v=10030" />
                    <img src="https://media.gamesolutions.org/pay_methods/1.png?v=10030" />                                                        
                </p>    
            </div>
                
                <div className="col-lg-4">
                    <div className="gioco-18">
                    +18 {t('footerlinks.responsabile')}
                    </div>
                </div>     
            </div>
        </div>
    </div>
    </>
    );

}

export default Footer;