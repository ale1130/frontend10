import React from "react";

import { convertDate } from "../constants/global";

import { useTranslation } from "react-i18next";

import { LogOut } from "../constants/global";

function Profile (props){

    const { t, i18n } = useTranslation();

    const USER = props.datiUtente;

    const countMessages = props.countMessages;

    const currency = USER["currency"];

    const saldo_totale = USER["balance"]+USER["balance_withdrawable"]+USER["bonus"];

    var last_login = convertDate(USER["last_login"]);

    const currentPage2 = props.paginaAttuale;

    return (
        <>
            <div className="container-fluid body-content">
                <div className="row">
                    <div className="col-md-12 col-lg-3">

                        <div className="box-balance">
                            <h2>{t('dettagliosaldo')}	</h2>

                            <div><span className="elemento-voce">{t('saldototale')}</span>
                            <strong>{saldo_totale+" "+currency}</strong></div>

                            <div><span className="elemento-voce">{t('saldoprelevabile')}</span>
                            <strong>{USER["balance_withdrawable"]+" "+currency}</strong></div>

                            <div><span className="elemento-voce">{t('saldononprelevabile')}</span> <br/>
                            <strong>{USER["balance"]+" "+currency}</strong></div>

                            <div><span className="elemento-voce">{t('bonus')}</span> <br/>
                            <strong>{USER["bonus"]+" "+currency}</strong></div>
                        </div>


                        <div className="box-account-button">
                        
                            <h2>
                                {t('tuoprofilo')}			          
                            </h2>
                            
                            <div>
                                <a href='/profile/info'>
                                    <div id="CambiaDati" className={currentPage2=="info" ? "selezionato" : ""} >
                                        {t('cambiadati')}	         
                                    </div>
                                </a>  

                                <a href='/profile/password'>
                                    <div id="CambiaPassword" className={currentPage2=="password" ? "selezionato" : ""} >    
                                        {t('cambiapassword')}	                    
                                    </div>
                                </a> 

                                <a href='/profile/messages'>
                                    <div id="Messages" className={currentPage2=="messages" ? "selezionato" : ""} >
                                        {t('messaggi')}	          
                                    </div>
                                </a>   

                                <span className="count-prelie">{countMessages}</span>

                                <div onClick={LogOut}>
                                    {t('esci')}	                    
                                </div>

                            </div>

                            <h2>{t('ultimoaccesso')}	</h2>

                            <span className="fa fa-clock-o"></span>
                            {last_login}
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Profile;
