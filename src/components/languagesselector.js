import React from "react";
import 'react-dropdown/style.css';

import '../styles/headerv1.css';

import { useTranslation } from 'react-i18next';

function  SelectLanguages (props){

    const { t, i18n } = useTranslation();

    const setLanguageCookie = (event) =>{
        localStorage.setItem('language', event.target.value);
        i18n.changeLanguage(event.target.value);
    }

    const state = {
        languages:[
            {id:0, sigla:"it", nome:t('languages.italiano'), immagine:"https://rabitcasino.com/static-media/flags/Italy.png?v=100"},
            {id:1, sigla:"en", nome:t('languages.inglese'), immagine:""},
            {id:2, sigla:"de", nome:t('languages.tedesco'), immagine:""},
            {id:3, sigla:"tr", nome:t('languages.turco'), immagine:""},
            {id:4, sigla:"ar", nome:t('languages.arabo'), immagine:""},
            {id:5, sigla:"ro", nome:t('languages.rumeno'), immagine:""},
            {id:6, sigla:"zh", nome:t('languages.cinese'), immagine:""},
            {id:7, sigla:"es", nome:t('languages.spagnolo'), immagine:""},
            {id:8, sigla:"fr", nome:t('languages.francese'), immagine:""},
            {id:9, sigla:"pt", nome:t('languages.portoghese'), immagine:""},
            {id:10, sigla:"pt-br", nome:t('languages.portoghesebrasiliano'), immagine:""},
            {id:11, sigla:"hu", nome:t('languages.ungherese'), immagine:""}
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

