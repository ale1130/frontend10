import React from "react";
import 'react-dropdown/style.css';

import '../styles/headerv1.css';

import { useTranslation } from 'react-i18next';

function  SelectLanguages (props){

    const { i18n } = useTranslation();

    const setLanguageCookie = (event) =>{
        localStorage.setItem('language', event.target.value);
        i18n.changeLanguage(event.target.value);
    }

    const state = {
        languages:[
            {id:0, sigla:"it", nome:"Italiano", immagine:"https://rabitcasino.com/static-media/flags/Italy.png?v=100"},
            {id:1, sigla:"en", nome:"English", immagine:""},
            {id:2, sigla:"de", nome:"Deutsche", immagine:""},
            {id:3, sigla:"tr", nome:"Turkçe", immagine:""},
            {id:4, sigla:"ar", nome:"Arabic", immagine:""},
            {id:5, sigla:"ro", nome:"Romana", immagine:""},
            {id:6, sigla:"zh", nome:"Chinese", immagine:""},
            {id:7, sigla:"es", nome:"Espanol", immagine:""},
            {id:8, sigla:"fr", nome:"Français", immagine:""},
            {id:9, sigla:"pt", nome:"Portugues", immagine:""},
            {id:10, sigla:"pt-br", nome:"Portugues-Brasil", immagine:""},
            {id:11, sigla:"hu", nome:"Hungary", immagine:""}
        ],
    };

    return(
        <div className="dropdown-menu of-header dropdown-menu-right show" aria-labelledby="info2">

            <div className="header-drop-down">
                <p>Select language</p>
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
                <p><a href="mailto:support@rabitcasino.com">{props.svgphone}Send email</a></p>
            </div>
        </div>
    );
}

export {SelectLanguages};


