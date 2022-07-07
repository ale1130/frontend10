import React from "react";
import Account from "./account";

function Voucher (props){

    const USER = props.user;

    return (
        <>
            {<Account countMethods={props.countMethods} paginaAttuale={"vouchers"} datiUtente={USER} />}
        </>
    )
}

export default Voucher;


        