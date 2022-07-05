import React, { useState } from "react";

import axios from "axios";

import { skinUrl, convertToFormdata, checkSkinSett, ConvertObjectToArrayErrors } from "../constants/global";

import Profile from "../pages/profile";
import ErrorBox from "../components/errorBox";
import SuccessBox from "../components/successBox";

import { useTranslation } from "react-i18next";
import { SelectLanguageSett } from "../components/languagesselector";

function Info (props){

    const { t, i18n } = useTranslation();

    const USER = props.datiUtente;

    const countMessages = props.countMessages;

    const [inputs, setInputs] = useState({"email":USER["email"],"mobile":USER["mobile"], "max_deposit":USER["max_deposit"], "max_deposit_status":USER["max_deposit_status"], "user_id":USER["id"], "language_sett":USER["primary_language"] });

    const [modalError, setModalError] = useState(false);
    const [errorMessage, setErrorMessage] = useState([]);

    const [modalSuccess, setModalSuccess] = useState(false);
    const [successMessage, setSuccessMessage] = useState("");

    const handleChange = (event) => {
        const name = event.target.name;
        const value = event.target.value;
        setInputs(values => ({...values,[name]: value}))
    }

    const handleChangeRadio = (event) => {

        var newValue=1;

        const name = event.target.name;
        const value = event.target.defaultChecked;

        if(value == 1){
            newValue = 0;
        }
        setInputs(values => ({...values,[name]: newValue}))
    }

    const error = (message=[]) =>{
        setModalSuccess(false);
        setModalError(true);

        setErrorMessage(message);
    }

    const success = (message="Complimenti") =>{
        setModalError(false);
        setModalSuccess(true);

        setSuccessMessage(message);
    }
    
    const SendData = async () => {

        try{
    
          const data = await axios
            ({
                method:"post",
                url:skinUrl+"rest/saveprofile.php",
                data:convertToFormdata(inputs)
            })
          .then(response => {
    
            if(response.data.status=="ok"){

                success(t('datiaggiornati'))
              
            }else{

                error(ConvertObjectToArrayErrors(response.data.message));
            }
          })
    
        }catch (e){
    
            alert(t('erroregenerico'));  console.log(e);
        }
    };

    const handleSubmit = (event) => {
        event.preventDefault();

        SendData();
    }

    return (
        <>
            {<Profile paginaAttuale={"info"} datiUtente={USER} countMessages={countMessages}/>}

            <div className="col-md-12 col-lg-9">

                <table width="100%" className="table table-bordered">
                    <tbody>
                        <tr>
                            <td>
                                <h2 className="virtual-title">{t('cambiadati')}</h2>

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
                                                        <strong>{t('nome')} {t('e')} {t('cognome')}</strong>
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
                                                        <input type="text" id="email" name="email" placeholder="Email" value={inputs.email ||""} onChange={handleChange} className="form-control" />
                                                    </td>
                                                </tr>
                                                <tr>
                                                    <td>
                                                        <strong>{t('cellulare')}</strong>
                                                    </td>
                                                    <td>
                                                        <input type="text" id="mobile" name="mobile" placeholder="Cellulare" value={inputs.mobile || ""} onChange={handleChange} className="form-control" />
                                                    </td>
                                                </tr>

                                                {!props.disableLang ?      
                                                    
                                                    <>
                                                        <tr>
                                                            <td>
                                                                <strong>{t('lingua')}</strong>
                                                            </td>
                                                            <td>
                                                                <SelectLanguageSett value={inputs.language_sett} onchange={()=>handleChange}/>
                                                            </td>
                                                        </tr>
                                                    </>

                                                    :

                                                    <></>
                                                } 
                                                
                                                <tr>
                                                    <td>
                                                        <strong>{t('depositomax')}</strong>
                                                    </td>
                                                    <td>
                                                        <div className="input-group mb-3">

                                                            <input type="text" id="max_deposit" name="max_deposit" className="form-control" aria-label="Text input with checkbox" value={inputs.max_deposit || ""} onChange={handleChange} placeholder={inputs.max_deposit ? "" : t('nonimpostato')} />

                                                            <div className="input-group-append">
                                                                <div className="input-group-text">
                                                                    <input type="checkbox" id="max_deposit_status" name="max_deposit_status" aria-label="Checkbox for following text input" onChange={handleChangeRadio} value={inputs.max_deposit_status} defaultChecked={inputs.max_deposit_status} /> {t('attivo')}
                                                                </div>
                                                            </div>

                                                        </div>
                                                    </td>
                                                </tr>
                                        
                                            </tbody>
                                        </table>
                                        
                                        <input type="submit" className="login" value={t('salvadati')} />
                                    </form>

                                <form id="removeMaxDeposit" name="removeMaxDeposit"></form>

                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </>
    )
}

export default Info;