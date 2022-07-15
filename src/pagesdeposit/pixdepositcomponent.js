import React,{useEffect, useState} from "react";
import { PromoCode } from "./componentpromocode"
import { useTranslation } from "react-i18next";
import ErrorBox from "../components/errorBox";
import axios from "axios";
import { api, convertToFormdata, skinUrl } from "../constants/global";
import FrameDeposit from "./iframesucces";

function ComponentPix(props) {

    const method = props.methodInfo;

    const SKIN = props.skin;
    const USER = props.user;

    const [error, setError] = useState(false);
    const [success, setSuccess] = useState(false);

    const [errorMessages, setErrorMessages] = useState([]);
    const [src, setSrc] = useState('');

    const { t, i18n } = useTranslation();

    const [inputs, setInputs] = useState({"user_id":USER["id"],"method":method.method_code, "cpf": USER["document_number"].length == 14 ? USER["document_number"] : "" });

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
                    setSrc(response.data.url);
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

        setInputs({"user_id":USER["id"],"method":method.method_code, "cpf": USER["document_number"].length == 14 ? USER["document_number"] : "" });
    }

    useEffect(()=>{

        api
        .get(skinUrl+'rest/userprova/')
        .then(response => {

            console.log(response.data)
        })
    },[]) 

    return (
        <>
            <table className="table table-bordered">
                <tbody>
                    <tr>
                        <td>
                            <h2 className="virtual-title">Versamento con {method.name}</h2>
                            <hr className="border-hr" />

                            <div className="row">
                                <div className="col-md-3">
                                    <img src={method.img} className="imgpay"/>
                                </div>

                                <div className="col-md-9">
                                    PIX è un nuovo metodo di pagamento in Brasile per effettuare bonifici bancari diretti e istantanei, creato e di proprietà della Central Bank e utilizzato dalle banche brasiliane, dai conti digitali e dai wallet.
                                </div>
                            </div>

                            {error ? <ErrorBox message={errorMessages}/> : <></>}
                            {success ? <FrameDeposit src={src}/> : <></>}

                            <div className="row">

                                <div className="col-sm-4">

                                    <label htmlFor="amount" className="color-top">

                                        <strong>Importo da versare</strong> Importo minimo: {method.min_dep} {SKIN["currency"]}
                                    </label>

                                    <input type="text" name="amount" value={inputs.amount || ""} onChange={handleChange} className="form-control margin-bottom-5" id="amount" placeholder="Inserisci qui l'importo" />
                                </div>


                                <div className="col-sm-4">


                                    <label htmlFor="amount" className="color-top"><strong>Inserisci il tuo cpf</strong></label>

                                    <input type="text" name="cpf" value={inputs.cpf || ''} className="form-control margin-bottom-5" id="cpf" placeholder="Inserisci il tuo cpf" maxLength="14" readOnly />
                                </div>

                                <div className="col-sm-4">

                                    <button className="login" onClick={()=>handleSubmit()} >Procedi al pagamento <i className="fa fa-angle-right"></i></button>
                                </div>

                                <PromoCode handleChangePromocode={handleChangePromocode} handleChange={handleChange} inputs={inputs}/>
                            </div>
                        </td>
                    </tr>
                </tbody>
            </table>
        </>
    )
}

export { ComponentPix }