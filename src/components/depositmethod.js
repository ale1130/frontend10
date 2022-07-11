import React from "react";
import Account from "../pages/account";

function DepositMethod (props){

    const USER = props.user;
    const SKIN = props.skin;

    const method = props.method;

    switch(method){
        case "pix":
        break;
        case "voucher":
        break;
        case "creditcard":
        break;
        case "pixs2p":
        break;
        case "cryptoio":
        break;
        case "pixm":
        break;
        case "intouch":
        break;
        case "lidgi":
        break;
        case "bank":
        break;
    }

    return (
        <>
            {<Account countMethods={props.countMethods} paginaAttuale={"deposit"} datiUtente={USER} />}
        </>
    )
}

export default DepositMethod;