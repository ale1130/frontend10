import React, { useEffect, useState } from "react";
import { ConvertObjectToArray, CURR_DEVICE, PROVIDERS_LOGO_WEB_PATH, api } from "../constants/global";

import axios from "axios";

import Spinner from 'react-bootstrap/Spinner';
import { ArrowIcon } from "../components/icons";

import "react-slideshow-image/dist/styles.css";
import { Fade } from 'react-slideshow-image';

import { useTranslation } from "react-i18next";

const Providers = (props) =>{

    const [providers, setProviders] = useState(props.providers);
    const SKIN = props.skin;

    var today = + new Date();

    return (

        <>
            <div className="slide-casino">
                {(providers.map(provider =>

                    <div key={provider.id} className="provider providers-list" id="provider-7">
                        <a><img src={PROVIDERS_LOGO_WEB_PATH(SKIN) + provider.img+"?v="+today} className={"provider-" + provider.nome} /></a>
                    </div>
                ))}
            </div>
        </>
        
    )
}

const Slideshow = () => {

    const fadeImages = [
        {
            url: 'https://stagemedia.gamesolutions.org/slideshow/img1_620d0b14e2042.jpeg',
            caption: 'First Slide'
        },
        {
            url: 'https://stagemedia.gamesolutions.org/slideshow/img2_620d0b14e2500.jpeg',
            caption: 'Second Slide'
        },
        {
            url: 'https://stagemedia.gamesolutions.org/slideshow/img1_620d0b14e2042.jpeg',
            caption: 'Third Slide'
        },
    ];

    return (

        <>

            <div className="slide-container">
                <Fade>
                    {fadeImages.map((fadeImage, index) => (

                        <div className="each-fade" key={index}>

                            <div className="image-container">
                                <img src={fadeImage.url} />
                            </div><br />
                        </div>
                        
                    ))}
                </Fade>
            </div>
        </>
    )
}

const Jackpots = (props) => {

    const [jackpots, setJackpots] = useState(props.jackpots);
    const [SKIN, setSkin] = useState(props.skin);

    return (
        <div className="wordCarousel">
            <h1>Jackpot Win</h1>
            <div>
                <ul className="flip5 first-t">
                    <div>{jackpots.map(jackpot => { return(

                        <li>{jackpot.username}<span>{jackpot.win} </span></li>

                    )})}</div>
                </ul>

                <ul className="flip5 second-t">
                    <div>{jackpots.map(jackpot => { return(

                        <li>{jackpot.username}<span>{jackpot.win} </span></li>

                    )})}</div>
                </ul>

                <ul className="flip5 third-t">
                    <div>{jackpots.map(jackpot => { return(

                        <li>{jackpot.username}<span>{jackpot.win} </span></li>

                    )})}</div>
                </ul>

                <ul className="flip5 forty-t">
                    <div>{jackpots.map(jackpot => { return(

                        <li>{jackpot.username}<span>{jackpot.win} </span></li>

                    )})}</div>
                </ul>

                <ul className="flip5 five-t">
                    <div>{jackpots.map(jackpot => { return(

                        <li>{jackpot.username}<span>{jackpot.win} </span></li>

                    )})}</div>
                </ul>

                <ul className="flip5 six-t">
                    <div>{jackpots.map(jackpot => { return(

                        <li>{jackpot.username}<span>{jackpot.win} </span></li>

                    )})}</div>
                </ul>
            </div>
        </div>
    )
}

const Games = (props) => {

    const [games, setGames] = useState(props.games);
    const SKIN = props.skin;

    return (
        <>
            {games.map(game => (
                <div className="square-box-casino">
                    <div className="square-content-casino">
                        <div className="container-casino">
                            <img src={game.thumbnail.replace("http://", "https://")} className="image-casino-icon" />
                            <div className="middle-button">
                                <div className="title-game">{game.name}</div>
                                <a href="#" className="playBut">
                                    <svg version="1.1" x="0px" y="0px" width="80px" height="80px" viewBox="0 0 213.7 213.7" enable-background="new 0 0 213.7 213.7">

                                        <polygon class="triangle" id="XMLID_18_" fill="none" stroke-width="7" stroke-linecap="round" stroke-linejoin="round" stroke-miterlimit="10" points="
	73.5,62.5 148.5,105.8 73.5,149.1 "></polygon>

                                        <circle class="circle" id="XMLID_17_" fill="none" stroke-width="7" stroke-linecap="round" stroke-linejoin="round" stroke-miterlimit="10" cx="106.8" cy="106.8" r="103.3"></circle>
                                    </svg>
                                </a>
                                <img src={PROVIDERS_LOGO_WEB_PATH(SKIN) + game.img} className={"icon-play-casino provider-" + game.name} />
                            </div>
                        </div>
                    </div>
                </div>
            ))}
        </>
    )
}

