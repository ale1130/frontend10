import React, {Component} from "react";

import '../styles/headerv1.css';

class SelectLanguages extends Component{
    render(){
        return(
            <>
                <div className="dropdown-menu of-header dropdown-menu-right show" aria-labelledby="info2" x-placement="bottom-end">
                    <div className="header-drop-down">
                        <p>Select language</p>

                        <div className="language-lists">

                            <div className="form-check-p">
                                Qua ci va la labelLanguage per ogni lingua
                            </div>

                        </div>
                    </div>

                    <div className="footer-drop-down d-d-footer">

                        <p><a href="mailto:support@rabitcasino.com">

                            {this.props.phonesvg}

                            Send email</a></p>

                    </div>
                    
                </div>
            </>
        );
    }
}

class LabelLanguage extends Component{
    render(){
        return(
            <div className="form-check-p">
                <label htmlFor={this.props.inputfor}><img src={this.props.flaglink} />{this.props.langname}</label>
                <input name="language_header" type="radio" data-name={this.props.langname} data-lang={this.props.langsigla} id={this.props.langid} />
            </div>
        );
    }
}

export {SelectLanguages};
export {LabelLanguage};