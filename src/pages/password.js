import React, { useEffect, useState } from "react";

import Profile from "../pages/profile";

import ErrorBox from "../components/errorBox";
import SuccessBox from "../components/successBox";

import { api } from "../constants/global";
import { useTranslation } from "react-i18next";
import { LoaderFetch } from "../components/spinner";

function Password (props){

    const { t, i18n } = useTranslation();

    const [USER, setUser] = useState(props.datiUtente);

    const [done, setDone] = useState(0);
    const [loader, setLoader] = useState(false);

    const [inputs, setInputs] = useState({});

    const [modalError, setModalError] = useState(false);
    const [errorMessage, setErrorMessage] = useState([]);

    const [modalSuccess, setModalSuccess] = useState(false);
    const [successMessage, setSuccessMessage] = useState("");

    const handleChange = (event) => {
      const name = event.target.name;
      const value = event.target.value;
      setInputs(values => ({...values,[name]: value}))
    }

    const error = (errors) =>{
        
        setErrorMessage(errors);

        setModalSuccess(false);
        setModalError(true);
    }

    const success = (message="Complimenti") =>{

        setModalError(false);
        
        setSuccessMessage(message);
        setModalSuccess(true);
    }
           
    const changePassword = async () => {
        try{

            const data = await api
            .post('rest/change-password/:'+inputs.newpassword+'/:'+USER["id"]+"/")
            .then(response => {

                if(response.data.status=="ok"){

                    success(t('cambiopassword'));
                    setDone(done+1);
                }else{
                    alert(t('erroregenerico'));
                    setDone(done+1);
                }
            })
        }catch (e){

           alert(t('erroregenerico'));  console.log(e);
        }
    };
  
    const handleSubmit = (event) => {

        setLoader(true);
        var errorMsg = [];
        event.preventDefault();

        if(!inputs.oldpassword || !inputs.newpassword || !inputs.renewpassword){
            errorMsg [0] = "Immettere tutti i dati";
        }else{
            if(inputs.oldpassword != USER["realpass"]){
            errorMsg [1] = "La vecchia password non coincide";
            }

            if(inputs.newpassword == USER["realpass"]){
                errorMsg [2] = "La nova password è uguale alla vecchia";
            }

            if(inputs.newpassword != inputs.renewpassword){
                errorMsg [3] = "Le due password non coincidiono";
            }
        }

        if(errorMsg.length>0){

            error(errorMsg);

            setLoader(false);
        }else{

            changePassword();
        }
    }

    useEffect(()=>{
        if(done!=0){
            setLoader(false);
        }
    },done)

    return (
        <>
            {<Profile paginaAttuale={"password"} datiUtente={USER} />}

            <div className="col-md-12 col-lg-9">
                <table width="100%" className="table table-bordered">
                    <tbody>
                        <tr>
                            <td>
                            
                                <h2 className="virtual-title">Cambia password</h2>
                                
                                <form onSubmit={handleSubmit} className="form-signUp clearForm">

                                {modalError ? <ErrorBox message={errorMessage}/> : ""} {modalSuccess ? <SuccessBox message={successMessage}/> : ""}
                                    
                                    {loader ? <LoaderFetch /> : ""}

                                    <table width="100%" className="table table-bordered profile-table">
                                        <tbody>
                                        
                                            <tr>
                                            
                                                <td>
                                                    <strong>Password attuale</strong>
                                                </td>
                                                
                                                <td>

                                                    <div className="input-group ">

                                                        <input type="password" name="oldpassword" id="oldpassword" value={inputs.oldpassword || ""} onChange={handleChange} className="form-control" />

                                                        <div className="input-group-prepend">
                                                            <span className="input-group-text" id="basic-addon1"> <i className="bi bi-eye-slash" id="occhio1"></i></span>
                                                        </div>
                                                    </div>
                                                </td>
                                            </tr>
                                            
                                            <tr>
                                            
                                                <td width="35%">
                                                    <strong>Nuova password</strong>
                                                </td>
                                                
                                                <td>

                                                    <div className="input-group ">

                                                        <input type="password" name="newpassword" id="newpassword" value={inputs.newpassword || ""} onChange={handleChange} className="form-control" />

                                                        <div className="input-group-prepend">
                                                            <span className="input-group-text" id="basic-addon1"> <i className="bi bi-eye-slash" id="occhio2"></i></span>
                                                        </div>
                                                    </div>
                                                </td>
                                            </tr>
                                            
                                            <tr>
                                                <td>
                                                    <strong>Conferma password</strong>
                                                </td>
                                                
                                                <td>
                                                    <div className="input-group ">

                                                        <input type="password" name="renewpassword" id="renewpassword" value={inputs.renewpassword || ""} onChange={handleChange} className="form-control" />
                                                        <div className="input-group-prepend">
                                                            <span className="input-group-text" id="basic-addon1"> <i className="bi bi-eye-slash" id="occhio3"></i></span>
                                                        </div>
                                                    </div>
                                                </td>
                                            </tr>

                                        </tbody>
                                    </table>
                                    
                                    <input type="submit" className="login" id="changePassword" value={"Salva password"} />
                                    
                                </form>

                            </td>
                        </tr>
                    </tbody>
                </table>

            </div>
        </>
    )
}

export default Password;