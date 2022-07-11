import React from "react";
import Account from "../pages/account";

import { ComponentVoucher } from "../pagesdeposit/voucherdepositcomponent";
import { ComponentPix } from "../pagesdeposit/pixdepositcomponent";
import { ComponentCreditCard } from "../pagesdeposit/creditcarddepositcomponent";
import { ComponentCrypto } from "../pagesdeposit/cryptodepositcomponent";
import { ComponentBank } from "../pagesdeposit/bankdepositcomponent";
import { ComponentLidgicash } from "../pagesdeposit/lidgicashdepositcomponent";
import { ComponentIntouch } from "../pagesdeposit/intouchdepositcomponent";
import { ConvertToAssociativeArray } from "../constants/global";

import { useTranslation } from "react-i18next";

function DepositMethod (props){

    const USER = props.user;
    const SKIN = props.skin;

    const { t, i18n } = useTranslation();

    const method = props.method;

    const methodInfo = ConvertToAssociativeArray(props.countMethods.depositMethods);

    var mainComponent;

    switch(method){

        case "pix":
            mainComponent = <ComponentPix methodInfo ={methodInfo.pix} user={USER} skin={SKIN} />
        break;

        case "voucher":
            mainComponent = <ComponentVoucher methodInfo ={methodInfo.voucher} user={USER} skin={SKIN} />
        break;

        case "creditcard":
            mainComponent = <ComponentCreditCard methodInfo ={methodInfo.creditcard} user={USER} skin={SKIN} />
        break; 

        case "pixs2p":
            mainComponent = <ComponentPix methodInfo ={methodInfo.pixs2p} user={USER} skin={SKIN} />
        break;

        case "cryptoio":
            mainComponent = <ComponentCrypto methodInfo ={methodInfo.cryptoio} user={USER} skin={SKIN} />
        break;

        case "pixm":
            mainComponent = <ComponentPix methodInfo ={methodInfo.pixm} user={USER} skin={SKIN} />
        break;

        case "intouch":
            mainComponent = <ComponentIntouch methodInfo ={methodInfo.intouch} user={USER} skin={SKIN} />
        break;

        case "lidgi":
            mainComponent = <ComponentLidgicash methodInfo ={methodInfo.lidgi} user={USER} skin={SKIN} />
        break;

        case "bank":
            mainComponent = <ComponentBank methodInfo ={methodInfo.bank} user={USER} skin={SKIN} />
        break;
        default:
            mainComponent = <div>Il metodo di deposito immesso non risulta presente tra quelli disponibili, ti preghiamo di tornare alla pagina precedente</div>
        break;
    }
        
    return (
        <>
            <Account countMethods={props.countMethods} paginaAttuale={"deposit"} datiUtente={USER} />
            {mainComponent} 
        </>
    )
}

export default DepositMethod;