function Casino(props) {

    const { t, i18n } = useTranslation();

    const SKIN = props.skin;
    const logged = props.isLogged;

    const [loader, setLoader] = useState(0);
    const [jackpots, setJackpots] = useState(["empty"]);

    const [providers, setProviders] = useState(["empty"]);
    
    /*const [games, setGames] = useState(["empty"]);
    const [numeroGiochi, setNumeroGiochi] = useState(0);
    const [subcategories, setSubcategories] = useState(["empty"]);*/

    const [page, setPage] = useState(0);
    const [maxPage, setMaxPage] = useState(0);

    /*const range = 45;*/

    const GetProviders = async () => {

        const loggato = logged ? 1 : 0;

        try {

            const data = await api
            .get('rest/getproviders/:'+loggato+'/')
            .then(response => {
    
                if(response.data.status=="ok"){

                    setProviders(response.data.dati);

                }else if(response.data.status=="error"){
                    
                    setProviders(["norecords"])
                }else{

                    alert(t('erroregenerico'));
                }
            })

        } catch (e) {

            alert(t('erroregenerico'));  
            console.log(e);
        }
    }

    const GetJackpotsWin = async () => {

        try {

            const data = await api
            .get('rest/getjackpotswinner/')
            .then(response => {
    
                if(response.data.status=="ok"){

                    setJackpots(response.data.dati);

                }else if(response.data.status=="error"){
                    
                    setJackpots(["norecords"])
                }else{

                    alert(t('erroregenerico'));
                }
            })

        } catch (e) {

            alert(t('erroregenerico'));  
            console.log(e);
        }
    }

    /*const GetGames = async () => {

        var stringaLog = "";

        if (!logged) {
            stringaLog = " AND providers.hide_guest = 0"
        }

        var stringa = `SELECT games.*, providers.img, providers.name as nome_provider FROM games 
       LEFT JOIN providers ON providers.id = games.provider_id
       JOIN skins_providers ON skins_providers.provider_id = providers.id
       LEFT JOIN gamesubcategories_assoc ON gamesubcategories_assoc.game_id = games.id
       WHERE skins_providers.view = 1 AND games.category_id = 1 AND skins_providers.skin_id = `+ SKIN["id"] + ` AND providers.hide_games = 0 AND games.enabled = 1 AND games.is_desktop = 1 ` + stringaLog + ` GROUP BY games.id ORDER BY games.priority DESC, games.plays DESC`;

        try {
            const data = await axios
            .post('http://localhost:3001/getcasinogames',{ query : stringa})
            .then(response => {  

                if(response.data.err){
                    console.log(response.data.err)
                    alert(t('erroregenerico'));  
                }else if(response.data.message){
                    setGames(["nothingFound"]);
                }else{
                    setGames(response.data);
                }

            })
        }catch (e){

            alert(t('erroregenerico'));  
            console.log(e);
        }
    }

    const GetSubCategories = async () => {

        var substringaLoggato = "";

        if (!logged) {
            substringaLoggato = " AND providers.hide_guest = 0"
        }

        var substringaDevice = "";

        if (CURR_DEVICE == "MOBILE") {
            substringaDevice = " AND games.is_mobile = 1";
        } else {
            substringaDevice = " AND games.is_desktop = 1";
        }

        var stringa = `SELECT gamesubcategories.*, (SELECT COUNT(DISTINCT games.id) FROM gamesubcategories_assoc 
        JOIN games ON games.id = gamesubcategories_assoc.game_id 
        JOIN providers ON providers.id = games.provider_id
        JOIN skins_providers ON skins_providers.provider_id = providers.id
        WHERE games.enabled = 1 and skins_providers.skin_id = `+ SKIN["id"] + ` and skins_providers.view = 1 and gamesubcategories_assoc.subcategory_id = gamesubcategories.id ` + substringaLoggato + ` ` + substringaDevice + `) as totale
        FROM gamesubcategories 
        WHERE gamesubcategories.category_id = 1  
        and 
        (SELECT COUNT(DISTINCT games.id) FROM gamesubcategories_assoc 
        LEFT JOIN games ON games.id = gamesubcategories_assoc.game_id 
        LEFT JOIN providers ON providers.id = games.provider_id
        JOIN skins_providers ON skins_providers.provider_id = providers.id
        WHERE games.enabled = 1 and skins_providers.skin_id = `+ SKIN["id"] + ` and skins_providers.view = 1 and gamesubcategories_assoc.subcategory_id = gamesubcategories.id and skins_providers.skin_id = ` + SKIN["id"] + ` ` + substringaLoggato + ` ` + substringaDevice + `) >0 ORDER BY gamesubcategories.priority DESC`;

        try {
            const data = await axios
            .post('http://localhost:3001/getcasinosubcategories',{ query : stringa})
            .then(response => {  

            if(response.data.err){
                alert(t('erroregenerico'));  
            }else if(response.data.message){
                setSubcategories(["nothingFound"]);
            }else{
                setSubcategories(response.data);
            }

                })
        } catch (e) {

            alert(t('erroregenerico'));  
            console.log(e);
        }
    }*/

    useEffect(() => {
        GetProviders();
        GetJackpotsWin();
        /*GetGames();
        GetSubCategories();*/
    }, [])

    
    useEffect(() => {

        if (jackpots != "empty") {

            setLoader(loader + 1);
        }
    }, [jackpots])
    
    useEffect(() => {
        if (providers != "empty") {

            setLoader(loader + 1);
        }
    }, [providers])

   /* useEffect(() => {
        if (games != "empty") {

            if (games != "nothingFound") {
                const arrUtilizzo = ConvertObjectToArray(games);
                setNumeroGiochi(arrUtilizzo.length);
                setMaxPage(Math.round(arrUtilizzo.length / 45));
            }

            setLoader(loader + 1);
        }
    }, [games])

    /*useEffect(() => {
        if (subcategories != "empty") {

            setLoader(loader + 1);
        }
    }, [subcategories])*/

    /*const handlePage = () => {
        if (page < maxPage) {
            setPage(page + 1);
        }
    }*/

    return (
        <>

            {loader <2 ?

                <>
                    <Spinner animation="border" role="status">
                        <span className="visually-hidden">Loading...</span>
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

                    <Slideshow />

                    {providers == "nothingFound" ?


                        <div>Ci dispiace ma al momento non è stato possibile indivisuare nessun provider e/o gioco pe questa sezione, si prega di riprovare più tardi o di conttattare l'assistenza tecnica</div>

                        :

                        <Providers providers={providers} skin={SKIN} />
                    }
                </>
            }
        </>
    )
}

export default Casino;


