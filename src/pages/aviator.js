import { convertToFormdata, skinUrl, TEMPLATE_WEBDIR } from "../constants/global"
import React from "react";
import { CasinoFrame } from "../components/iframecasino";
import { useState } from "react";
import { useEffect } from "react";
import axios from "axios";
import '../styles/aviator.css';

import { useTranslation } from "react-i18next";

export const Aviator = (props) => {

    const SKIN = props.skin

    const logged = props.islogged;
    const loggato = logged ? 1 : 0;

    const { t, i18n } = useTranslation();

    const USER = props.user;

    const [statoGame, setStatoGame] = useState(false);
    const [game, setGame] = useState("empty");

    const [infoGame, setInfoGame] = useState(false);

    const playCasinoGame = async (id) => {

        const dati = { "id": id, "user_id": USER["id"] }

        try {

            const data = await axios
                ({
                    method: "post",
                    url: skinUrl + "rest/playgame-casino.php",
                    data: convertToFormdata(dati)
                })
                .then(response => {

                    if (response.data.status == "ok") {
                        setGame(response.data.params)

                    } else if (response.data.status == "error") {

                        setGame("error")
                    } else {

                        alert("error");
                    }
                })

        } catch (e) {

            alert("error");
            console.log(e);
        }
    }

    useEffect(() => {
        if (game != "empty" && game != "error") {

            setStatoGame(true);
        } else if (game == "error") {

            alert("errore tecnico durante l'apertura del GeolocationCoordinates, si prega di riprovare o di contattare l'assistenza tecnica")
        }
    }, [game])

    return (
        <>
            {<CasinoFrame close={() => setStatoGame(false)} statoGame={statoGame} game={game} />}

            <div className="container-fluid body-content slider-height">
                <main id="turbogamePage">

                    {!infoGame ? 
                    <>
                        <div id="pageContent" className="opened">
                            <div id="turbogameBoxes">
                                <div className="container">

                                    <div className="box box-1">
                                        <div className="box-content">
                                            <div className="sys-game mb-4">

                                                <img src={skinUrl + TEMPLATE_WEBDIR(SKIN) + "/assets/img/spribe/aviator-logo.png"} className="game-image" />

                                                <a className="btn play-now" onClick={loggato == 0 ? props.login : () => playCasinoGame(41295)}>{t('giocaora')}</a>
                                                <span>{t('descraviator')}</span>
                                            </div>
                                            <a id="howToPlayAviatorBtn" className="btn" onClick={()=>setInfoGame(!infoGame)}>{t('comeaviator')}</a>
                                        </div>
                                    </div>

                                    <div className="box box-2">
                                        <div className="box-content">
                                            <div className="sys-game" onClick={loggato == 0 ? props.login : () => playCasinoGame(41294)}>

                                                <img src={skinUrl + TEMPLATE_WEBDIR(SKIN) + "/assets/img/spribe/dice.png"} className="game-image" />
                                            </div>
                                            <div className="sys-game" onClick={loggato == 0 ? props.login : () => playCasinoGame(41293)}>

                                                <img src={skinUrl + TEMPLATE_WEBDIR(SKIN) + "/assets/img/spribe/goal.png"} className="game-image" />
                                            </div>
                                            <div className="sys-game" onClick={loggato == 0 ? props.login : () => playCasinoGame(41290)}>

                                                <img src={skinUrl + TEMPLATE_WEBDIR(SKIN) + "/assets/img/spribe/hi-lo.png"} className="game-image" />
                                            </div>
                                            <div className="sys-game" onClick={loggato == 0 ? props.login : () => playCasinoGame(41289)}>

                                                <img src={skinUrl + TEMPLATE_WEBDIR(SKIN) + "/assets/img/spribe/keno.png"} className="game-image" />
                                            </div>
                                            <div className="sys-game" onClick={loggato == 0 ? props.login : () => playCasinoGame(41291)}>

                                                <img src={skinUrl + TEMPLATE_WEBDIR(SKIN) + "/assets/img/spribe/mines.png"} className="game-image" />
                                            </div>
                                            <div className="sys-game" onClick={loggato == 0 ? props.login : () => playCasinoGame(41288)}>

                                                <img src={skinUrl + TEMPLATE_WEBDIR(SKIN) + "/assets/img/spribe/miniroulette.png"} className="game-image" />
                                            </div>
                                            <div className="sys-game" onClick={loggato == 0 ? props.login : () => playCasinoGame(41292)}>

                                                <img src={skinUrl + TEMPLATE_WEBDIR(SKIN) + "/assets/img/spribe/plinko.png"} className="game-image" />
                                            </div>
                                        </div>
                                    </div>

                                </div>
                            </div>
                        </div>
                    </>

                    :

                    <>
                        <div id="howToPlayAviatorContent">
                            <div className="container">
                                <div className="box box-1">

                                    <div className="box-header">
                                        {t('comesigioca')}
                                        <a onClick={()=>setInfoGame(!infoGame)} id="closeHowToPlayAviatorContent"><i className="fa fa-arrow-left"></i>{t('indietro')}</a>
                                    </div>

                                    <div className="box-content">
                                        <div>
                                            <div>
                                                <ul className>
                                                    <li >
                                                        <div >
                                                            <h3 >{t('aviatorcosa')}</h3>
                                                        </div>
                                                        <p>{t('avatorcosar')}</p>
                                                    </li>
                                                    <li >
                                                        <div >
                                                            <h3 >{t('aviatorcome')}</h3>
                                                        </div>
                                                        <ul>
                                                            {t('aviatorcomer')}
                                                        </ul>
                                                    </li>
                                                    <li >
                                                        <div >
                                                            <h3 >{t('aviatorcomeguadagno')}</h3>
                                                        </div>
                                                        <p>
                                                            {t('aviatorcomeguadagnor')}
                                                        </p>
                                                    </li>
                                                    <li >
                                                        <div >
                                                            <h3 >{t('aviatordettagli')}</h3>
                                                        </div>
                                                        <p>
                                                            {t('aviatordettaglir')}
                                                        </p>
                                                    </li>
                                                    <li >
                                                        <div >
                                                            {t('aviatorformula')}
                                                        </div>
                                                        <p>
                                                            {t('aviatorformular')}
                                                        </p>
                                                    </li>
                                                </ul>
                                                <div id="liveCasinoSlider" className="carousel slide" data-ride="carousel">
                                                    <div className="carousel slide" data-ride="carousel">
                                                        <div >
                                                            <div className="carousel-inner">
                                                                <div className="carousel-item active">
                                                                    <img className="w-100" src={skinUrl + TEMPLATE_WEBDIR(SKIN)+"/assets/img/spribe/1a.png"} alt="" />
                                                                    <div >
                                                                        <p >{t('aviators1')}</p>
                                                                    </div>
                                                                </div>
                                                                <div className="carousel-item">
                                                                    <img className="w-100" src={skinUrl + TEMPLATE_WEBDIR(SKIN)+"/assets/img/spribe/1a.png"} alt="" />
                                                                    <div >
                                                                        <p >{t('aviators2')}</p>
                                                                    </div>
                                                                </div>
                                                                <div className="carousel-item">
                                                                    <img className="w-100" src={skinUrl + TEMPLATE_WEBDIR(SKIN)+"/assets/img/spribe/3a.png"} alt="" />
                                                                    <div >
                                                                        <p >{t('aviators3')}</p>
                                                                    </div>
                                                                </div>
                                                                <div className="carousel-item">
                                                                    <img className="w-100" src={skinUrl + TEMPLATE_WEBDIR(SKIN)+"/assets/img/spribe/4a.png"} alt="" />
                                                                    <div >
                                                                        <p >{t('aviators4')}</p>
                                                                    </div>
                                                                </div>
                                                                <div className="carousel-item">
                                                                    <img className="w-100" src={skinUrl + TEMPLATE_WEBDIR(SKIN)+"/assets/img/spribe/5a.png"} alt="" />
                                                                    <div >
                                                                        <p >{t('aviators5')}</p>
                                                                    </div>
                                                                </div>
                                                                <div className="carousel-item">
                                                                    <img className="w-100" src={skinUrl + TEMPLATE_WEBDIR(SKIN)+"/assets/img/spribe/6a.png"} alt="" />
                                                                    <div >
                                                                        <p >{t('aviators6')}</p>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <a className="carousel-control-prev" href="#liveCasinoSlider" data-slide="prev"><img src={skinUrl + TEMPLATE_WEBDIR(SKIN)+"/assets/img/spribe/arr-left.png"} /></a>
                                                    <a className="carousel-control-next" href="#liveCasinoSlider" data-slide="next"><img src={skinUrl + TEMPLATE_WEBDIR(SKIN)+"/assets/img/spribe/arr-right.png"} /></a>
                                                </div>
                                            </div>
                                        </div>

                                        <div className="sys-game" onClick={loggato == 0 ? props.login : () => playCasinoGame(41295)}>
                                            <img src={skinUrl + TEMPLATE_WEBDIR(SKIN)+"/assets/img/spribe/aviator-logo.png"} className="game-image hidden" />
                                            <a  className="btn play-now" onClick={loggato == 0 ? props.login : () => playCasinoGame(41295)}>{t('giocaora')}</a>
                                        </div>

                                    </div>
                                </div>
                            </div>
                        </div>
                    </>
                    }

                </main>
            </div>
        </>
    )
}