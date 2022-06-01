import React, {Component} from "react";
import 'react-dropdown/style.css';

import '../styles/headerv1.css';

class SelectLanguages extends Component{

    state = {
        languages:[
            {id:0, nome:"Italiano", immagine:"https://rabitcasino.com/static-media/flags/Italy.png?v=100"},
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
            <div className="dropdown-menu of-header dropdown-menu-right show" aria-labelledby="info2" >

                    <div className="header-drop-down">
                        <p>Select language</p>
                        <div className="language-lists">

                            {this.state.languages.map(language =>
                                <>
                                    <div className="form-check-p">
                                        <label htmlFor={language.id}><img src={language.immagine} />{language.nome}</label>
                                        <input name="inputLanguage" type="radio" id={language.id} key={language.id}/>
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
}

export {SelectLanguages};


