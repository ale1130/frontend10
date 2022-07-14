import { convertToFormdata, skinUrl, TEMPLATE_WEBDIR } from "../constants/global"
import React from "react";
import { CasinoFrame } from "../components/iframecasino";
import { useState } from "react";
import { useEffect } from "react";
import axios from "axios";

export const Aviator = (props) =>{

    const SKIN = props.skin

    const logged = props.islogged;
    const loggato = logged ? 1 : 0;

    const USER = props.user;

    const [statoGame, setStatoGame] = useState(false);
    const [game, setGame] = useState("empty");

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

    return(
        <>
            {<CasinoFrame close={() => setStatoGame(false)} statoGame={statoGame} game={game} />}

            <div className="container-fluid body-content slider-height">
                <main id="turbogamePage">
                    <div id="pageContent" className="opened">
                        <div id="turbogameBoxes">
                            <div className="container">
                            
                                <div className="box box-1">
                                    <div className="box-content">
                                        <div className="sys-game mb-4">
                                            
                                            <img src={skinUrl+TEMPLATE_WEBDIR(SKIN)+"/assets/img/spribe/aviator-logo.png"} className="game-image" />
                
                                            <a  className="btn play-now" onClick={loggato == 0 ? props.login : () => playCasinoGame(41295)}>Gioca ora</a>
                                            <span>Moltiplica i tuoi guadagni man mano che il tuo Aviator aumenta</span>
                                        </div>
                                        <a  id="howToPlayAviatorBtn" className="btn">Come si gioca al gioco Aviator</a>
                                    </div>
                                </div>
                                
                                <div className="box box-2">
                                    <div className="box-content">
                                        <div className="sys-game" onClick={loggato == 0 ? props.login : () => playCasinoGame(41294)}>
                                            
                                            <img src={skinUrl+TEMPLATE_WEBDIR(SKIN)+"/assets/img/spribe/dice.png"} className="game-image" />
                                        </div>
                                        <div className="sys-game" onClick={loggato == 0 ? props.login : () => playCasinoGame(41293)}>
                                            
                                            <img src={skinUrl+TEMPLATE_WEBDIR(SKIN)+"/assets/img/spribe/goal.png"} className="game-image" />
                                        </div>
                                        <div className="sys-game" onClick={loggato == 0 ? props.login : () => playCasinoGame(41290)}>
                                            
                                            <img src={skinUrl+TEMPLATE_WEBDIR(SKIN)+"/assets/img/spribe/hi-lo.png"} className="game-image" />
                                        </div>
                                        <div className="sys-game" onClick={loggato == 0 ? props.login : () => playCasinoGame(41289)}>
                                            
                                            <img src={skinUrl+TEMPLATE_WEBDIR(SKIN)+"/assets/img/spribe/keno.png"} className="game-image" />
                                        </div>
                                        <div className="sys-game" onClick={loggato == 0 ? props.login : () => playCasinoGame(41291)}>
                                            
                                            <img src={skinUrl+TEMPLATE_WEBDIR(SKIN)+"/assets/img/spribe/mines.png"} className="game-image" />
                                        </div>
                                        <div className="sys-game" onClick={loggato == 0 ? props.login : () => playCasinoGame(41288)}>
                                            
                                            <img src={skinUrl+TEMPLATE_WEBDIR(SKIN)+"/assets/img/spribe/miniroulette.png"} className="game-image" />
                                        </div>
                                        <div className="sys-game"  onClick={loggato == 0 ? props.login : () => playCasinoGame(41292)}>
                                            
                                            <img src={skinUrl+TEMPLATE_WEBDIR(SKIN)+"/assets/img/spribe/plinko.png"} className="game-image" />
                                        </div>
                                    </div>
                                </div>
                                
                            </div>
                        </div>
                    </div>
                </main>
            </div>
        </>
    )
}