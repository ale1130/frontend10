import React from "react";

import Spinner from 'react-bootstrap/Spinner';

import Profile from "../pages/profile";

import { useTranslation } from "react-i18next";

function MyProfile (props){

    const { t, i18n } = useTranslation();

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
                                        <h2 className="virtual-title">{t('tuoprofilo')}</h2>

                                        <table width="100%" className="table table-bordered profile-table">
                                            <tbody>
                                                <tr>
                                                    <td width="35%">
                                                        <strong>{t('nomeutente')}</strong>
                                                    </td>
                                                    <td>
                                                    {USER["username"]}
                                                    </td>
                                                </tr>
                                                
                                                <tr>
                                                    <td>
                                                        <strong>{t('nome')} {t('e')} {t('cognome')}</strong>
                                                    </td>
                                                    <td>
                                                    {USER["firstname"]+" "+USER["lastname"]}
                                                    </td>
                                                </tr>
                                                
                                                <tr>
                                                    <td width="35%">
                                                        <strong>{t('codiceconto')}</strong>
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

