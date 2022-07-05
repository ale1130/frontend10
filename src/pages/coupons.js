import React from "react";
import Account from "./account";

function Coupons (props){

    const USER = props.user;

    return (
        <>
            {<Account paginaAttuale={"coupons"} datiUtente={USER} />}
        </>
    )
}

export default Coupons;


        