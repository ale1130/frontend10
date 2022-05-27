import React, {Component, useState} from "react";
import Dropdown from 'react-dropdown';
import 'react-dropdown/style.css';

import '../styles/headerv1.css';

class SelectLanguages extends Component{

    state = {
        languages:[
            {id:0, nome:"Italiano", immagine:""},
            {id:1, nome:"English", immagine:""},
            {id:2, nome:"Deutsche", immagine:""},
            {id:3, nome:"Turkçe", immagine:""},
            {id:4, nome:"Arabic", immagine:""},
            {id:5, nome:"Romana", immagine:""},
            {id:6, nome:"Chinese", immagine:""},
            {id:7, nome:"Espanol", immagine:""},
            {id:8, nome:"Français", immagine:""},
            {id:9, nome:"Portugues", immagine:""},
            {id:10, nome:"Portugues-Brasil", immagine:""},
            {id:11, nome:"Hungary", immagine:""}
        ],
    };

    render(){
        return(
            <div className="dropdown">
                <div className="header-drop-down">
                    <p>Select language</p>

                    <div className="language-lists">
                        <div className="form-check-p">
                            {this.state.languages.map(language =>
                                <>
                                    <label htmlFor={language.id}><img src="" />{language.nome}</label>
                                    <input name="language_header" type="radio" id={language.id} />
                                </>
                            )}
                        </div>
                    </div>

                </div>

                <div className="footer-drop-down d-d-footer">
                    <p><a href="mailto:support@rabitcasino.com">{this.props.svgphone}Send email</a></p>
                </div>
            </div>
        );
    }
}

export {SelectLanguages};


