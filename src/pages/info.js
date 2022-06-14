import React, { useState } from "react";

import Spinner from 'react-bootstrap/Spinner';

import Profile from "../pages/profile";
import ErrorBox from "../components/errorBox";
import SuccessBox from "../components/successBox";

function Info (props){

    const USER = props.datiUtente;
    
    const [inputs, setInputs] = useState({});

    const [modalError, setModalError] = useState(false);
    const [errorMessage, setErrorMessage] = useState("");

    const [modalSuccess, setModalSuccess] = useState(false);
    const [successMessage, setSuccessMessage] = useState("");

    const handleChange = (event) => {
      const name = event.target.name;
      const value = event.target.value;
      setInputs(values => ({...values,[name]: value}))
    }

    const error = (message="Errore") =>{
        setModalSuccess(false);
        setModalError(true);

        setErrorMessage(message);
    }

    const success = (message="Complimenti") =>{
        setModalError(false);
        setModalSuccess(true);

        setSuccessMessage(message);
    }
    
    const handleSubmit = (event) => {
        event.preventDefault();
    }

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
                    {<Profile paginaAttuale={"info"} datiUtente={USER} />}

                    <div className="col-md-12 col-lg-9">

                        <table width="100%" className="table table-bordered">
                            <tbody>
                                <tr>
                                    <td>
                                        <h2 className="virtual-title">Cambia dati</h2>

                                            <form onSubmit={handleSubmit} className="form-signUp clearForm">

                                            {modalError ? <ErrorBox message={errorMessage}/> : ""} {modalSuccess ? <SuccessBox message={successMessage}/> : ""}

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
                                                            <td>
                                                                <strong>Email *</strong>
                                                            </td>
                                                            <td>
                                                                <input type="text" id="email" name="email" placeholder="Email" value={USER["email"]} onChange={handleChange} className="form-control" />
                                                            </td>
                                                        </tr>
                                                        <tr>
                                                            <td>
                                                                <strong>Cellulare</strong>
                                                            </td>
                                                            <td>
                                                                <input type="text" id="mobile" name="mobile" placeholder="Cellulare" value={USER["mobile"]} onChange={handleChange} className="form-control" />
                                                            </td>
                                                        </tr>
                                                        
                                                        <tr>
                                                            <td>
                                                                <strong>Deposito massimo settimanale</strong>
                                                            </td>
                                                            <td>
                                                                <div className="input-group mb-3">

                                                                    <input type="text" id="limiteDeposito" name="limiteDeposito" className="form-control" aria-label="Text input with checkbox" value={USER["max_deposit"]} onChange={handleChange} placeholder="Non impostato" />

                                                                    <div className="input-group-append">
                                                                        <div className="input-group-text">
                                                                            <input type="checkbox" id="ckeckLimite" name="ckeckLimite" aria-label="Checkbox for following text input" onChange={handleChange} /> Attivo
                                                                        </div>
                                                                    </div>

                                                                </div>
                                                            </td>
                                                        </tr>
                                                
                                                    </tbody>
                                                </table>
                                                
                                                <input type="submit" className="login" value={"Salva dati"} />
                                            </form>

                                        <form id="removeMaxDeposit" name="removeMaxDeposit"></form>

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

export default Info;