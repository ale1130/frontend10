import React, { useEffect, useState } from "react";
import 'react-dropdown/style.css';

import '../styles/headerv1.css';

import { useTranslation } from 'react-i18next';

import { GetLanguages } from "../constants/global";

function  SelectLanguages (props){

    /*const [languages, setLanguages] = useState(["empty"]);

    useEffect(()=>{
        setLanguages(GetLanguages());
    },[])*/

    const { t, i18n } = useTranslation();
    const [SKIN, setSkin] = useState(props.skin);

    const setLanguageCookie = (event) =>{
        localStorage.setItem('language', event.target.value);
        i18n.changeLanguage(event.target.value);
    }

    const state = {
        languages:[
            {id:0, sigla:"it", nome:t('languages.italiano'), immagine:"https://"+SKIN["name"]+"/static-media/flags/Italy.png"},
            {id:1, sigla:"en", nome:t('languages.inglese'), immagine:"https://"+SKIN["name"]+"/static-media/flags/United-States.png"},
            {id:2, sigla:"de", nome:t('languages.tedesco'), immagine:"https://"+SKIN["name"]+"/static-media/flags/Germany.png"},
            {id:3, sigla:"tr", nome:t('languages.turco'), immagine:"https://"+SKIN["name"]+"/static-media/flags/Turkey.png"},
            {id:4, sigla:"ar", nome:t('languages.arabo'), immagine:"https://"+SKIN["name"]+"/static-media/flags/United-Arab-Emirates.png"},
            {id:5, sigla:"ro", nome:t('languages.rumeno'), immagine:"https://"+SKIN["name"]+"/static-media/flags/Romania.png"},
            {id:6, sigla:"zh", nome:t('languages.cinese'), immagine:"https://"+SKIN["name"]+"/static-media/flags/China.png"},
            {id:7, sigla:"es", nome:t('languages.spagnolo'), immagine:"https://"+SKIN["name"]+"/static-media/flags/Spain.png"},
            {id:8, sigla:"fr", nome:t('languages.francese'), immagine:"https://"+SKIN["name"]+"/static-media/flags/France.png"},
            {id:9, sigla:"pt", nome:t('languages.portoghese'), immagine:"https://"+SKIN["name"]+"/static-media/flags/Portugal.png"},
            {id:10, sigla:"pt-br", nome:t('languages.portoghesebrasiliano'), immagine:"https://"+SKIN["name"]+"/static-media/flags/Brasil.png"},
            {id:11, sigla:"hu", nome:t('languages.ungherese'), immagine:"https://"+SKIN["name"]+"/static-media/flags/Hungary.png"}
        ],
    };

    return(
        <div className="dropdown-menu of-header dropdown-menu-right show" aria-labelledby="info2">

            <div className="header-drop-down">
                <p>{t('languages.seleziona')}</p>
                <div className="language-lists">

                    {state.languages.map(language =>
                        <>
                            <div key={language.id} className={ i18n.resolvedLanguage == language.sigla ? 'cLanguage ' + 'form-check-p' : '' + 'form-check-p'}>
                                <label htmlFor={language.id}><img src={language.immagine}/>{language.nome}</label>
                                <input name="inputLanguage" type="radio" id={language.id} value={language.sigla} onClick={setLanguageCookie} />
                            </div>
                        </>
                    )}
                </div>
            </div>

            <div className="footer-drop-down d-d-footer" style={{display:"block", borderRadius:"3px"}}>
                <p><a href="mailto:support@rabitcasino.com">{props.svgphone}{t('languages.inviaemail')}</a></p>
            </div>
        </div>
    );
}

export {SelectLanguages};

