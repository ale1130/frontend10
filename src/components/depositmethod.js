import React from "react";
import Account from "../pages/account";
import { ComponentVoucher } from "../pagesdeposit/voucherdepositcomponent";
import { ComponentPix } from "../pagesdeposit/pixdepositcomponent";

function DepositMethod (props){

    const USER = props.user;
    const SKIN = props.skin;

    const method = props.method;

    var mainComponent;

    switch(method){

        case "pix":
            mainComponent = <ComponentPix />
        break;

        case "voucher":
            mainComponent = <ComponentVoucher />
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
            {mainComponent}
        </>
    )
}

export default DepositMethod;