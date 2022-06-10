import React from "react";

function Account (props){

    const logged = props.isLogged;
    const datiUtente = props.user;

    if(logged){

        return (
            <>
                <div>Buongiorno {datiUtente["username"]}</div>
            </>
        )
    }else{

        return (
            <>
                <div>Accesso negato per mancato login</div>
            </>
        )
    }
}

export default Account;