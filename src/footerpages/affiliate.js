import React,{useState} from "react";
import { useTranslation } from "react-i18next";
import ErrorBox from "../components/errorBox";
import axios from "axios";
import { ConvertObjectToArrayErrors, convertToFormdata, skinUrl, TEMPLATE_WEBDIR } from "../constants/global";
import SuccessBox from "../components/successBox";
import { Loader } from "../components/spinner";


function Affiliate (props){

    const USER = props.user;
    const logged = props.islogged ? 1 : 0;
    const SKIN = props.skin;

    const [error, setError] = useState(false);
    const [success, setSuccess] = useState(false);

    const [errorMessages, setErrorMessages] = useState([]);

    const [inputs, setInputs] = useState({"user_id": logged == 1 ? USER["id"] : '', "checkPrivacy" : 0, "name": logged == 1 ? USER["firstname"]+" "+USER["lastname"] : '', "email" : logged == 1 ? USER["email"] : '', "mobile" : logged == 1 ? USER["mobile"] : '' });

    const[loader, setLoader] = useState(false);

    const { t, i18n } = useTranslation();

    const handleChange = (event) => {

        const name = event.target.name;
        const value = event.target.value;

        setInputs(values => ({...values,[name]: value}))
    }

    const handlePrivacy = () => {

        if(inputs.checkPrivacy==0){
            setInputs(values => ({...values, "checkPrivacy": 1 }));
        }else{
            setInputs(values => ({...values, "checkPrivacy": 0 }));
        }
    }

    const SendData = async() =>{
        try {

            const data = await axios
            ({
                method:"post",
                url:skinUrl+"rest/affiliation-request.php",
                data:convertToFormdata(inputs)
            })
            .then(response => {
        
                if(response.data.status=="ok"){

                    setLoader(false);

                    unsetInput();
                    setSuccess(true);
                    setError(false);

                }else if(response.data.status=="error"){

                    setLoader(false);

                    setError(true);
                    setSuccess(false);

                    setErrorMessages(ConvertObjectToArrayErrors(response.data.params.errors))

                }else{

                    alert(t('erroregenerico'));  
                }
            })

        } catch (e) {

            alert(t('erroregenerico')); 
            console.log(e);
        }
    }

    const handleSubmit = () =>{
        setLoader(true);
        SendData();
    }

    const unsetInput = () =>{

        setInputs({"user_id": logged == 1 ? USER["id"] : '' });
    }

    return (
        <>
            <section className="hero-section">
                <div className="container">
                    <div className="row align-items-center">
                        <div className="col-12 hero-text-image">
                            <div className="row">
                    
                                <div className="col-lg-6 text-lg-start">
                        
                                    <h1 data-aos="fade-right" className="title-1">{t('affiliazione')}</h1>
                                    <h3 className="subtitle-1" data-aos="fade-right" data-aos-delay="100">{t('p1affiliazione')}</h3>
                                    <p data-aos="fade-right" data-aos-delay="100">{t('p2affiliazione')}</p>

                                    {error ? <ErrorBox message={errorMessages} /> : <></>}
                                    {success ? <SuccessBox param={"Complimenti, la tua richiesta di affiliazione è stata inviata correttamente, verrai contattato il prima possbile da un operatore!"} /> : <></>}

                                    <div className="row">
                                        <div className="col-md-12 form-group">
                                            <label htmlFor="name" className="form-contact-1">{t('nome')} {t('e')} {t('cognome')}</label>
                                            <input type="text" name="name" value={inputs.name || "" } onChange={handleChange} placeholder={logged==1 ? USER["firstname"]+" "+USER["lastname"] : t('inseriscinem')} className="form-control" id="name" readOnly={logged==1 ? "readOnly" : ""} />
                                        </div>

                                        <div className="col-md-6 form-group">
                                            <label htmlFor="email" className="form-contact-1">Email</label>
                                            <input type="text" className="form-control" value={inputs.email || "" } onChange={handleChange} placeholder={logged==1 ? USER["email"] : "inserisci email..."} name="email" id="email" readOnly={logged==1 ? "readOnly" : ""} />
                                        </div>

                                        <div className="col-md-6 form-group">
                                            <label htmlFor="mobile" className="form-contact-1">{t('ntelefono')}</label>
                                            <input type="text" className="form-control" value={inputs.mobile || "" } onChange={handleChange} placeholder={logged==1 ? USER["mobile"] : t('inseriscic')} name="mobile" id="mobile" readOnly={logged==1 ? "readOnly" : ""} />
                                        </div>

                                        <div className="col-md-12 form-group">
                                            <label htmlFor="message" className="form-contact-1">{t('messaggio')}</label>
                                            <textarea className="form-control" name="message" value={inputs.message || "" } onChange={handleChange} placeholder={t('inseriscim')} id="message"></textarea>
                                        </div>

                                        <div className="col-md-6 form-group">
                                            <input type="checkbox" id="checkPrivacy" name="checkPrivacy" onClick={()=>handlePrivacy()}/>
                                            <label htmlFor="checkPrivacy" className="form-contact-1">{t('testoprivacy')} </label>
                                        </div>

                                        <div className="col-md-6 form-group">
                                            {!loader ? <button onClick={()=>handleSubmit()} className="btn btn-primary d-block w-100" value={t('invia')}></button> : <Loader />}
                                        </div>
                                    </div>

                                </div>

                                <div className="col-lg-6 iphone-wrap">
                                    <img src={skinUrl+TEMPLATE_WEBDIR(SKIN)+"/assets/img/affiliate/money-man.png"} alt="Image" className="phone-1" data-aos="fade-right" />
                                </div>	
                        
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            <section className="section">
                <div className="container">
                    <div className="row ">
                        <div className="col-md-6 aos-init aos-animate" data-aos="fade-up">
                            <p className="section-heading">{t('affiliazionea')+SKIN["meta_title"]+t('affiliazionea2')}</p>
                        </div>
                        <div className="col-md-6 aos-init aos-animate" data-aos="fade-up">
                            <p className="section-heading">{SKIN["meta_title"]+t('affiliazionep3')}</p>
                        </div>
                    </div>
                </div>
            </section>
        </>
    )
}

export default Affiliate;


        