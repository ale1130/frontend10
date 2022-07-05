import React from "react";
import Account from "./account";

function Deposit (props){

    const USER = props.user;

    return (
        <>
            {<Account paginaAttuale={"deposit"} datiUtente={USER} />}
        </>
    )
}

export default Deposit;


        