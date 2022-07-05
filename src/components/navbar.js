import React from "react";
import { BoxUtente } from "./boxUtente";
import { PhoneIcon } from './icons';
import { GiftIcon } from './icons';
import { CoinIcon } from "./icons";
import { SettingsIcon } from './icons';
import { PersonIcon } from "./icons";
import { SelectLanguages } from './languagesselector';

import { useTranslation } from 'react-i18next';

import Dropdown from 'react-bootstrap/Dropdown';

import '../styles/headerv1.css';

function Navbar(props) {

    const { t } = useTranslation();

    const SKIN = props.skin;

    const USER = props.datiUtente;

    const countMessages = props.countMessages;

    const balancetot = USER["balance"] + USER["bonus"] + USER["balance_withdrawable"];

    //Forse dovrei controllare anche qua lo stato della variabile USER

    return (
        <>

            <header className="header-top">
                <div className="container-fluid d-flex justify-content-between align-items-center">
                    <div className="navigation-bar">
                        <a href="" className="menu-mobile-pul hide-desktop" data-toggle="modal" data-target="#ModalMenu"><i className="fa fa-bars"></i></a>
                        <h1 className="logo">
                            <a href="/">

                                <img src={props.logo} />
                            </a>
                        </h1>
                        <nav className="nav-menu">
                            <ul>
                                {<GameSection currentPage={props.currentPage} user={USER} logged={props.statoLogin} />}
                            </ul>
                        </nav>
                    </div>
                    <div className="login-links">
                        <a href="/promotions" className="button-header hide-mobile">
                            {<GiftIcon />}
                        </a>

                        {!props.statoLogin && <><a href="#" onClick={props.childModalButton} className="button-header login-pul">{t('accedi')}</a></>}

                        {props.statoLogin &&

                            <>
                                <div className="info-profile">
                                    <span id="reloadBalance" >
                                        <span className="currentBalance" style={{ color: "white" }}>{USER["currency"] + " " + balancetot}</span>
                                    </span>
                                </div>


                                <Dropdown>
                                    <Dropdown.Toggle variant="success" id="dropdown-basic">
                                        <PersonIcon />
                                    </Dropdown.Toggle>{countMessages>0 ? <><div className="number-message">{countMessages}</div></> : <></> }

                                    <Dropdown.Menu>
                                        <BoxUtente setLogin={props.setLogin} utente={USER} />
                                    </Dropdown.Menu>
                                </Dropdown>

                                <a href="/account/transactions" className="button-header hide-mobile">
                                    {<CoinIcon />}
                                </a>
                            </>
                        }

                        {!props.selectLanguageOK ?
                        
                            <div className="btn-group">

                                <Dropdown>
                                    <Dropdown.Toggle variant="success" id="dropdown-basic">
                                        <SettingsIcon />
                                    </Dropdown.Toggle>

                                    <Dropdown.Menu>
                                        <SelectLanguages skin={SKIN} svgphone={<PhoneIcon />} />
                                    </Dropdown.Menu>
                                </Dropdown>

                            </div>

                            :

                            <></>
                        }

                        
                    </div>
                </div>

            </header>
        </>
    );

}

const GameSection = (props) => {

    const { t } = useTranslation();

    const USER = props.user;
    const logged = props.logged;

    const state = {
        gamecategory: [
            { id: 0, nome: t('sport'), link: "/sport", immagine: "" },
            { id: 1, nome: t('sportlive'), link: "/sport-live", immagine: "" },
            { id: 2, nome: t('casino'), link: "/casino", immagine: "" },
            { id: 3, nome: t('casinolive'), link: "/casino-live", immagine: "" },
            { id: 4, nome: t('poker'), link: "/poker", immagine: "" },
            { id: 5, nome: t('virtual'), link: "/virtual", immagine: "" },
            { id: 6, nome: t('bingo'), link: "/bingo", immagine: "" }
        ],
    }

    const currentPage = props.currentPage;

    return (

        <>
            {state.gamecategory.map(category =>
                <>
                    
                    <li className={currentPage == category.link ? "active" : ""} key={category.id}>
                        <a href={category.link + ""}>
                            <span>{category.nome}</span>
                        </a>
                    </li>
                    
                </>
            )}

            {USER["username"] == "ale1" && logged ? 
                    
                <>
                    <li className={currentPage == "/languages" ? "active" : ""} key={7}>
                        <a href={"/languages" + ""}>
                            <span>LANGUAGES</span>
                        </a>
                    </li>
                </>
            
            : 
                <></>
            }
        </>
    );
}

export { Navbar };

export { GameSection };