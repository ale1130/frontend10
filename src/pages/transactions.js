import React from "react";
import Account from "./account";

function Transactions (props){

    const USER = props.user;

    return (
        <>
            {<Account paginaAttuale={"transactions"} datiUtente={USER} />}
        </>
    )
}

export default Transactions;


        