import React,{useEffect, useState} from "react";
import { PromoCode } from "./componentpromocode"
import { useTranslation } from "react-i18next";
import ErrorBox from "../components/errorBox";
import axios from "axios";
import { api, convertToFormdata, skinUrl } from "../constants/global";
import FrameDeposit from "./iframesucces";

function ComponentIntouch (props){

    const method = props.methodInfo;

    const SKIN = props.skin;
    const USER = props.user;

    const [error, setError] = useState(false);
    const [success, setSuccess] = useState(false);

    const [errorMessages, setErrorMessages] = useState([])

    const [src, setSrc] = useState('');

    const { t, i18n } = useTranslation();

    const [inputs, setInputs] = useState({"user_id":USER["id"],"method":method.method_code});

    const handleChange = (event) => {

        const name = event.target.name;
        const value = event.target.value;

        setInputs(values => ({...values,[name]: value}))
    }

    const handleChangePromocode = () => {

        if(inputs.have_promocode==0){
            setInputs(values => ({...values,"have_promocode":1}))
        }else{
            setInputs(values => ({...values,"have_promocode":0}))
        } 
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
                    setSrc(response.data.params.url);

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

    const getDefaultPromoActive = async () =>{

        try {
    
            const data = await api
            .get('rest/defaultpromoactive/:'+USER["id"]+'/')
            .then(response => {
      
              if(response.data.status=="ok"){
      
                setInputs(inputs =>({...inputs,  "have_promocode": 1,  "promocode": response.data.dati}))
      
              }else{
      
                setInputs(inputs =>({...inputs,  "have_promocode": 0,  "promocode": ''}))
              }
            })
      
        } catch (e) {
    
            alert(t('erroregenerico'));  
            console.log(e);
        }
    }

    useEffect(()=>{
        getDefaultPromoActive();
    },[]);

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

                                <h2 className="virtual-title">{t('versamentocon')} Intouch</h2>
                                <hr className="border-hr" />

                                <div className="col-md-12">
                                    <div className="alert alert-warning">
                                        <div className="alert-text">
                                            {t('descrlint')}
                                        </div>
                                    </div>
                                </div>

                                {error ? <ErrorBox message={errorMessages}/> : <></>}
                                {success ? <FrameDeposit src={src}/> : <></>}

                                <div className="row">
                                    <div className="col-sm-6">
                                        <label for="intouch_region" className="color-top"><strong>Pays</strong></label>
                                        <select name="intouch_region" id="intouch_region" className="form-control margin-bottom-5" value={inputs.intouch_region || ""} onChange={handleChange}>
                                            <option value="">-Sélectionner-</option>
                                            <option value="1">BURKINA - Orange</option>
                                            <option value="5">BURKINA - Mobicash</option>
                                            <option value="15">Côte d’Ivoire - Orange</option>
                                            <option value="25">Côte d’Ivoire - MTN</option>
                                            <option value="20">Côte d’Ivoire - MOOV</option>
                                            <option value="30">Cameroun - Orange</option>
                                            <option value="35">Cameroun - MTN</option>
                                            <option value="40">Senegal - Orange</option>
                                            <option value="45">Senegal - Tigo</option>
                                            <option value="50">Senegal - E-MONNEY</option>
                                            <option value="60">Mali - Orange</option>
                                            <option value="65">Mali - Mobicash</option>
                                        </select>
                                    </div>
                                </div>

                                <div className="row">
                                    <div className="col-sm-6">
                                        <label for="phone_number" className="color-top"><strong>Portable</strong></label>
                                        <input type="text" name="phone_number" value={inputs.phone_number || ""} onChange={handleChange} autocomplete="off" className="form-control margin-bottom-5" id="phone_number" placeholder="" /> 
                                    </div>
                                </div>

                                <div className="row" id="intouch_otp_box" hidden={inputs.intouch_region == 1 ? "" : "hidden"}>
                                    <div className="col-sm-6">
                                        <label for="intouch_otp" className="color-top"><strong>OTP</strong></label>
                                        <input type="text" name="intouch_otp" value={inputs.intouch_otp || ""} onChange={handleChange} autocomplete="off" className="form-control margin-bottom-5" id="intouch_otp" placeholder="" />
                                    </div>
                                </div>

                                <div className="row">
                                    <div className="col-sm-6">
                                        <label for="amount_fiat" className="color-top"><strong>{t('importodav')} EUR</strong></label>
                                        <input type="text" name="amount" value={inputs.amount || ""} onChange={handleChange} autocomplete="off" className="form-control margin-bottom-5" id="amount_fiat" placeholder={t('inserisciim')} />
                                    </div>
                                </div>


                                <hr className="border-hr" />

                                <PromoCode handleChangePromocode={handleChangePromocode} handleChange={handleChange} inputs={inputs}/>

                                <div className="row">
                                    <div className="col-md-12">
                                        <div className="col-sm-4  pd-l-2" align="center">
                                            <button className="login" onClick={()=>handleSubmit()}>{t('procedip')}<i className="fa fa-angle-right"></i></button>
                                        </div>
                                    </div>
                                </div>

                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </>
    )
}

export {ComponentIntouch}