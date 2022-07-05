import React from "react";

import { useTranslation } from 'react-i18next';
import { skinUrl } from "../constants/global";

function Footer(props){

    const {t} = useTranslation();

    function help_popup(url) {
        var popup = window.open(url, "Help", "scrollbars=no,resizable=no,toolbar=no,menubar=no,status=no,location=no,directories=no,left=0,top=0,height=700,width=1262,innerHeight=700,innerWidth=1280");
        popup.focus();
    }

    const state = {
        footerlinks:[
            {id:0, nome:t('regole'), link:"/help/index.php?id=2"},
            {id:1, nome:t('regoles'), link:"/help/index.php?id=3"},
            {id:3, nome:t('norma'), link:"/help/index.php?id=14"},
            {id:4, nome:t('privacy'), link:"/help/index.php?id=1"},
            {id:5, nome:t('cookies'), link:"/help/index.php?id=10"},
            {id:6, nome:t('gioco'), link:"/help/index.php?id=11"},
            {id:8, nome:t('siamo'), link:"/help/index.php?id=4"},
            {id:9, nome:t('contatti'), link:"/help/index.php?id=13"},
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

                                    <li key={object.id}><a onClick={()=>help_popup(skinUrl+object.link)}>{object.nome}</a></li>  
                                )}
                                <li key={2}><a href="/multiplebonus">{t('bonusm')}</a></li>
                                <li key={7}><a href="/affiliate">{t('affiliato')}</a></li>
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
                    +18 {t('responsabile')}
                    </div>
                </div>     
            </div>
        </div>
    </div>
    </>
    );

}

export default Footer;