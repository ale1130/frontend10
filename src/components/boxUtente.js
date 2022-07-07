import React, { Component, useState } from "react";

import '../styles/headerv1.css';

import { LogOut } from '../constants/global'

import { useTranslation } from 'react-i18next';
import { CoinIcon2, LogOutIcon, PersonIcon } from "./icons";

function BoxUtente(props) {

    const { t } = useTranslation();

    const USER = props.utente;
    const countMessages = props.countMessages;
    const balancetot = USER["balance"] + USER["bonus"] + USER["balance_withdrawable"];

    return (
        <>


            <div className="of-header" aria-labelledby="dropdownMenuLink" x-placement="bottom-start">

                <div className="header-drop-down">
                    <p>{t('benvenuto')}<br /><strong>{USER["username"]}</strong></p>
                    <a className="button-header" href="/account/deposit">{t('versamento')}</a>
                </div>

                <div className="box-balance">

                    <div>
                        <span className="elemento-voce2">{t('saldototale')}</span>
                        <strong className="currentBalance">{balancetot + " " + USER["currency"]}</strong>
                    </div>

                    <div>
                        <span className="elemento-voce2">{t('saldoprelevabile')}</span>
                        <strong className="palayer-balance-prelevabile">{USER["balance_withdrawable"] + " " + USER["currency"]}</strong>
                    </div>

                    <div>
                        <span className="elemento-voce2">{t('saldononprelevabile')}</span> <br />
                        <strong className="player-balance-non-prelevabile">{USER["balance"] + " " + USER["currency"]}</strong>
                    </div>

                    <div>
                        <span className="elemento-voce2">{t('bonus')}</span> <br />
                        <strong className="currentBonusBalance">{USER["bonus"] + " " + USER["currency"]}</strong>
                    </div>
                </div>

                <div className="footer-drop-down2">

                    <a href="/profile" className="button-header">
                        {countMessages > 0 ? <><div className="number-message">{countMessages}</div></> : <></>}
                        <PersonIcon />

                        {t('tuoprofilo')}
                    </a>

                    <a href="/account/transactions" className="button-header">

                        <CoinIcon2 />
                        {t('tuoconto')}
                    </a>
                </div>

                <p className="exit-to-play">
                    <a href="#" onClick={LogOut}>
                        <LogOutIcon /> {t('esci')}
                    </a>
                </p>
            </div>
        </>
    );

}

export { BoxUtente };
