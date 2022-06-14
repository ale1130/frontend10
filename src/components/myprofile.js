import React from "react";

import Spinner from 'react-bootstrap/Spinner';

import Profile from "../pages/profile";

function MyProfile (props){

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
                    {<Profile paginaAttuale={"/"} datiUtente={USER} />}

                    <div className="col-md-12 col-lg-9">

                        <table width="100%" className="table table-bordered">
                            <tbody>
                                <tr>
                                    <td>
                                        <h2 className="virtual-title">Il tuo profilo</h2>

                                        <table width="100%" className="table table-bordered profile-table">
                                            <tbody>
                                                <tr>
                                                    <td width="35%">
                                                        <strong>Username</strong>
                                                    </td>
                                                    <td>
                                                    {USER["username"]}
                                                    </td>
                                                </tr>
                                                
                                                <tr>
                                                    <td>
                                                        <strong>Nome e cognome</strong>
                                                    </td>
                                                    <td>
                                                    {USER["firstname"]+" "+USER["lastname"]}
                                                    </td>
                                                </tr>
                                                
                                                <tr>
                                                    <td width="35%">
                                                        <strong>Codice conto</strong>
                                                    </td>
                                                    <td>
                                                    {USER["id"]}                                        
                                                    </td>
                                                </tr>
                                            </tbody>
                                        </table>

                                    </td>
                                </tr>
                            </tbody>
                        </table>

                    </div>
                </>
            }
        </>
    )
}

export default MyProfile;

