import React,{useState} from "react";
import { useTranslation } from "react-i18next";
import ErrorBox from "../components/errorBox";
import axios from "axios";
import { convertToFormdata, skinUrl } from "../constants/global";
import SuccessBox from "../components/successBox";

function ComponentPixW(props) {

    const method = props.methodInfo;

    const SKIN = props.skin;
    const USER = props.user;

    const [error, setError] = useState(false);
    const [success, setSuccess] = useState(false);

    const [errorMessages, setErrorMessages] = useState([]);
    const [successMessage, setSuccessMessage] = useState('');

    const { t, i18n } = useTranslation();

    const [inputs, setInputs] = useState({"user_id":USER["id"],"method":method.method_code, "cpf": USER["document_number"].length == 14 ? USER["document_number"] : "", "pixtype": "CPF" });

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
                url:skinUrl+"rest/withdrawal-gateway.php",
                data:convertToFormdata(inputs)
            })
            .then(response => {
        
                if(response.data.status=="ok"){

                    unsetInput();
                    setSuccess(true);
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

        setInputs({"user_id":USER["id"],"method":method.method_code, "cpf": USER["document_number"].length == 14 ? USER["document_number"] : "","pixtype": "CPF" });
    }

    return (
        <>
            <table className="table table-bordered">
                <tbody>
                    <tr>
                        <td>
                            <h2 className="virtual-title">{t('prelievocon')} {method.name}</h2>
                            <h4 className="virtual-title">{t('formprelievo')}</h4>
                            <hr className="border-hr" />

                            <div className="row">
                                <div className="col-md-3">
                                    <img src={method.img} className="imgpay"/>
                                </div>

                                <div className="col-md-9">
                                    {t('descrlpix')}
                                </div>
                            </div>

                            {error ? <ErrorBox message={errorMessages}/> : <></>}
                            {success ? <SuccessBox message={successMessage}/> : <></>}

                            <div className="row">

                                <div className="col-sm-4">

                                    <label htmlFor="amount" className="color-top">

                                        <strong>{t('importodaprev')}</strong> {t('importom')}: {method.min_with} {SKIN["currency"]}
                                    </label>

                                    <input type="text" name="amount" value={inputs.amount || ""} onChange={handleChange} className="form-control margin-bottom-5" id="amount" placeholder={t('insertim')} />
                                </div>

                                <div className="col-sm-4">
                                    <label htmlFor="fullname" className="color-top"><strong>{t('nec')}</strong></label>

                                    <input type="text" name="fullname" value={inputs.fullname || ""} onChange={handleChange} autoComplete="off" className="form-control" id="fullname" placeholder={t('insertnec')} />

                                </div>


                                <div className="col-sm-4">


                                    <label htmlFor="amount" className="color-top"><strong>{t('insertcpf')}</strong></label>

                                    <input type="text" name="cpf" value={inputs.cpf || ''} className="form-control margin-bottom-5" id="cpf" placeholder={t('insertcpf')} maxLength="14" readOnly />
                                </div>

                                <div className="col-sm-4">
                                    <label htmlFor="cpf" className="color-top"><strong>{t('keytype')}</strong></label>
                                    <select type="text" name="pixtype" autoComplete="off" className="form-control" id="pixtype" placeholder="" value={inputs.pixtype || ""} onChange={handleChange}>
                                        <option value="CPF">CPF</option>
                                        <option value="PHONE">PHONE</option>
                                        <option value="EMAIL">EMAIL</option>
                                        <option value="EVP">EVP</option>
                                    </select>
                                </div>

                                <div className="col-sm-4" hidden={inputs.pixtype=="CPF" ? "" : "hidden"}>
                                    <label htmlFor="pixkey" className="color-top"><strong>{t('key')}</strong></label>

                                    <input type="text" name="pixkey" value={inputs.pixkey || ""} onChange={handleChange} autoComplete="off" className="form-control" id="pixkey" placeholder={t('key')} />

                                </div>

                                <div className="col-sm-4">

                                    <button className="login" onClick={()=>handleSubmit()} >{t('procediprel')}<i className="fa fa-angle-right"></i></button>
                                </div>

                            </div>
                        </td>
                    </tr>
                </tbody>
            </table>
        </>
    )
}

export { ComponentPixW }