import React from "react";
import Account from "../pages/account";

function WithdrawMethod (props){

    const USER = props.user;
    const SKIN = props.skin;

    const method = props.method;

    return (
        <>
            {method}
            {<Account countMethods={props.countMethods} paginaAttuale={"withdrawals"} datiUtente={USER} />}
        </>
    )
}

export default WithdrawMethod;