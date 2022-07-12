import React from "react";

function FrameDeposit (props){

    const src = props.src;

    return(
        <>
            <div id="payment_iframe_div" className="frame-pix">
                <iframe id="payment_iframe" src={src} width="100%" height="500" frameBorder="0" allowtransparency="true">
                </iframe>
            </div>
        </>
    )
}  

export default FrameDeposit;