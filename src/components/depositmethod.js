import React from "react";
import Account from "../pages/account";

function DepositMethod (props){

    const USER = props.user;
    const SKIN = props.skin;

    const method = props.method;

    return (
        <>
            {method}
            {<Account countMethods={props.countMethods} paginaAttuale={"deposit"} datiUtente={USER} />}
        </>
    )
}

export default DepositMethod;