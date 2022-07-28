import React from "react";

function JackpotsHeader (props){

    const SKIN = props.skin

    return(
        <>
            <div className="stelle">
                <div id="stars"></div>
                <div id="stars2"></div>
                <div id="stars3"></div>
            
            
                <div className="jackpot">
                    <div className="jackpot-div-mini">
            
                        <strong id="jackpot_silver">{SKIN["jackpot_1"]}</strong>
                        <span>Silver jackpot</span>
            
                    </div>
                    <div className="jackpot-div-super">
                        <strong id="jackpot_bronze">{SKIN["jackpot_2"]}</strong>
                        <span>Bronze jackpot</span>
                    </div>
                    <div className="jackpot-div-mega">
                        <strong id="jackpot_gold">{SKIN["jackpot_3"]}</strong>
                        <span>Gold jackpot</span>
                    </div>
                </div>
            </div>
        </>
    )
}

export {JackpotsHeader}