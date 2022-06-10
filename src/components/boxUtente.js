import React, {Component, useState} from "react";

import '../styles/headerv1.css';

function BoxUtente(props){

    const LogOut = () => {

        localStorage.clear();
        props.setLogin(false);
    };

    return (
        <>
            <div className="dropdown-menu of-header show stile1" aria-labelledby="dropdownMenuLink" x-placement="bottom-start">

                    <div className="header-drop-down">
                        <p>Benvenuto<br/><strong>ale1</strong></p>
                        <a className="button-header" href="/account?id=3">Versamento</a>
                    </div>

                    <div className="box-balance">

                        <div>
                            <span className="elemento-voce">Saldo totale</span>
                            <strong className="currentBalance">EUR 20.00</strong>
                        </div>

                        <div>
                            <span className="elemento-voce">Saldo prelevabile</span>
                            <strong className="palayer-balance-prelevabile">0.00 EUR</strong>
                        </div>

                        <div>
                            <span className="elemento-voce">Saldo non prelevabile</span> <br/>
                            <strong className="player-balance-non-prelevabile">0.00 EUR</strong>
                        </div>

                        <div>
                            <span className="elemento-voce">Bonus</span> <br/>
                            <strong className="currentBonusBalance">20.00 EUR</strong>
                        </div>
                    </div>

                    <div className="footer-drop-down">

                        <a href="/profile?id=3" className="button-header">

                            <svg version="1.1" id="Capa_1" x="0px" y="0px" viewBox="0 0 512 512">
                
                                    <path d="M437.02,330.98c-27.883-27.882-61.071-48.523-97.281-61.018C378.521,243.251,404,198.548,404,148
                                        C404,66.393,337.607,0,256,0S108,66.393,108,148c0,50.548,25.479,95.251,64.262,121.962
                                        c-36.21,12.495-69.398,33.136-97.281,61.018C26.629,379.333,0,443.62,0,512h40c0-119.103,96.897-216,216-216s216,96.897,216,216
                                        h40C512,443.62,485.371,379.333,437.02,330.98z M256,256c-59.551,0-108-48.448-108-108S196.449,40,256,40
                                        c59.551,0,108,48.448,108,108S315.551,256,256,256z">
                                    </path>
                            </svg>

                            Il tuo profilo 
                        </a>

                        <a href="/account/transactions" className="button-header">
                            Il tuo conto 
                        </a>
                    </div>

                    <p>
                        <a onClick={LogOut} className="exit-to-play">
                            Esci dal profilo
                        </a>
                    </p>
            </div>
        </>
    );

}

export {BoxUtente};
