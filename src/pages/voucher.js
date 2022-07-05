import React from "react";
import Account from "./account";

function Voucher (props){

    const USER = props.user;

    return (
        <>
            {<Account paginaAttuale={"voucher"} datiUtente={USER} />}
        </>
    )
}

export default Voucher;


        