import React from "react";

import Spinner from 'react-bootstrap/Spinner';

import Profile from "../pages/profile";

function Messages (props){

    const USER = props.datiUtente;

    return (
        <>
            {props.datiUtente=="empty" ? 

                <>
                    <Spinner animation="border" role="status">
                        <span className="visually-hidden">Loading...</span>
                    </Spinner>
                </>
                :
                <>
                    {<Profile paginaAttuale={"messages"} datiUtente={USER} />}
                </>
            }
        </>
    )
}

export default Messages;