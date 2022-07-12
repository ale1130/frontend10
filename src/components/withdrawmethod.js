import React from "react";
import Account from "../pages/account";

import { useTranslation } from "react-i18next";
import { ConvertToAssociativeArray } from "../constants/global";
import { ComponentPixW } from "../pageswithdrawals/pixwithdrawcomponent";
import { ComponentVoucherW } from "../pageswithdrawals/voucherwithdrawcomponent";
import { ComponentCryptoW } from "../pageswithdrawals/cryptowithdrawcomponent";
import { ComponentIntouchW } from "../pageswithdrawals/intouchwithdrawcomponent";
import { ComponentLidgicashW } from "../pageswithdrawals/lidgicashwithdrawcomponent";
import { ComponentBankW } from "../pageswithdrawals/bankwithdrawcomponent";


function WithdrawMethod (props){

    const USER = props.user;
    const SKIN = props.skin;

    const { t, i18n } = useTranslation();

    const method = props.method;

    const methodInfo = ConvertToAssociativeArray(props.countMethods.withdrawMethods);

    var mainComponent;

    switch(method){

        case "pix":
            mainComponent = <ComponentPixW methodInfo ={methodInfo.pix} user={USER} skin={SKIN} />
        break;

        case "voucher":
            mainComponent = <ComponentVoucherW methodInfo ={methodInfo.voucher} user={USER} skin={SKIN} />
        break;

        case "crypto":
            mainComponent = <ComponentCryptoW methodInfo ={methodInfo.crypto} user={USER} skin={SKIN} />
        break;

        case "intouch":
            mainComponent = <ComponentIntouchW methodInfo ={methodInfo.intouch} user={USER} skin={SKIN} />
        break;

        case "lidgi":
            mainComponent = <ComponentLidgicashW methodInfo ={methodInfo.lidgi} user={USER} skin={SKIN} />
        break;

        case "bank":
            mainComponent = <ComponentBankW methodInfo ={methodInfo.bank} user={USER} skin={SKIN} />
        break;
        default:
            mainComponent = <div>Il metodo di prelievo richiesto non risulta presente tra quelli disponibili, ti preghiamo di tornare alla pagina precedente</div>
        break;
    }
        
    return (
        <>
            <Account countMethods={props.countMethods} paginaAttuale={"withdrawals"} datiUtente={USER} />
            {mainComponent} 
        </>
    )
}

export default WithdrawMethod;