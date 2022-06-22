import React, { useEffect, useState } from "react";
import {ConvertObjectToArray, CURR_DEVICE, PROVIDERS_LOGO_WEB_PATH} from "../constants/global";

import axios from "axios";

import Spinner from 'react-bootstrap/Spinner';
import { ArrowIcon } from "../components/icons";

import "react-slideshow-image/dist/styles.css";
import { Fade } from 'react-slideshow-image';

import { useTranslation } from "react-i18next";

const Providers = (props) =>{

    const [providers, setProviders] = useState(props.providers);
    const SKIN = props.skin;

    return(

        <><div className="slide-casino">
            {(providers.map(provider =>

                <div key={provider.id} className="provider providers-list" id="provider-7">
                    <a><img src={PROVIDERS_LOGO_WEB_PATH(SKIN)+provider.img} className={"provider-"+provider.nome} /></a>
                </div>   
            ))}
        </div></>
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
    )
}

const Jackpots = (props) =>{

    const [jackpots, setJackpots] = useState(props.jackpots);
    const [SKIN, setSkin] = useState(props.skin);

    return (
        <div className="wordCarousel">
            <h1>Jackpot Win</h1>
            <div>
                <ul className="flip5 first-t">
                    <div>{jackpots.map(jackpot => 
                        
                        <li>{jackpot.username.replaceAt(jackpot.username.length/2, "*****")}<span>{jackpot.win.toFixed(2)+" "+SKIN["currency"]} </span></li>
                        
                    )}</div>
                </ul>

                <ul className="flip5 second-t">
                    <div>{jackpots.map(jackpot => 
                        
                        <li>{jackpot.username.replaceAt(jackpot.username.length/2, "*****")}<span>{jackpot.win.toFixed(2)+" "+SKIN["currency"]} </span></li>
                        
                    )}</div>
                </ul>

                <ul className="flip5 third-t">
                    <div>{jackpots.map(jackpot => 
                        
                        <li>{jackpot.username.replaceAt(jackpot.username.length/2, "*****")}<span>{jackpot.win.toFixed(2)+" "+SKIN["currency"]} </span></li>
                        
                    )}</div>
                </ul>
                
                <ul className="flip5 forty-t">
                    <div>{jackpots.map(jackpot => 
                        
                        <li>{jackpot.username.replaceAt(jackpot.username.length/2, "*****")}<span>{jackpot.win.toFixed(2)+" "+SKIN["currency"]} </span></li>
                        
                    )}</div>
                </ul>
                
                <ul className="flip5 five-t">
                    <div>{jackpots.map(jackpot => 
                        
                        <li>{jackpot.username.replaceAt(jackpot.username.length/2, "*****")}<span>{jackpot.win.toFixed(2)+" "+SKIN["currency"]} </span></li>
                        
                    )}</div>
                </ul>
                
                <ul className="flip5 six-t">
                    <div>{jackpots.map(jackpot => 
                        
                        <li>{jackpot.username.replaceAt(jackpot.username.length/2, "*****")}<span>{jackpot.win.toFixed(2)+" "+SKIN["currency"]} </span></li>
                        
                    )}</div>
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
            {games.map(game =>(
                <div className="square-box-casino">
                    <div className="square-content-casino">
                        <div className="container-casino">
                            <img src={game.thumbnail.replace("http://", "https://")} className="image-casino-icon" />
                            <div className="middle-button">
                                <div className="title-game">{game.name}</div>
                                <a href="#" className="playBut">
                                    gioca
                                </a>
                                <img src={PROVIDERS_LOGO_WEB_PATH(SKIN)+game.img} className={"icon-play-casino provider-"+game.name}/>
                            </div>
                        </div>
                    </div>
                </div>
            ))}
        </>
    )
}

String.prototype.replaceAt = function(index, replacement) {
    return this.substring(0, index) + replacement;
}

