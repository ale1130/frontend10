import axios from "axios";
import React, { useState } from "react";
import { useEffect } from "react";
import { CasinoFrame } from "../components/iframecasino";
import { Loader } from "../components/spinner";
import { api, convertToFormdata, PROVIDERS_LOGO_WEB_PATH, skinUrl, TEMPLATE_WEBDIR } from "../constants/global";

import { useTranslation } from "react-i18next";

function Virtual(props) {

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
                .get('rest/getvirtuallobbies/:' + loggato + '/')
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

    const playVirtualGameLobby = async (id) => {

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

            {!loader ? <>

                {<CasinoFrame close={() => setStatoGame(false)} statoGame={statoGame} game={game} />}

                <div className="container-fluid body-content slider-height">
                    <main id="turbogamePage2" className="container-starss">

                        <div className="starss"></div>

                        <div id="pageContent2" className="opened">
                            <div id="turbogameBoxes2">

                                <div className="container">

                                    <img src={skinUrl + "/templates/acqua/assets/img/virtual/sports-big-2.png"} className="img-lobby-p" />

                                    <h2>Virtual</h2>

                                    <div className="box box-2">
                                        <div className="box-content">

                                            {lobbies.length > 0 && lobbies != "nolobbies" ?

                                                <>
                                                    {lobbies.map(lobby => {
                                                        return (

                                                            <div className='sys-game'>

                                                                <a onClick={loggato == 1 ? () => playVirtualGameLobby(lobby.id) : props.login} className="playBut">
                                                                    <img src={lobby.url} className="game-image" />
                                                                </a>


                                                            </div>


                                                        )
                                                    })}
                                                </>

                                                :

                                                <>
                                                    <div>Ci dispiace ma al momento non è stato possible individuare nessuna lobbby di gioco nella sezione casino-virtual si prega di attendere e riprovare più tardi, se ritieni che si tratti di un nostro errore ti preghiamo di conttare l'assistenza tecnica</div>
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

export default Virtual;


