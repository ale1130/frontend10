import React, { useState } from "react";
import 'react-dropdown/style.css';

import '../styles/headerv1.css';

import { useTranslation } from 'react-i18next';

import { skinUrl } from "../constants/global";

import Cookies from 'universal-cookie';

function  SelectLanguages (props){

    const cookies = new Cookies();
    
    const { t, i18n } = useTranslation();
    const [SKIN, setSkin] = useState(props.skin);

    const setLanguageCookie = (event) =>{
        cookies.set('la', event.target.value, { path: '/' });
        i18n.changeLanguage(event.target.value);
    }

    const state = {
        languages:[
            {id:0, sigla:"it", nome:t('languages.italiano'), immagine:skinUrl+"/static-media/flags/Italy.png"},
            {id:1, sigla:"en", nome:t('languages.inglese'), immagine:skinUrl+"/static-media/flags/United-States.png"},
            {id:2, sigla:"de", nome:t('languages.tedesco'), immagine:skinUrl+"/static-media/flags/Germany.png"},
            {id:3, sigla:"tr", nome:t('languages.turco'), immagine:skinUrl+"/static-media/flags/Turkey.png"},
            {id:4, sigla:"ar", nome:t('languages.arabo'), immagine:skinUrl+"/static-media/flags/United-Arab-Emirates.png"},
            {id:5, sigla:"ro", nome:t('languages.rumeno'), immagine:skinUrl+"/static-media/flags/Romania.png"},
            {id:6, sigla:"zh", nome:t('languages.cinese'), immagine:skinUrl+"/static-media/flags/China.png"},
            {id:7, sigla:"es", nome:t('languages.spagnolo'), immagine:skinUrl+"/static-media/flags/Spain.png"},
            {id:8, sigla:"fr", nome:t('languages.francese'), immagine:skinUrl+"/static-media/flags/France.png"},
            {id:9, sigla:"pt", nome:t('languages.portoghese'), immagine:skinUrl+"/static-media/flags/Portugal.png"},
            {id:10, sigla:"pt-br", nome:t('languages.portoghesebrasiliano'), immagine:skinUrl+"/static-media/flags/Brasil.png"},
            {id:11, sigla:"hu", nome:t('languages.ungherese'), immagine:skinUrl+"/static-media/flags/Hungary.png"}
        ],
    };

    return(
        <div className="dropdown-menu of-header dropdown-menu-right show" aria-labelledby="info2">

            <div className="header-drop-down">
                <p>{t('languages.seleziona')}</p>
                <div className="language-lists">

                    {state.languages.map(language =>
                        <>
                            <div key={language.id} className={ cookies.get("la") == language.sigla ? 'cLanguage ' + 'form-check-p' : 'form-check-p'}>
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

export const SelectLanguageSett = (props) =>{

    const { t, i18n } = useTranslation();

    const state = {
        languages:[
            {id:0, sigla:"it", nome:t('languages.italiano'), immagine:skinUrl+"/static-media/flags/Italy.png"},
            {id:1, sigla:"en", nome:t('languages.inglese'), immagine:skinUrl+"/static-media/flags/United-States.png"},
            {id:2, sigla:"de", nome:t('languages.tedesco'), immagine:skinUrl+"/static-media/flags/Germany.png"},
            {id:3, sigla:"tr", nome:t('languages.turco'), immagine:skinUrl+"/static-media/flags/Turkey.png"},
            {id:4, sigla:"ar", nome:t('languages.arabo'), immagine:skinUrl+"/static-media/flags/United-Arab-Emirates.png"},
            {id:5, sigla:"ro", nome:t('languages.rumeno'), immagine:skinUrl+"/static-media/flags/Romania.png"},
            {id:6, sigla:"zh", nome:t('languages.cinese'), immagine:skinUrl+"/static-media/flags/China.png"},
            {id:7, sigla:"es", nome:t('languages.spagnolo'), immagine:skinUrl+"/static-media/flags/Spain.png"},
            {id:8, sigla:"fr", nome:t('languages.francese'), immagine:skinUrl+"/static-media/flags/France.png"},
            {id:9, sigla:"pt", nome:t('languages.portoghese'), immagine:skinUrl+"/static-media/flags/Portugal.png"},
            {id:10, sigla:"pt-br", nome:t('languages.portoghesebrasiliano'), immagine:skinUrl+"/static-media/flags/Brasil.png"},
            {id:11, sigla:"hu", nome:t('languages.ungherese'), immagine:skinUrl+"/static-media/flags/Hungary.png"}
        ],
    };

    return(
        <>

            <select id="language_sett" name="language_sett" className="form-control margin-bottom-5"  value={props.value || ""} onChange={props.onchange()}>
                <option value="">{"--"+t('seleziona')+"--"}</option>
                {state.languages.map(lingua =>
                <option key={lingua.id} value={lingua.sigla}>{lingua.nome}</option>
                )}
            </select>
        </>
    )
}

export {SelectLanguages};

