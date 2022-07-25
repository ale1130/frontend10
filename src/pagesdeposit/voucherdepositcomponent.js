import axios from "axios";
import React, { useState } from "react";
import ErrorBox from "../components/errorBox";
import SuccessBox from "../components/successBox";
import { convertToFormdata, skinUrl } from "../constants/global";

import { useTranslation } from "react-i18next";

function ComponentVoucher (props){

    const method = props.methodInfo;

    const SKIN = props.skin;
    const USER = props.user;

    const { t, i18n } = useTranslation();

    const [inputs, setInputs] = useState({"user_id":USER["id"],"method":method.method_code});

    const [error, setError] = useState(false);
    const [success, setSuccess] = useState(false);

    const [errorMessages, setErrorMessages] = useState([]);

    const handleChange = (event) => {

        console.log(inputs)

        const name = event.target.name;
        const value = event.target.value;

        setInputs(values => ({...values,[name]: value}))
    }

    const handleSubmit = async () =>{
        try {

            const data = await axios
            ({
                method:"post",
                url:skinUrl+"rest/deposit-gateway.php",
                data:convertToFormdata(inputs)
            })
            .then(response => {
        
                if(response.data.status=="ok"){

                    unsetInput();
                    setSuccess(true);
                    setError(false);

                }else if(response.data.status=="error"){

                    setError(true);
                    setSuccess(false);

                    var arrUtilizzo = [];

                    arrUtilizzo.push(response.data.message)

                    setErrorMessages(arrUtilizzo)

                }else{
                    alert(t('erroregenerico'));  
                }
            })

        } catch (e) {

            alert(t('erroregenerico')); console.log(e);
        }
    }

    const unsetInput = () =>{

        setInputs({"user_id":USER["id"],"method":method.method_code});
    }

    return (
        <>
            <div className="col-lg-9 col-md-12">
                <table width="100%" className="table table-bordered">
                    <tbody>
                        <tr>
                            <td>
                                    
                                <h2 className="virtual-title">{t('versamentocon')} {method.name}</h2>
                                <hr className="border-hr" />

                                <div className="row">
                                    <div className="col-md-3">
                                        <img src={method.img} />
                                    </div>
                                    <div className="col-md-9">
                                        {t('descrlvoucher')}                    
                                    </div>
                                </div>

                                {error ? <ErrorBox message={errorMessages}/> : <></>}
                                {success ? <SuccessBox message={t('depositosuccess')}/> : <></>}

                                <div className="row">

                                    <div className="col-sm-8 pd-r-2">

                                        <label for="amount" className="color-top"><strong>{t('codvoucher')}:</strong>({t('codcinque')})</label>

                                        <input type="text" name="codiceVoucher" value={inputs.codiceVoucher || ""} onChange={handleChange} autocomplete="off" className="form-control margin-bottom-5" id="codiceVoucher" placeholder={t('insertcode')} />

                                    </div>

                                    <div className="col-sm-4  pd-l-2" align="center">
                                        <button onClick={()=>handleSubmit()} className="login">Incassa subito il Voucher<i className="fa fa-angle-right"></i></button>
                                    </div>

                                </div>

                                <hr />
                            
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </>
    )
}

export {ComponentVoucher};