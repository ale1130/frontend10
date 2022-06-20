import React from "react";
import 'react-dropdown/style.css';

import '../styles/headerv1.css';

import { useTranslation } from "react-i18next";

function  SelectLanguages (){

    const { t, i18n } = useTranslation();

    const changeLanguage = (event) => {

    i18n.changeLanguage(event.target.value);

  };

    const state = {
        languages:[
            {id:0, sigla:"it", nome:"Italiano", immagine:"https://rabitcasino.com/static-media/flags/Italy.png?v=100"},
            {id:1, sigla:"en", nome:"English", immagine:""},
            {id:2, sigla:"de", nome:"Deutsche", immagine:""},
            {id:3, sigla:"", nome:"Turkçe", immagine:""},
            {id:4, sigla:"", nome:"Arabic", immagine:""},
            {id:5, sigla:"", nome:"Romana", immagine:""},
            {id:6, sigla:"", nome:"Chinese", immagine:""},
            {id:7, sigla:"", nome:"Espanol", immagine:""},
            {id:8, sigla:"", nome:"Français", immagine:""},
            {id:9, sigla:"", nome:"Portugues", immagine:""},
            {id:10, sigla:"", nome:"Portugues-Brasil", immagine:""},
            {id:11, sigla:"", nome:"Hungary", immagine:""}
        ],
    };

    return(
        <div className="dropdown-menu of-header dropdown-menu-right show" aria-labelledby="info2" onChange={changeLanguage}>

            <div className="header-drop-down">
                <p>Select language</p>
                <div className="language-lists">

                    {state.languages.map(language =>
                        <>
                            <div key={language.id} className="form-check-p" >
                                <label htmlFor={language.id}><img src={language.immagine} />{language.nome}</label>
                                <input name="inputLanguage" type="radio" value={language.sigla} id={language.id} />
                            </div>
                        </>
                    )}
                </div>
            </div>

            <div className="footer-drop-down d-d-footer" style={{display:"block", borderRadius:"3px"}}>
                <p><a href="mailto:support@rabitcasino.com">{this.props.svgphone}Send email</a></p>
            </div>
        </div>
    );
}

export {SelectLanguages};


