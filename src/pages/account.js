import React from "react";

function Account (props){

    const datiUtente = props.user;

    return (
        <>
            <div>Buongiorno {datiUtente["username"]}</div>
        </>
    )

}

export default Account;