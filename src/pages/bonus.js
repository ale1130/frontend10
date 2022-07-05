import React from "react";
import Account from "./account";

function Bonus (props){

    const USER = props.user;

    return (
        <>
            {<Account paginaAttuale={"bonus"} datiUtente={USER} />}
        </>
    )
}

export default Bonus;


        