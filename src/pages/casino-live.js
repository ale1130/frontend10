import axios from "axios";
import React, { useState } from "react";
import { useEffect } from "react";
import { CasinoFrame } from "../components/iframecasino";
import { Loader } from "../components/spinner";
import { api, convertToFormdata, LOBBIES_LOGO_WEB_PATH, skinUrl, TEMPLATE_WEBDIR } from "../constants/global";

import { useTranslation } from "react-i18next";

import '../styles/casino-live.css';

function CasinoLive(props) {

    const [loader, setLoader] = useState(true);

    const { t, i18n } = useTranslation();

    const SKIN = props.skin;
    const USER = props.user;

    const loggato = props.islogged ? 1 : 0;

    const [lobbies, setLobbies] = useState(['empty']);

    const [statoGame, setStatoGame] = useState(false);
    const [game, setGame] = useState("empty");

    const getLobbies = async () => {

        try {

            const data = await api
                .get('rest/getskinlobbies/')
                .then(response => {

                    if (response.data.status == "ok") {

                        setLobbies(response.data.dati);

                    } else if (response.data.status == "error") {

                        setLobbies(["nolobbies"])
                    } else {

                        alert(t('erroregenerico'));
                    }
                })

        } catch (e) {

            alert(t('erroregenerico'));
            console.log(e);
        }
    }

    useEffect(() => {
        getLobbies();
    }, [])

    useEffect(() => {
        if (lobbies != "empty") {
            setLoader(false);
        }
    }, [lobbies])

    const playCasinoGameLobby = async (id) => {

        const dati = { "id": id, "user_id": USER["id"] }

        try {

            const data = await axios
                ({
                    method: "post",
                    url: skinUrl + "rest/playgame-casino-lobby.php",
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

            {!loader ? <>

                {<CasinoFrame close={() => setStatoGame(false)} statoGame={statoGame} game={game} />}

                <div className="container-fluid body-content slider-height">
                    <main id="turbogamePage2" className="container-starss">

                        <div className="starss"></div>

                        <div id="pageConten2t" className="opened">
                            <div id="turbogameBoxes2">

                                <div className="container">

                                    <img src={skinUrl + TEMPLATE_WEBDIR(SKIN) + "/assets/img/casino-live/casino-live-2.png"} className="img-lobby-p" />
                                    <h2>{t('casinolive')}</h2>
                                    <div className="box box-2">
                                        <div className="box-content">

                                            {
                                                lobbies.length > 0 && lobbies != "nolobbies" ?

                                                    <>
                                                        {lobbies.map(lobby => {
                                                            return (


                                                                <div className='sys-game'>
                                                                    <a onClick={loggato == 0 ? props.login : () => playCasinoGameLobby(lobby.id)}>
                                                                        <img src={LOBBIES_LOGO_WEB_PATH(SKIN) + lobby.img + "?v=111"} className='game-image' />
                                                                    </a>
                                                                </div>


                                                            )
                                                        })}

                                                    </>

                                                    :

                                                    <>
                                                        <div>Ci dispiace ma al momento non ?? stato possible individuare nessuna lobbby di gioco nella sezione casino-virtual si prega di attendere e riprovare pi?? tardi, se ritieni che si tratti di un nostro errore ti preghiamo di conttare l'assistenza tecnica</div>
                                                    </>
                                            }

                                        </div>
                                    </div>
                                </div>

                            </div>
                        </div>
                    </main>
                </div>
            </>

                :

                <>
                    <Loader />
                </>

            }
        </>
    )
}

export default CasinoLive;


