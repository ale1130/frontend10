import React from "react";

import { convertDate } from "../constants/global";

function Profile (props){

    const USER = props.datiUtente;

    const currency = USER["currency"];

    const saldo_totale = USER["balance"]+USER["balance_withdrawable"]+USER["bonus"];

    const LogOut = () => {

        if (window.confirm('Sicuro?')){
            localStorage.clear();
            window.location.href = '/?id=3';
        }
    };

    var last_login = convertDate(USER["last_login"]);

    const currentPage2 = props.paginaAttuale;

    return (
        <>
            <div className="container-fluid body-content">
                <div className="row">
                    <div className="col-md-12 col-lg-3">

                        <div className="box-balance">
                            <h2>Dettaglio saldo</h2>

                            <div><span className="elemento-voce">Saldo totale</span>
                            <strong>{saldo_totale+" "+currency}</strong></div>

                            <div><span className="elemento-voce">Saldo prelevabile</span>
                            <strong>{USER["balance_withdrawable"]+" "+currency}</strong></div>

                            <div><span className="elemento-voce">Saldo non prelevabile</span> <br/>
                            <strong>{USER["balance"]+" "+currency}</strong></div>

                            <div><span className="elemento-voce">Bonus</span> <br/>
                            <strong>{USER["bonus"]+" "+currency}</strong></div>
                        </div>


                        <div className="box-account-button">
                        
                            <h2>
                                Il tuo profilo      			          
                            </h2>
                            
                            <div>
                                <a href='/profile/info?id=3'>
                                    <div id="CambiaDati" className={currentPage2=="info" ? "selezionato" : ""} >
                                        Cambia dati               
                                    </div>
                                </a>  

                                <a href='/profile/password?id=3'>
                                    <div id="CambiaPassword" className={currentPage2=="password" ? "selezionato" : ""} >    
                                        Cambia password                    
                                    </div>
                                </a> 

                                <a href='/profile/messages?id=3'>
                                    <div id="Messages" className={currentPage2=="messages" ? "selezionato" : ""} >
                                        Messaggi          
                                    </div>
                                </a>   

                                <span className="count-prelie">0</span>

                                <div onClick={LogOut}>
                                    Esci dal profilo                    
                                </div>

                            </div>

                            <h2>Ultimo accesso</h2>

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
