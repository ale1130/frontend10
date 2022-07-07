import React from "react";
import Account from "./account";

function Coupons (props){

    const USER = props.user;

    return (
        <>
            {<Account countMethods={props.countMethods} paginaAttuale={"coupons"} datiUtente={USER} />}
        </>
    )
}

export default Coupons;


        