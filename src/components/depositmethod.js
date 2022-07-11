import React from "react";
import Account from "../pages/account";

import { ComponentVoucher } from "../pagesdeposit/voucherdepositcomponent";
import { ComponentPix } from "../pagesdeposit/pixdepositcomponent";
import { ComponentCreditCard } from "../pagesdeposit/creditcarddepositcomponent";
import { ComponentCrypto } from "../pagesdeposit/cryptodepositcomponent";
import { ComponentBank } from "../pagesdeposit/bankdepositcomponent";
import { ComponentLidgicash } from "../pagesdeposit/lidgicashdepositcomponent";
import { ComponentIntouch } from "../pagesdeposit/intouchdepositcomponent";

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
            mainComponent = <ComponentCreditCard />
        break;

        case "pixs2p":
            mainComponent = <ComponentPix />
        break;

        case "cryptoio":
            mainComponent = <ComponentCrypto />
        break;

        case "pixm":
            mainComponent = <ComponentPix />
        break;

        case "intouch":
            mainComponent = <ComponentIntouch />
        break;

        case "lidgi":
            mainComponent = <ComponentLidgicash />
        break;

        case "bank":
            mainComponent = <ComponentBank />
        break;
    }

    return (
        <>
            {<Account countMethods={props.countMethods} paginaAttuale={"deposit"} datiUtente={USER} />}
            {mainComponent}
        </>
    )
}

export default DepositMethod;