import React, { useEffect, useState } from "react";
import { PROVIDERS_LOGO_WEB_PATH, api, skinUrl, convertToFormdata } from "../constants/global";

import Spinner from 'react-bootstrap/Spinner';

import "react-slideshow-image/dist/styles.css";
import { Fade } from 'react-slideshow-image';

import axios from "axios";

import { useTranslation } from "react-i18next";

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

const Slideshow = (props) => {

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

const TypoGiochi = (props) =>{

    const countGiochi = props.countGames;
    const subCategories = props.subCateories;

    return(
        <div className="col-lg-12 col-sm-12 list-type-play">
            <div className="position-sticky ">

                <div className="pul-type-play games-subcategory" id="subcategory-0">
                    <a href="#" onClick="loadCasinoGames(0,0, '')">Tutti i giochi <span>{countGiochi}</span></a>
                </div>

                {subCategories != "nosubcategories" ?

                    <>{(subCategories.map(subcategory =>

                        <div className="pul-type-play games-subcategory" id={"subcategory-" + subcategory.id}>
                            <a href="#"> {subcategory.name} <span> {subcategory.totale} </span></a>
                        </div>
                    ))}</>

                    :

                    <></>
                }

            </div>
        </div>
    )
}

const Games = (props) => {

    const [games, setGames] = useState(props.games);
    const SKIN = props.skin;

    return (
        <>
            {games != "nogames" && games != "empty" ?

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

                                                <polygon class="triangle" id="XMLID_18_" fill="none" stroke-width="7" stroke-linecap="round" stroke-linejoin="round" stroke-miterlimit="10" points="73.5,62.5 148.5,105.8 73.5,149.1 "></polygon>

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

                :

                <></>
            }
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
    const [countGames, setCountGames] = useState(1111111111);

    const [subCategories, setSubCategories] = useState(["empty"]);
    
    const [games, setGames] = useState(["empty"]);

    const [page, setPage] = useState(0);
    const [maxPage, setMaxPage] = useState(0);

    const [inputs, setInputs] = useState([]);

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

    const GetProviders = async () => {

        const loggato = logged ? 1 : 0;

        try {

            const data = await api
            .get('rest/getproviders/:'+loggato+'/')
            .then(response => {
    
                if(response.data.status=="ok"){

                    setProviders(response.data.dati);

                }else if(response.data.status=="error"){
                    
                    setProviders(["noproviders"])
                }else{

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
            .get('rest/getgamescount/:'+loggato+'/')
            .then(response => {
    
                if(response.data.status=="ok"){

                    setCountGames(response.data.dati["count_games"]);

                }else if(response.data.status=="error"){
                    
                    setCountGames(0)
                }else{

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
            .get('rest/getsubcategories/:'+loggato+'/')
            .then(response => {
    
                if(response.data.status=="ok"){

                    setSubCategories(response.data.dati);

                }else if(response.data.status=="error"){
                    
                    setSubCategories(["nosubcategories"])
                }else{

                    alert(t('erroregenerico'));
                }
            })

        } catch (e) {

            alert(t('erroregenerico'));  
            console.log(e);
        }
    }

    const GetGames = async () => {

        const loggato = logged ? 1 : 0;

        try {

            const data = await axios
            ({
                method:"post",
                url:skinUrl+"rest/getgames.php",
                data:convertToFormdata(inputs)
            })
            .then(response => {
        
                if(response.data.status=="ok"){

                    setMaxPage(response.data.total_pages)

                }else if(response.data.status=="nogames"){

                    setMaxPage(0)
                }else{

                    alert(t('erroregenerico'));  
                }
            })

        } catch (e) {

            alert(t('erroregenerico'));  
            console.log(e);
        }
    }

    useEffect(() => {
        setInputs(inputs => ({...inputs,"logged": logged ? 1 : 0}));
        GetProviders();
        GetJackpotsWin();
        GetCountGames();
        GetSubCategories();
        GetGames();
    }, [logged])

    
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
        }
    }, [games])


    /*const handlePage = () => {
        if (page < maxPage) {
            setPage(page + 1);
        }
    }*/

    return (
        <>

            {loader <4 ?

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

                    {providers == "noproviders" || countGames==0 ?


                        <div>Ci dispiace ma al momento non è stato possibile individuare nessun provider e/o gioco per questa sezione, si prega di riprovare più tardi o di conttattare l'assistenza tecnica</div>

                        :
                        
                        <>
                            <Providers providers={providers} skin={SKIN} />
                            <TypoGiochi countGames={countGames} subCateories={subCategories} />
                            <Games skin={SKIN} games={games} />
                        </>
                    }
                </>
            }
        </>
    )
}

export default Casino;


