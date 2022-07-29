import React, { useEffect, useState } from "react";

import Profile from "../pages/profile";

import ErrorBox from "../components/errorBox";
import SuccessBox from "../components/successBox";

import { api } from "../constants/global";
import { useTranslation } from "react-i18next";
import { Loader } from "../components/spinner";

function Password(props) {

    const { t, i18n } = useTranslation();

    const USER = props.datiUtente;

    const countMessages = props.countMessages;

    const [done, setDone] = useState(0);
    const [loader, setLoader] = useState(false);

    const [inputs, setInputs] = useState({});

    const [modalError, setModalError] = useState(false);
    const [errorMessage, setErrorMessage] = useState([]);

    const [modalSuccess, setModalSuccess] = useState(false);
    const [successMessage, setSuccessMessage] = useState("");

    const [myClass, setMyClass] = useState("password");
    const [myClass2, setMyClass2] = useState("password");
    const [myClass3, setMyClass3] = useState("password");

    const handleChange = (event) => {
        const name = event.target.name;
        const value = event.target.value;
        setInputs(values => ({ ...values, [name]: value }))
    }

    const error = (errors) => {

        setErrorMessage(errors);

        setModalSuccess(false);
        setModalError(true);
    }

    const success = (message = "Complimenti") => {

        setModalError(false);

        setSuccessMessage(message);
        setModalSuccess(true);
    }

    const changePassword = async () => {
        try {

            const data = await api
                .post('rest/change-password/:' + inputs.newpassword + '/:' + USER["id"] + "/")
                .then(response => {

                    if (response.data.status == "ok") {

                        success(t('cambiopassword'));
                        setDone(done + 1);
                    } else {
                        alert(t('erroregenerico'));
                        setDone(done + 1);
                    }
                })
        } catch (e) {

            alert(t('erroregenerico')); console.log(e);
        }
    };

    const handleSubmit = (event) => {

        setLoader(true);
        var errorMsg = [];
        event.preventDefault();

        if (!inputs.oldpassword || !inputs.newpassword || !inputs.renewpassword) {
            errorMsg[0] = t('mettidati');
        } else {
            if (inputs.oldpassword != USER["realpass"]) {
                errorMsg[1] = t('oldpswnot');
            }

            if (inputs.newpassword == USER["realpass"]) {
                errorMsg[2] = t('nuovauguale');
            }

            if (inputs.newpassword != inputs.renewpassword) {
                errorMsg[3] = t('pswsnot');
            }
        }

        if (errorMsg.length > 0) {

            error(errorMsg);

            setLoader(false);
        } else {

            changePassword();
        }
    }

    useEffect(() => {
        if (done != 0) {
            setLoader(false);
        }
    }, done)

    const changeClass = () => {

        if (myClass == "password")
            setMyClass("text")
        else
            setMyClass("password")
    }

    const changeClass2 = () => {

        if (myClass2 == "password")
            setMyClass2("text")
        else
            setMyClass2("password")
    }

    const changeClass3 = () => {

        if (myClass3 == "password")
            setMyClass3("text")
        else
            setMyClass3("password")
    }

    return (
        <>
            <div className="container-fluid body-content">
                <div className="row">
                    {<Profile paginaAttuale={"password"} datiUtente={USER} countMessages={countMessages} />}

                    <div className="col-md-12 col-lg-9">
                        <table width="100%" className="table table-bordered">
                            <tbody>
                                <tr>
                                    <td>

                                        <h2 className="virtual-title">{t('cambiapassword')}</h2>

                                        <form onSubmit={handleSubmit} className="form-signUp clearForm">

                                            {modalError ? <ErrorBox message={errorMessage} /> : ""} {modalSuccess ? <SuccessBox message={successMessage} /> : ""}

                                            {loader ? <Loader /> : ""}

                                            <table width="100%" className="table table-bordered profile-table">
                                                <tbody>

                                                    <tr>

                                                        <td>
                                                            <strong>Password {t('attuale')}</strong>
                                                        </td>

                                                        <td>

                                                            <div className="input-group ">

                                                                <input type={myClass} name="oldpassword" id="oldpassword" value={inputs.oldpassword || ""} onChange={handleChange} className="form-control" />

                                                                <div className="input-group-prepend">
                                                                    <span className="input-group-text" id="basic-addon1"> <a className="bi bi-eye-slash" id="occhio1" onClick={() => changeClass()}>occhio</a></span>
                                                                </div>
                                                            </div>
                                                        </td>
                                                    </tr>

                                                    <tr>

                                                        <td width="35%">
                                                            <strong>{t('nuova')} password</strong>
                                                        </td>

                                                        <td>

                                                            <div className="input-group ">

                                                                <input type={myClass2} name="newpassword" id="newpassword" value={inputs.newpassword || ""} onChange={handleChange} className="form-control" />

                                                                <div className="input-group-prepend">
                                                                    <span className="input-group-text" id="basic-addon1"> <a className="bi bi-eye-slash" id="occhio1" onClick={() => changeClass2()}>occhio</a></span>
                                                                </div>
                                                            </div>
                                                        </td>
                                                    </tr>

                                                    <tr>
                                                        <td>
                                                            <strong>{t('ripeti')} password</strong>
                                                        </td>

                                                        <td>
                                                            <div className="input-group ">

                                                                <input type={myClass3} name="renewpassword" id="renewpassword" value={inputs.renewpassword || ""} onChange={handleChange} className="form-control" />
                                                                <div className="input-group-prepend">
                                                                    <span className="input-group-text" id="basic-addon1"> <a className="bi bi-eye-slash" id="occhio1" onClick={() => changeClass3()}>occhio</a></span>
                                                                </div>
                                                            </div>
                                                        </td>
                                                    </tr>

                                                </tbody>
                                            </table>

                                            <input type="submit" className="login" id="changePassword" value={t('salva') + " password"} />

                                        </form>

                                    </td>
                                </tr>
                            </tbody>
                        </table>

                    </div>
                </div>
            </div>
        </>
    )
}

export default Password;