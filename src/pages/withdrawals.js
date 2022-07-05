import React from "react";
import Account from "./account";

function Withdrawals (props){

    const USER = props.user;

    return (
        <>
            {<Account paginaAttuale={"withdrawals"} datiUtente={USER} />}
        </>
    )
}

export default Withdrawals;


        