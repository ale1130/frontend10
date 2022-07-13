import React, { useEffect, useState } from "react";
import { PROVIDERS_LOGO_WEB_PATH, api, skinUrl, convertToFormdata, ConvertObjectToArraySlideshow, MEDIA_SLIDESHOWS_WEB_PATH } from "../constants/global";

import Spinner from 'react-bootstrap/Spinner';

import "react-slideshow-image/dist/styles.css";
import { Fade } from 'react-slideshow-image';

import axios from "axios";

import { useTranslation } from "react-i18next";
import { ArrowIcon } from "../components/icons";
import { SlickSlider } from "../components/SlickSlider";
import { CasinoFrame } from "../components/iframecasino";

const Jackpots = (props) => {

    const [jackpots, setJackpots] = useState(props.jackpots);

    const SKIN = props.skin;

    const jackpot1 = SKIN["jackpot_1"];
    const jackpot2 = SKIN["jackpot_2"];
    const jackpot3 = SKIN["jackpot_3"];

    return (

        <>
            <div className="row">
                <div className="col-12">
                    <div className="jackpot">
                        <div className="jackpot-div-mini">
                            <span>Bronze jackpot</span>
                            <strong id="jackpot_silver">{jackpot1}</strong>


                        </div>
                        <div className="jackpot-div-super">

                            <span>Silver jackpot</span>
                            <strong id="jackpot_bronze">{jackpot2}</strong>

                        </div>
                        <div className="jackpot-div-mega">
                            <span>Gold jackpot</span>
                            <strong id="jackpot_gold">{jackpot3}</strong>

                        </div>
                    </div>
                </div>
                <div className="col-12">
                    <div className="wordCarousel">
                        <h1>Jackpot Win</h1>
                        <div>
                            <ul className="flip5 first-t">
                                {jackpots.map(jackpot => {
                                    return (

                                        <li>{jackpot.username}<span>{jackpot.win} </span></li>

                                    );
                                })}
                            </ul>

                            <ul className="flip5 second-t">
                                {jackpots.map(jackpot => {
                                    return (

                                        <li>{jackpot.username}<span>{jackpot.win} </span></li>

                                    );
                                })}
                            </ul>

                            <ul className="flip5 third-t">
                                {jackpots.map(jackpot => {
                                    return (

                                        <li>{jackpot.username}<span>{jackpot.win} </span></li>

                                    );
                                })}
                            </ul>

                            <ul className="flip5 forty-t">
                                {jackpots.map(jackpot => {
                                    return (

                                        <li>{jackpot.username}<span>{jackpot.win} </span></li>

                                    );
                                })}
                            </ul>

                            <ul className="flip5 five-t">
                                {jackpots.map(jackpot => {
                                    return (

                                        <li>{jackpot.username}<span>{jackpot.win} </span></li>

                                    );
                                })}
                            </ul>

                            <ul className="flip5 six-t">
                                {jackpots.map(jackpot => {
                                    return (

                                        <li>{jackpot.username}<span>{jackpot.win} </span></li>

                                    );
                                })}
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

const Providers = (props) => {

    const [providers, setProviders] = useState(props.providers);
    const SKIN = props.skin;

    const currentProvider = props.currentProv;
    const setData = props.setinput;

    const handleProvider = (dato) => {
        setData(inputs => ({ ...inputs, "provider": dato, "subcategory": "", "page": 1 }));
    }

    var today = + new Date();

    return (

        <>
            <div className="slide-casino">
                {(providers.map(provider =>

                    <div key={provider.id} className={currentProvider && currentProvider == provider.id ? "provider providers-list active" : "provider providers-list"} id={"provider-" + provider.id}>
                        <a onClick={() => handleProvider(provider.id)}><img src={PROVIDERS_LOGO_WEB_PATH(SKIN) + provider.img + "?v=" + today} className={"provider-" + provider.nome} /></a>
                    </div>
                ))}

                <div className="box-search" id="trigger-overlay">
                    <div className="container-s">
                        <div className="search"></div>
                    </div>
                </div>
            </div>

        </>

    )
}

/*const Slideshow = (props) => {

    const { t } = useTranslation();

    const logged = props.loggato;

    const SKIN = props.skin;

    const fadeImages = ConvertObjectToArraySlideshow(props.images[0]);

    return (

        <>
            <div className="slide-container">
                <Fade>
                    {fadeImages.map((fadeImage, index) => (

                        <div className="each-fade" key={index}>

                            <div className="image-container">
                                <img src={MEDIA_SLIDESHOWS_WEB_PATH(SKIN) + fadeImage.url} />
                                <div className="button-adv">
                                    {!logged && <><a href="#" onClick={props.login} className="botton-adv-1">{t('accedi')}</a></>}
                                </div>
                            </div><br />
                        </div>

                    ))}
                </Fade>
            </div>
        </>
    )
}*/

const TypoGiochi = (props) => {

    const countGiochi = props.countGames;
    const subCategories = props.subCateories;

    const currentSubcategory = props.currentSub;
    const setData = props.setinput;

    const handleCategory = (dato) => {
        setData(inputs => ({ ...inputs, "subcategory": dato, "provider": "", "page": 1 }));
    }

    return (
        <div className="container-fluid">
            <div className="row">
                <div className="col-lg-12 col-sm-12 list-type-play">
                    <div className="position-sticky ">

                        <div className={currentSubcategory && currentSubcategory == "all" ? "pul-type-play games-subcategory active" : "pul-type-play games-subcategory"} id="subcategory-0">
                            <a onClick={() => handleCategory("all")} > Tutti i giochi <span>{countGiochi}</span></a>
                        </div>

                        {subCategories != "nosubcategories" ?

                            <>{(subCategories.map(subcategory =>

                                <div key={subcategory.id} className={currentSubcategory && currentSubcategory == subcategory.id ? "pul-type-play games-subcategory active" : "pul-type-play games-subcategory"} id={"subcategory-" + subcategory.id}>
                                    <a onClick={() => handleCategory(subcategory.id)} > {subcategory.name} <span> {subcategory.totale} </span></a>
                                </div>
                            ))}</>

                            :

                            <></>
                        }

                    </div>
                </div>
            </div>
        </div>
    )
}

const Games = (props) => {

    const games = props.games;
    const SKIN = props.skin;

    const user_id = props.user;

    const loggato = props.loggato ? 1 : 0;

    const [statoGame, setStatoGame] = useState(false);
    const [game, setGame] = useState("empty");

    const playCasinoGame = async (id) => {

        const dati = { "id": id, "user_id": user_id }

        try {

            const data = await axios
                ({
                    method: "post",
                    url: skinUrl + "rest/playgame-casino.php",
                    data: convertToFormdata(dati)
                })
                .then(response => {

                    console.log(response)

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
        if (game != "empty") {

            setStatoGame(true);
        } else if (game == "error") {

            alert("errore tecnico durante l'apertura del GeolocationCoordinates, si prega di riprovare o di contattare l'assistenza tecnica")
        }
    }, [game])

    return (
        <>
            {games != "nogames" ?

                <>

                    {<CasinoFrame close={() => setStatoGame(false)} statoGame={statoGame} game={game} />}
                    <div className="container-fluid">
                        <div className="row">
                            <div className="col-lg-12 col-sm-12">
                                {games.map(game => (
                                    <div className="square-box-casino" key={game.id}>
                                        <div className="square-content-casino">
                                            <div className="container-casino">
                                                <img src={game.thumbnail.replace("http://", "https://")} className="image-casino-icon" />
                                                <div className="middle-button">
                                                    <div className="title-game">{game.name}</div>
                                                    <a className="playBut" onClick={loggato == 0 ? props.login : () => playCasinoGame(game.id)}>
                                                        <svg version="1.1" x="0px" y="0px" width="80px" height="80px" viewBox="0 0 213.7 213.7" enableBackground="new 0 0 213.7 213.7">

                                                            <polygon className="triangle" id="XMLID_18_" fill="none" strokeWidth="7" strokeLinecap="round" strokeLinejoin="round" strokeMiterlimit="10" points="73.5,62.5 148.5,105.8 73.5,149.1 "></polygon>

                                                            <circle className="circle" id="XMLID_17_" fill="none" strokeWidth="7" strokeLinecap="round" strokeLinejoin="round" strokeMiterlimit="10" cx="106.8" cy="106.8" r="103.3"></circle>
                                                        </svg>
                                                    </a>
                                                    <img src={PROVIDERS_LOGO_WEB_PATH(SKIN) + game.img} className={"icon-play-casino provider-" + game.name} />
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </>

                :

                <><div><h2 className="nogames">Non abbiamo trovato giochi con questa ricerca...</h2></div></>
            }
        </>
    )
}

function Casino(props) {

    const { t, i18n } = useTranslation();

    const SKIN = props.skin;
    const logged = props.isLogged;

    const USER = props.user;

    const [loader, setLoader] = useState(0);
    const [jackpots, setJackpots] = useState(["empty"]);

    const [slideShow, setSlideShow] = useState(["empty"]);

    const [providers, setProviders] = useState(["empty"]);
    const [countGames, setCountGames] = useState(1111111111);

    const [subCategories, setSubCategories] = useState(["empty"]);

    const [games, setGames] = useState(["empty"]);

    const [maxPage, setMaxPage] = useState(0);

    const [inputs, setInputs] = useState({ "logged": logged ? 1 : 0, "category": 1, "provider": "", "subcategory": "all", "search": "", "page": 1 });

    const [loaderGames, setLoaderGames] = useState(true);

    const openLogin = props.childModalButton;

    const handleChange = (event) => {
        const name = event.target.name;
        const value = event.target.value;

        setInputs(inputs => ({ ...inputs, [name]: value }))
    }

    const GetJackpotsWin = async () => {

        try {

            const data = await api
                .get('rest/getjackpotswinner/')
                .then(response => {

                    if (response.data.status == "ok") {

                        setJackpots(response.data.dati);

                    } else if (response.data.status == "error") {

                        setJackpots(["norecords"])
                    } else {

                        alert(t('erroregenerico'));
                    }
                })

        } catch (e) {

            alert(t('erroregenerico'));
            console.log(e);
        }
    }

    const GetSlideshow = async () => {

        const loggato = logged ? 1 : 0;

        try {

            const data = await api
                .get('rest/getslideshowimg/:' + loggato + '/')
                .then(response => {

                    if (response.data.status == "ok") {

                        setSlideShow(response.data.dati);

                    } else if (response.data.status == "error") {

                        setSlideShow(["noslideshow"])
                    } else {

                        alert(t('erroregenerico'));
                    }
                })

        } catch (e) {

            alert(t('erroregenerico'));
            console.log(e);
        }
    }

    const GetProviders = async () => {

        const loggato = logged ? 1 : 0;

        try {

            const data = await api
                .get('rest/getproviders/:' + loggato + '/')
                .then(response => {

                    if (response.data.status == "ok") {

                        setProviders(response.data.dati);

                    } else if (response.data.status == "error") {

                        setProviders(["noproviders"])
                    } else {

                        alert(t('erroregenerico'));
                    }
                })

        } catch (e) {

            alert(t('erroregenerico'));
            console.log(e);
        }
    }

    const GetCountGames = async () => {

        const loggato = logged ? 1 : 0;

        try {

            const data = await api
                .get('rest/getgamescount/:' + loggato + '/')
                .then(response => {

                    if (response.data.status == "ok") {

                        setCountGames(response.data.dati["count_games"]);

                    } else if (response.data.status == "error") {

                        setCountGames(0)
                    } else {

                        alert(t('erroregenerico'));
                    }
                })

        } catch (e) {

            alert(t('erroregenerico'));
            console.log(e);
        }
    }

    const GetSubCategories = async () => {

        const loggato = logged ? 1 : 0;

        try {

            const data = await api
                .get('rest/getsubcategories/:' + loggato + '/')
                .then(response => {

                    if (response.data.status == "ok") {

                        setSubCategories(response.data.dati);

                    } else if (response.data.status == "error") {

                        setSubCategories(["nosubcategories"])
                    } else {

                        alert(t('erroregenerico'));
                    }
                })

        } catch (e) {

            alert(t('erroregenerico'));
            console.log(e);
        }
    }

    const GetGames = async () => {

        try {

            const data = await axios
                ({
                    method: "post",
                    url: skinUrl + "rest/getgamescasino.php",
                    data: convertToFormdata(inputs)
                })
                .then(response => {

                    if (response.data.status == "ok") {

                        setMaxPage(response.data.total_pages);

                        setGames(response.data.games);

                    } else if (response.data.status == "nogames") {

                        setLoaderGames(false)

                        setGames("nogames");

                        setMaxPage(0);
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

        //==3
        GetJackpotsWin();
        GetSlideshow();
        GetProviders();



        GetCountGames();
        GetSubCategories();
        GetGames();
    }, [logged]);

    useEffect(() => {

        if (jackpots != "empty") {

            setLoader(loader + 1);
        }
    }, [jackpots])

    useEffect(() => {

        if (slideShow != "empty") {

            setLoader(loader + 1);
        }
    }, [slideShow])

    useEffect(() => {
        if (providers != "empty") {

            setLoader(loader + 1);
        }
    }, [providers])

    //==3

    useEffect(() => {
        if (countGames != 1111111111) {

            setLoader(loader + 1);
        }
    }, [countGames])

    useEffect(() => {

        if (subCategories != "empty") {

            setLoader(loader + 1);
        }
    }, [subCategories])

    useEffect(() => {

        if (games != "empty") {

            setLoader(loader + 1);

            setLoaderGames(false);
        }
    }, [games])

    useEffect(() => {

        if (games != "empty") {

            setLoaderGames(true);

            GetGames();
        }
    }, [inputs])

    useEffect(() => {
        if (loaderGames == false) {

            if (inputs.page != 1) {
                window.scrollTo(0, 2000 * inputs.page);
            }
        }
    }, [loaderGames])

    const handlePage = () => {
        if (inputs.page < maxPage) {

            setInputs(inputs => ({ ...inputs, "page": inputs.page + 1 }));
        }
    }

    return (
        <>

            {loader < 6 ?

                <>
                    <Spinner animation="border" role="status">
                        <span>Loading...</span>
                    </Spinner>
                </>

                :

                <>
                    <div className="container-fluid body-content slider-height">

                        {jackpots != "norecords" && logged && SKIN["jackpot"] == 1 ?


                            <Jackpots jackpots={jackpots} skin={SKIN} />

                            :

                            <></>
                        }
                    </div>

                    {slideShow != "noslideshow" ?

                        <>{<SlickSlider images={slideShow} loggato={logged} skin={SKIN} login={() => openLogin()} />}</>

                        :

                        <></>
                    }

                    {providers != "noproviders" && countGames != 0 ?

                        <>
                            {<input type="text" className="form-control margin-bottom-5" value={inputs.search || ""} onChange={handleChange} id="search" name="search" placeholder={"Digit game name"} />}

                            <Providers providers={providers} skin={SKIN} setinput={setInputs} currentProv={inputs.provider} />

                            <TypoGiochi countGames={countGames} subCateories={subCategories} setinput={setInputs} currentSub={inputs.subcategory} />

                            {loaderGames ?

                                <>
                                    <Spinner animation="border" role="status">
                                        <span className="visually-hidden">Loading...</span>
                                    </Spinner>
                                </>

                                :
                                <>
                                    {games.length > 0 ? <Games user={USER["id"]} skin={SKIN} games={games} loggato={logged} login={() => openLogin()} /> : <div>Non abbiamo trovato giochi con questa ricerca...</div>}
                                </>
                            }



                            {maxPage > 1 && inputs.page < maxPage ?

                                <>
                                    <div className="container-fluid">
                                        <div className="row">
                                            <div className="col-12">
                                                <div className="show-all-p">
                                                    <a onClick={() => handlePage()} id="loadNextPageLink">
                                                        <ArrowIcon />
                                                        Carica altri giochi</a>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </>

                                :

                                <></>
                            }
                        </>

                        :

                        <div><h2 className="nogames">Ci dispiace ma al momento non è stato possibile individuare nessun provider e/o gioco per questa sezione, si prega di riprovare più tardi o di conttattare l'assistenza tecnica</h2></div>

                    }
                </>
            }
        </>
    )
}

export default Casino;