function Casino (props){

    const { t, i18n } = useTranslation();

    const SKIN = props.skin;
    const logged = props.isLogged;

    const [loader, setLoader] = useState(0);

    const [providers, setProviders] = useState(["empty"]);
    const [jackpots, setJackpots] = useState(["empty"]);
    const [games, setGames] = useState(["empty"]);
    const [numeroGiochi, setNumeroGiochi] = useState(0);
    const [subcategories, setSubcategories] = useState(["empty"]);

    const [page, setPage] = useState(1);
    const [maxPage, setMaxPage] = useState(1);

    const range = 45;

    const getProviders = async () =>{

        var substringa1 = "";

        if(!logged){
            substringa1 = " AND providers.hide_guest = 0"
        }

        var substringa2 = "";

        if(CURR_DEVICE=="MOBILE"){
            substringa2 = " AND games.is_mobile = 1";
        }else{
            substringa2 = " AND games.is_desktop = 1";
        }

        var stringa = "SELECT providers.* FROM games LEFT JOIN providers ON providers.id = games.provider_id JOIN skins_providers ON skins_providers.provider_id = providers.id";

        stringa += " WHERE skins_providers.skin_id = "+SKIN["id"]+" AND providers.stato = 1 AND skins_providers.view = 1 AND games.enabled = 1 AND games.category_id = 1 AND providers.name <> 'EvolutionX' AND providers.name <> 'EvolutionY' AND providers.name <> 'EvolutionZ' AND providers.special_provider = 0 "+substringa1+substringa2+" GROUP BY providers.id ORDER BY skins_providers.priority DESC, providers.name ASC";

        try{
            const data = await axios
            .post('http://localhost:3001/getproviders',{ query : stringa})
            .then(response => {  

                if(response.data.err){
                    alert(t('erroregenerico'));  
                }else if(response.data.message){
                    setProviders(["nothingFound"]);
                }else{
                    setProviders(response.data);
                }

            })
        }catch (e){

            alert(t('erroregenerico'));  
            console.log(e);
        }
    }

    const GetJackpotsWin = async () =>{

        var stringa = "SELECT users.username as username, jackpots_win.win_amount as win FROM jackpots_win LEFT JOIN users on users.id=jackpots_win.user_id LEFT JOIN skins on users.skin_id=skins.id WHERE skins.id="+SKIN["id"];

        try{
            const data = await axios
            .post('http://localhost:3001/getjackpotswin',{ query : stringa})
            .then(response => {  

                if(response.data.err){
                    alert(t('erroregenerico'));  
                }else if(response.data.message){
                    setJackpots(["nothingFound"]);
                }else{
                    setJackpots(response.data);
                }

            })
        }catch (e){

            alert(t('erroregenerico'));  
            console.log(e);
        }
    }

    const GetGames = async () =>{

        var stringaLog = "";

        if(!logged){
            stringaLog = " AND providers.hide_guest = 0"
        }

       var stringa = `SELECT games.*, providers.img, providers.name as nome_provider FROM games 
       LEFT JOIN providers ON providers.id = games.provider_id
       JOIN skins_providers ON skins_providers.provider_id = providers.id
       LEFT JOIN gamesubcategories_assoc ON gamesubcategories_assoc.game_id = games.id
       WHERE skins_providers.view = 1 AND games.category_id = 1 AND skins_providers.skin_id = `+SKIN["id"]+` AND providers.hide_games = 0 AND games.enabled = 1 AND games.is_desktop = 1 `+stringaLog+` GROUP BY games.id ORDER BY games.priority DESC, games.plays DESC`;

        try{
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

    const GetSubCategories = async () =>{

        var substringaLoggato = "";

        if(!logged){
            substringaLoggato = " AND providers.hide_guest = 0"
        }

        var substringaDevice = "";

        if(CURR_DEVICE=="MOBILE"){
            substringaDevice = " AND games.is_mobile = 1";
        }else{
            substringaDevice = " AND games.is_desktop = 1";
        }

        var stringa = `SELECT gamesubcategories.*, (SELECT COUNT(DISTINCT games.id) FROM gamesubcategories_assoc 
        JOIN games ON games.id = gamesubcategories_assoc.game_id 
        JOIN providers ON providers.id = games.provider_id
        JOIN skins_providers ON skins_providers.provider_id = providers.id
        WHERE games.enabled = 1 and skins_providers.skin_id = `+SKIN["id"]+` and skins_providers.view = 1 and gamesubcategories_assoc.subcategory_id = gamesubcategories.id `+substringaLoggato+` `+substringaDevice+`) as totale
        FROM gamesubcategories 
        WHERE gamesubcategories.category_id = 1  
        and 
        (SELECT COUNT(DISTINCT games.id) FROM gamesubcategories_assoc 
        LEFT JOIN games ON games.id = gamesubcategories_assoc.game_id 
        LEFT JOIN providers ON providers.id = games.provider_id
        JOIN skins_providers ON skins_providers.provider_id = providers.id
        WHERE games.enabled = 1 and skins_providers.skin_id = `+SKIN["id"]+` and skins_providers.view = 1 and gamesubcategories_assoc.subcategory_id = gamesubcategories.id and skins_providers.skin_id = `+SKIN["id"]+` `+substringaLoggato+` `+substringaDevice+`) >0 ORDER BY gamesubcategories.priority DESC`;
 
        try{
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
        }catch (e){

            alert(t('erroregenerico'));  
            console.log(e);
        }
    }

    useEffect(() => {
        getProviders();
        GetJackpotsWin();
        GetGames();
        GetSubCategories();
    },[])

    useEffect(() => {
        if(providers!="empty"){

            setLoader(loader+1);
        }
    },[providers])

    useEffect(() => {
        if(jackpots!="empty"){

            setLoader(loader+1);
        }
    },[jackpots])

    useEffect(() => {
        if(games!="empty"){

            if(games!="nothingFound"){
                const arrUtilizzo =  ConvertObjectToArray(games);
                setNumeroGiochi(arrUtilizzo.length);
                setMaxPage(Math.round(arrUtilizzo.length/45));
            }

            setLoader(loader+1);
        }
    },[games])

    useEffect(() => {
        if(subcategories!="empty"){

            setLoader(loader+1);
        }
    },[subcategories])

    const handlePage = () =>{
        if(page < maxPage){
            setPage(page+1);
        }
    }

    return (
        <>

            {loader<4 ? 
            
            <>
                <Spinner animation="border" role="status">
                <span className="visually-hidden">Loading...</span>
                </Spinner>
            </>

            :

            <>
                <div className="container-fluid body-content slider-height">

                    {jackpots != "nothingFound" && jackpots != "empty" && logged && SKIN["jackpot"]==1 ?
                                    
                        
                        <Jackpots jackpots={jackpots} skin={SKIN}/>

                        :

                        <></>
                    }

                    <Slideshow />

                    {providers == "nothingFound" || games == "nothingFound" ?
                                    
                
                        <div>Ci dispiace ma al momento non è stato possibile indivisuare nessun provider e/o gioco pe questa sezione, si prega di riprovare più tardi o di conttattare l'assistenza tecnica</div>
            
                    :
                        <Providers providers={providers} skin={SKIN} />
                    }

                    <div className="row">

                        <div className="col-lg-12 col-sm-12 list-type-play">
                            <div className="position-sticky ">
                            
                                <div className="pul-type-play games-subcategory" id="subcategory-0">
                                    <a href="#"  onClick="loadCasinoGames(0,0, '')">Tutti i giochi <span>{numeroGiochi}</span></a>
                                </div>
                                
                                {subcategories != "nothingFound" ? 
                                
                                    <>{(subcategories.map(subcategory =>

                                        <div className="pul-type-play games-subcategory" id={"subcategory-"+subcategory.id}>
                                            <a href="#"> {subcategory.name} <span> {subcategory.totale} </span></a>
                                        </div>  
                                    ))}</>
                                
                                    :
                                    
                                    <></>
                                }

                            </div>
                        </div>

                        <div className="col-lg-12 col-sm-12">
                            <div id="games-load-container">
                                <Games games={games} skin={SKIN}/>
                            </div>
                            
                            <div id="loadNextGames">
                                <div className="show-all-p">
                                    <a href="#" id="loadNextPageLink">
                                        <ArrowIcon />	carica altri giochi
                                    </a>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </>

            }
        </>
    )
}

export default Casino;


        