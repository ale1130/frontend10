import React, { useState } from "react";
import Modal from "react-modal";

import { skinUrl, convertToFormdata, ConvertObjectToArrayErrors } from "../constants/global";

import BoxPromo from './boxpromodefault'
import ErrorBox from "../components/errorBox";

import { SelectCountry } from './selectCountry';
import { SelectProvince } from './selectCountry';
import { SelectCity } from './selectCountry';

import SelectDate from './selectDate'

import axios from "axios";

import 'bootstrap/dist/css/bootstrap.min.css';

import { useTranslation } from "react-i18next";
import { RegistrationIcon } from "./icons";
import Cookies from 'universal-cookie';

Modal.setAppElement("#root");

function RegistrationModal(props) {

    const { t, i18n } = useTranslation();

    const close = props.closeModal;
    const SKIN = props.skin;

    const [inputs, setInputs] = useState({"conditions":false,"years":false, "model":"classic"});

    const [modalError, setModalError] = useState(false);

    const cookies = new Cookies();

    const [errorMessages, setErrorMessages] = useState([]);
    const [submit, setSubmit] = useState(false);

    const handleChange = (event) => {
        const name = event.target.name;
        const value = event.target.value;

        setInputs(inputs => ({ ...inputs, [name]: value }))
    }

    const handleChangeData = (data) => {

        let date = JSON.stringify(data);

        var dataFinale = date.slice(1, 11);

        setInputs(inputs => ({ ...inputs, "birthday": dataFinale }))
    }

    var CodiceFiscale = require('codice-fiscale-js');

    const CalcoloCodiceFiscale = () => {

        if (inputs.firstname && inputs.lastname && inputs.sex && inputs.birthday && inputs.city_birth) {

            const gender = inputs.sex;

            var dateObj = new Date(inputs.birthday);

            if (inputs.country_birth == 'IT') {
                CodiceFiscale = new CodiceFiscale({
                    name: inputs.firstname,
                    surname: inputs.lastname,
                    gender: gender.toUpperCase(),
                    day: dateObj.getUTCDate(),
                    month: dateObj.getUTCMonth() + 1,
                    year: dateObj.getUTCFullYear(),
                    birthplace: inputs.city_birth,
                });
            } else {

                alert(t('codicefiscaleerroreluogo'));

                CodiceFiscale = "";
            }

            setInputs(inputs => ({ ...inputs, "fiscal_code": CodiceFiscale.code }));

        } else {

            alert(t('errorecodicefiscale'));
        }
    }

    const SendData = async () => {

        try {

            const data = await axios
            ({
                method:"post",
                url:skinUrl+"rest/registration.php",
                data:convertToFormdata(inputs)
            })
            .then(response => {
        
                if(response.data.status=="ok"){

                    cookies.set('gio_uid', response.data.params.uid, { path: '/', sameSite:"none", secure:true });
                    cookies.set('gio_pass', response.data.params.passhash, { path: '/', sameSite:"none", secure:true });

                    window.location.href="/";

                }else if(response.data.status=="error"){

                    setSubmit(false)

                    setErrorMessages(ConvertObjectToArrayErrors(response.data.message.errors))
                    setModalError(true)

                }else{
                    alert(t('erroregenerico'));  
                }
            })

        } catch (e) {

            alert(t('erroregenerico')); console.log(e);
        }
    };

    const handleSubmit = () => {

        setSubmit(true);

        SendData();
    }

    return (
        <>

            <Modal isOpen={props.modalState} onRequestClose={close} className="mymodal largeStyleM" overlayClassName="myoverlay">

                <div className="row">

                    <>

                        {<BoxPromo skin={SKIN} />}

                        <div className={SKIN["default_promo"] ? "col-sm-8" : "col-sm-12"}>

                            <div className="row">
                                <div className="col-sm-12 pd-r-2">
                                    <h1 className="title registration-promo">
                                        <RegistrationIcon /> Registrati
                                    </h1>
                                </div>

                                {modalError ? <ErrorBox message={errorMessages}/> : <></>}

                                <div className="col-sm-6 pd-r-2">
                                    <label className="color-top" htmlFor="firstname">{t('nome')}</label>
                                    <input type="text" className="form-control margin-bottom-5" value={inputs.firstname || ""} onChange={handleChange} id="firstname" name="firstname" placeholder={"*" + t('nome')} />
                                </div>
                                <div className="col-sm-6 pd-l-2">
                                    <label className="color-top" htmlFor="lastname">{t('cognome')}</label>
                                    <input type="text" className="form-control margin-bottom-5" id="lastname" name="lastname" value={inputs.lastname || ""} onChange={handleChange} placeholder={"*" + t('cognome')} />
                                </div>
                                <div className="col-sm-6 pd-r-2">
                                    <label className="color-top" htmlFor="email">E-mail</label>
                                    <input type="email" className="form-control margin-bottom-5" id="email" name="email" value={inputs.email || ""} onChange={handleChange} placeholder="*E-mail" />
                                </div>
                                <div className="col-sm-6 pd-l-2">
                                    <label className="color-top" htmlFor="mobile">{t('cellulare')}</label>
                                    <input type="text" className="form-control margin-bottom-5" id="mobile" name="mobile" value={inputs.mobile || ""} onChange={handleChange} placeholder={"*" + t('cellulare')} />
                                </div>
                            </div>
                            <div className="row">
                                <div className="col-sm-12" id="div_country_residence">
                                    <label className="color-top" htmlFor="c">{t('statoresidenza')}</label>
                                    <SelectCountry name={"country_residence"} value={inputs.country_residence || ""} onchange={() => handleChange} />
                                </div>

                                {

                                    inputs.country_residence == 'IT' ?

                                        <>

                                            <div className="col-sm-6 pd-r-2 geo_residence_italy" id="div_province_residence">
                                                <label className="color-top" htmlFor="province_residence">{t('provinciaresidenza')}</label>
                                                <SelectProvince name={"province_residence"} value={inputs.province_residence || ""} onchange={() => handleChange} />
                                            </div>

                                            <div className="col-sm-6 pd-l-2 geo_residence_italy" id="city_residence">
                                                <label className="color-top" htmlFor="city_residence">{t('cittaresidenza')}</label>
                                                <span id="residence_selprovmsg">
                                                    <SelectCity name={"city_residence"} value={inputs.city_residence || ""} onchange={() => handleChange} />
                                                </span>

                                            </div>

                                        </>
                                        :

                                        <></>

                                }

                            </div>
                            <div className="row">
                                <div className="col-sm-8 pd-r-2">
                                    <label className="color-top" htmlFor="address_residence">{t('indirizzoresidenza')}</label>
                                    <input type="text" className="form-control margin-bottom-5" id="address_residence" value={inputs.address_residence || ""} onChange={handleChange} name="address_residence" placeholder={"*" + t('indirizzoresidenza')} />
                                </div>
                                <div className="col-sm-4 pd-l-2">
                                    <label className="color-top" htmlFor="zip_residence">{t('capresidenza')}</label>
                                    <input type="text" className="form-control margin-bottom-5" id="zip_residence" value={inputs.zip_residence || ""} onChange={handleChange} name="zip_residence" placeholder={"*" + t('capresidenza')} />
                                </div>
                            </div>
                            <div className="row">
                                <div className="col-sm-12" id="div_cliente_nazione">
                                    <label className="color-top" htmlFor="cliente_nazione">{t('statonascita')}</label>
                                    <SelectCountry name={"country_birth"} value={inputs.country_birth || ""} onchange={() => handleChange} />
                                </div>




                                {
                                    inputs.country_birth == 'IT' ?

                                        <>

                                            <div className="col-sm-6 pd-r-2 geo_italy" id="div_cliente_provincia">
                                                <label className="color-top" htmlFor="cliente_provincia">{t('provincianascita')}</label>
                                                <SelectProvince name={"province_birth"} value={inputs.province_birth || ""} onchange={() => handleChange} />
                                            </div>

                                            <div className="col-sm-6 pd-l-2 geo_italy" id="div_cliente_citta">
                                                <label className="color-top" htmlFor="citta">{t('cittanascita')}</label>
                                                <span id="selprovmsg">
                                                    <SelectCity name={"city_birth"} value={inputs.city_birth || ""} onchange={() => handleChange} />
                                                </span>
                                            </div>
                                        </>

                                        :

                                        <></>

                                }

                            </div>
                            <div className="birthday_box">
                                <div className="row">
                                    <div className="col-sm-6 pd-l-2">
                                        <label className="color-top" htmlFor="citta">{t('datanascita')}</label>
                                        <SelectDate value={inputs.birthday || ""} onchange={() => handleChangeData} />
                                    </div>
                                    <div className="col-sm-6 pd-l-2">
                                        <label className="color-top" htmlFor="sesso">{t('sesso')}</label>
                                        <select className="form-control margin-bottom-5" name="sex" id="sex" value={inputs.sex || ""} onChange={handleChange}>
                                            <option value="">{"--" + t('seleziona') + "--"}</option>
                                            <option value="m">{t('uomo')}</option>
                                            <option value="f">{t('donna')}</option>
                                        </select>
                                    </div>
                                </div>
                            </div>

                            {

                                inputs.country_residence == 'IT' ?

                                    <>

                                        <div className="row">
                                            <div className="col-sm-12" id="fiscal_code_area">
                                                <label className="color-top" htmlFor="fiscal_code">{t('codicefiscale')}</label>
                                                <div className="input-group  margin-bottom-5">
                                                    <input type="text" className="form-control" name="fiscal_code" id="fiscal_code" placeholder={"*" + t('codicefiscale')} aria-label="Fiscal Code" aria-describedby="basic-addon1" value={inputs.fiscal_code || ""} onChange={handleChange} />
                                                    <div className="input-group-append">
                                                        <span className="input-group-text" id="basic-addon1">
                                                            <button href="#" onClick={CalcoloCodiceFiscale}>{t('calcola')}</button>
                                                        </span>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>

                                    </>

                                    :
                                    <></>

                            }

                            <div className="row">
                                <div className="col-sm-6 pd-r-2">
                                    <label className="color-top" htmlFor="document_type">{t('tipodocumento')}</label>
                                    <select name="document_type" id="document_type" className="form-control margin-bottom-5" value={inputs.document_type || ""} onChange={handleChange}>
                                        <option value="">{"--" + t('seleziona') + "--"}</option>
                                        <option value="identity_card">{t('cartaid')}</option>
                                        <option value="passport">{t('passaporto')}</option>
                                        <option value="drivers_license">{t('patente')}</option>
                                    </select>
                                </div>
                                <div className="col-sm-6 pd-l-2">
                                    <label className="color-top" htmlFor="document_number">{t('numerodoc')}</label>
                                    <input type="text" className="form-control margin-bottom-5" id="document_number" name="document_number" placeholder={"*" + t('numerodoc')} value={inputs.document_number || ""} onChange={handleChange} />
                                </div>
                            </div>

                            <div className="row margin-regulation2">
                                <div className="col-sm-12 pd-l-2 pd-r-2">
                                    <label className="color-top" htmlFor="promoter_code">{t('codicepromotore')}</label>
                                    <input type="text" className="form-control margin-bottom-5" id="promoter_code" name="promoter_code" placeholder={"*" + t('codicepromotore')} value={inputs.promoter_code || ""} onChange={handleChange} />
                                </div>
                            </div>

                            <div className="row">
                                <div className="col-sm-6 pd-r-2">
                                    <label className="color-top" htmlFor="username">{t('nomeutente')}</label>
                                    <input type="text" className="form-control margin-bottom-5" id="username" name="username" placeholder={"*" + t('nomeutente')} value={inputs.username || ""} onChange={handleChange} />
                                </div>
                                <div className="col-sm-6 pd-l-2">
                                    <label className="color-top" htmlFor="password">Password</label>
                                    <input type="password" className="form-control margin-bottom-5" id="realpass" name="realpass" placeholder="*Password" value={inputs.realpass || ""} onChange={handleChange} />
                                </div>
                            </div>
                            <div className="row privacy_reg">
                                <div className="col-sm-12 pd-r-2">
                                    <input className="form-check-input" type="checkbox" name="terms_conditions" id="terms_conditions" onClick={() => setInputs(inputs => ({ ...inputs, "conditions" : !inputs.conditions }))} />
                                    <label className="form-check-label white" htmlFor="terms_conditions" >
                                        * {t('ho18anni')} </label>
                                </div>
                                <div className="col-sm-12 pd-l-2">
                                    <input className="form-check-input" type="checkbox" name="18years" id="18years" onClick={() => setInputs(inputs => ({ ...inputs, "years" : !inputs.years }))} />
                                    <label className="form-check-label white" htmlFor="18years">
                                        * <a href="">{t('termini')}</a> {t('e')} <a href="">{t('politicariservatezza')}</a> {t('sonoaccettate')}
                                    </label>
                                </div>
                            </div>

                            {submit ? <></> : <button type="submit" className="registration" onClick={() => { handleSubmit() }}>{t('registrati')}</button>}

                            <p className="white">{t('haigaccount')}? <a href="#" onClick={() => { props.openModalLogin(); close(); }}>{t('accediora')}</a></p>
                        </div>
                    </>
                </div >
            </Modal >
        </>
    );
}

export default RegistrationModal;