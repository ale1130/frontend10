import axios from "axios";
import React, { useState } from "react";
import ErrorBox from "../components/errorBox";
import SuccessBox from "../components/successBox";
import { convertToFormdata, skinUrl, stringToHTML } from "../constants/global";

import { useTranslation } from "react-i18next";
import { ModalVoucher } from "../components/modalvoucher";

function ComponentVoucherW (props){

    const method = props.methodInfo;

    const SKIN = props.skin;
    const USER = props.user;

    const [error, setError] = useState(false);
    const [success, setSuccess] = useState(false);

    const [button, setButton] = useState(["empty"]);
    const [show, setShow] = useState(false);

    const [errorMessages, setErrorMessages] = useState([]);
    const [successMessage, setSuccessMessage] = useState('');

    const { t, i18n } = useTranslation();

    const [inputs, setInputs] = useState({"user_id":USER["id"],"method":method.method_code });

    const handleChange = (event) => {

        const name = event.target.name;
        const value = event.target.value;

        setInputs(values => ({...values,[name]: value}))
    }

    const handleSubmit = async () =>{
        try {

            const data = await axios
            ({
                method:"post",
                url:skinUrl+"rest/createVoucher.php",
                data:convertToFormdata(inputs)
            })
            .then(response => {
        
                if(response.data.status=="ok"){

                    unsetInput();
                    setSuccess(true);

                    setButton(response.data.params.voucher);

                    setSuccessMessage(response.data.message);
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

        setInputs({"user_id":USER["id"],"method":method.method_code });
    }

    const visualVoucher=()=>{
        setShow(true);
    }

    return (
        <>
            <div className="col-lg-9 col-md-12">
                <table width="100%" className="table table-bordered">
                    <tbody>
                        <tr>
                            <td>

                            {<ModalVoucher 
                                modalState={show} 
                                closeModal={() => setShow(false)}
                                voucher={button}
                                skin={SKIN}
                            />}
                                    
                                <h2 className="virtual-title">Prelievo con {method.name}</h2>
                                <hr className="border-hr" />

                                <div className="row">
                                    <div className="col-md-3">
                                        <img src={method.img} />
                                    </div>
                                    <div className="col-md-9">
                                        I Voucher rappresentano la soluzione ideale per chi vuole ricaricare il proprio conto di gioco in modo rapido e sicuro.
                                        I Voucher funzionano come una normale ricarica telefonica, con un codice da immettere sul sito.
                                        Dopo aver convalidato il codice, ricevereai in maniera istantanea il credito sul conto gioco senza il pagamento di alcuna commissione.                    
                                    </div>
                                </div>

                                {error ? <ErrorBox message={errorMessages}/> : <></>}
                                {success ? <SuccessBox message={successMessage} param={<a href="/account/vouchers">Vai alla tua area Voucher</a>}/> : <></>}

                                {button!="empty" ? <button onClick={()=>visualVoucher()}>Visualizza voucher</button> : ""}

                                <div className="row">

                                    <div className="col-sm-8 pd-r-2">

                                        <strong>Importo da prelevare</strong> Importo minimo: {method.min_with} {SKIN["currency"]}

                                        <input type="text" name="amount" value={inputs.amount || ""} onChange={handleChange} autoComplete="off" className="form-control margin-bottom-5" id="amount" placeholder="Inserisci qua il codice del tuo Voucher" />

                                    </div>

                                    <div className="col-sm-4  pd-l-2" align="center">
                                        <button onClick={()=>handleSubmit()} className="login">Genera subito il tuo voucher<i className="fa fa-angle-right"></i></button>
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

export {ComponentVoucherW};