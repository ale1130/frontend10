import React from "react";
import Account from "./account";

function WithdrawalsRequests (props){

    const USER = props.user;

    return (
        <>
            {<Account paginaAttuale={"withdrawals_requests"} datiUtente={USER} />}
        </>
    )
}

export default WithdrawalsRequests;


        