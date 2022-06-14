import React, { useState } from "react";

function ErrorBox (props){

    return (
 
        <>
            <div className="row">
                <div className="col-12">
                    <div className="alert alert-danger" role="alert" id="saveProfileFormErrori">
                        <div className="alert-text">Correggi i seguenti errori:<br />
                            <div className="" id="saveProfileFormErroriLista">
                            
                                {props.message.map(messaggio =>
                                <><span>-{messaggio}</span><br /></>
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

        