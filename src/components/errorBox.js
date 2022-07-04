import React, { useState } from "react";

function ErrorBox (props){

    const messaggi = props.message;

    return (
 
        <>
            <div className="row">
                <div className="col-12">
                    <div className="alert alert-danger" role="alert" id="saveProfileFormErrori">
                        <div className="alert-text">Correggi i seguenti errori:<br />
                            <div className="" id="saveProfileFormErroriLista">
                            
                                {messaggi.map(messaggio =>
                                    <><span key={messaggio}>-{messaggio}</span><br /></>
                                )}

                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </> 
    )
}

export default ErrorBox;

        