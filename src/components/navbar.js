import React, {useState} from "react";
import {BoxUtente} from "./boxUtente";
import {PhoneIcon} from './icons';
import {GiftIcon} from './icons';
import {CoinIcon} from "./icons";
import {SettingsIcon} from './icons';
import {PersonIcon} from "./icons";
import {SelectLanguages} from './languagesselector';

import { useTranslation } from 'react-i18next';

import '../styles/headerv1.css';

function Navbar(props){

    const { t } = useTranslation();

    const [open, setOpen] = useState(false);

    const [openProfile, setOpenProfile] = useState(false);

    const USER = props.datiUtente;

    const balancetot = USER["balance"]+USER["bonus"]+USER["balance_withdrawable"];

    //Forse dovrei controllare anche qua lo stato della variabile USER

    return (
        <>
            <header className="header-top">
                <div className="container-fluid d-flex justify-content-between align-items-center">
                    <div className="navigation-bar">
                        <a href="" className="menu-mobile-pul hide-desktop" data-toggle="modal" data-target="#ModalMenu"><i className="fa fa-bars"></i></a>
                        <h1 className="logo">
                            <a href="/?id=3">

                                <img src={props.logo}/>
                            </a>
                        </h1>
                        <nav className="nav-menu">
                            <ul>
                                {<GameSection currentPage={props.currentPage}/>}
                            </ul>
                        </nav>
                    </div>
                    <div className="login-links">
                        <a href="/promotions?id=3" className="button-header hide-mobile">
                            {<GiftIcon />}
                        </a>

                        {!props.statoLogin && <><a href="#" onClick={props.childModalButton} className="button-header login-pul">{t('accedi')}</a></>}

                        {props.statoLogin && 
                        
                            <>
                                <div className="info-profile">
                                    <span id="reloadBalance" >
                                        <span className="currentBalance" style={{color:"white"}}>{ USER["currency"]+" "+balancetot }</span> 
                                    </span>
                                </div>
                
                                <a href="#" onClick={() => setOpenProfile(!openProfile)} className="button-header login-pul" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                    {<PersonIcon />}                          
                                </a>

                                {openProfile && <BoxUtente setLogin={props.setLogin} closeModal={()=>setOpenProfile(false)} utente={USER}/>}
                    
                                <a href="/account?id=3" className="button-header hide-mobile">
                                    {<CoinIcon />}
                                </a>
                            </>
                        }

                        <div className="btn-group">
                            <a href="#" className="button-header" onClick={() => setOpen(!open)}>
                                {<SettingsIcon />}
                            </a>

                            {open && <SelectLanguages svgphone={<PhoneIcon />} />}
                        </div>
                    </div>
                </div>

            </header>
        </>
    );

}

const GameSection = (props) =>{

    const {t} = useTranslation();

    const state = {
        gamecategory:[
            {id:0, nome:t('navbar.sport'), link:"/sport", immagine:""},
            {id:1, nome:t('navbar.sportlive'), link:"/sport-live", immagine:""},
            {id:2, nome:t('navbar.casino'), link:"/casino", immagine:""},
            {id:3, nome:t('navbar.casinolive'), link:"/casino-live", immagine:""},
            {id:4, nome:t('navbar.poker'), link:"/poker", immagine:""},
            {id:5, nome:t('navbar.virtual'), link:"/virtual", immagine:""},
            {id:6, nome:t('navbar.bingo'), link:"/bingo", immagine:""}
        ],
    }

    const currentPage = props.currentPage;

    return(
        state.gamecategory.map(category =>
            <li className={currentPage==category.link ? "active" : ""} key={category.id}>
                <a href={category.link+"?id=3"}>
                    <span>{category.nome}</span>
                </a>
            </li>
        )
    );
}

export { Navbar };

export { GameSection };