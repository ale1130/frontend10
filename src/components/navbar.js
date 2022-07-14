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
import { checkSkinSett, SKIN_LOGO_WEB_PATH } from "../constants/global";

function Navbar(props) {

    const { t } = useTranslation();

    const SKIN = props.skin;

    const USER = props.datiUtente;

    const countMessages = props.countMessages;

    const balancetot = USER["balance"] + USER["bonus"] + USER["balance_withdrawable"];

    const skinSettings = props.skinSettings;

    //Forse dovrei controllare anche qua lo stato della variabile USER

    return (
        <>

            <header className="header-top">
                <div className="container-fluid d-flex justify-content-between align-items-center">
                    <div className="navigation-bar">
                        <a href="" className="menu-mobile-pul hide-desktop" data-toggle="modal" data-target="#ModalMenu"><i className="fa fa-bars"></i></a>
                        <h1 className="logo">
                            <a href="/">

                                <img src={SKIN_LOGO_WEB_PATH(SKIN) + SKIN["logo_img"] + "?v=111111"} />
                            </a>
                        </h1>
                        <nav className="nav-menu">
                            
                            {<GameSection currentPage={props.currentPage} user={USER} logged={props.statoLogin} skinSettings={skinSettings} />}
                            
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
                                        <PersonIcon />{countMessages > 0 ? <><div className="number-message">{countMessages}</div></> : <></>}
                                    </Dropdown.Toggle>

                                    <Dropdown.Menu>
                                        <BoxUtente setLogin={props.setLogin} utente={USER} countMessages={countMessages} />
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

    const skinSettings = props.skinSettings;

    const state = {
        gamecategory: [
            checkSkinSett(skinSettings, 'show_sport') ? { id: 0, nome: t('sport'), link: "/sport", immagine: "" } : <></>,
            { id: 1, nome: t('sportlive'), link: "/sport-live", immagine: "" },
            checkSkinSett(skinSettings, 'show_casino') ? { id: 2, nome: t('casino'), link: "/casino", immagine: "" } : <></>,
            checkSkinSett(skinSettings, 'show_casinolive') ? { id: 3, nome: t('casinolive'), link: "/casino-live", immagine: "" } : <></>,
            { id: 4, nome: 'Aviator', link: "/aviator", immagine: "" },
            checkSkinSett(skinSettings, 'show_poker') ? { id: 5, nome: t('poker'), link: "/poker", immagine: "" } : <></>,
            checkSkinSett(skinSettings, 'show_virtual') ? { id: 6, nome: t('virtual'), link: "/virtual", immagine: "" } : <></>,
            checkSkinSett(skinSettings, 'show_bingo') ? { id: 7, nome: t('bingo'), link: "/bingo", immagine: "" } : <></>
        ],
    }

    const currentPage = props.currentPage;

    return (

        <>
            <ul>
                {state.gamecategory.map(category => {
                    return (
                        <>

                            {category.id>=0 ? 

                            <li key={category.id} className={currentPage == category.link ? "active" : ""} >
                                <a href={category.link + ""}>
                                    <span>{category.nome}</span>
                                </a>
                            </li>
                            
                            : <></>}

                        </>
                    )
                })}

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
            </ul>
        </>
    );
}

export { Navbar };

export { GameSection };