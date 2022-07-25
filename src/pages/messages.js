import React, { useEffect, useState } from "react";

import axios from "axios";

import { skinUrl, convertToFormdata, convertDate, api } from "../constants/global";

import Profile from "../pages/profile";

import { useTranslation } from "react-i18next";
import { SelectCatMex, SelectMexStato, SelectPage, SelectPeriod } from "../components/selectors";
import { Loader } from "../components/spinner";
import { ModalMessage } from "../components/modalmessage";

function Messages(props) {

    const USER = props.datiUtente;

    const countMessages = props.countMessages;

    const { t, i18n } = useTranslation();

    const [inputs, setInputs] = useState({ "user_id": USER["id"], "page": 1 });

    const [messages, setMessages] = useState(["empty"]);
    const [loader, setLoader] = useState(true);

    const [pages, setPages] = useState(0);

    const [realMessage, setRealMessage] = useState(["empty"]);
    const [show, setShow] = useState(false);

    const handleChange = (event) => {
        const name = event.target.name;
        const value = event.target.value;

        setInputs(values => ({ ...values, [name]: value }))
    }

    const handleChangeData = (event, data, indice) => {

        const index = indice;
        const value = event;

        let date = JSON.stringify(value);

        var dataTradotta = date.slice(1, 11);

        setInputs(values => ({ ...values, [index]: dataTradotta }))
    }

    const SendData = async () => {

        setLoader(true);

        try {

            const data = await axios
                ({
                    method: "post",
                    url: skinUrl + "rest/messages.php",
                    data: convertToFormdata(inputs)
                })
                .then(response => {

                    if (response.data.status == "ok") {

                        setMessages(response.data.message);
                        setPages(response.data.params.total_pages);

                        if (inputs.page > response.data.params.total_pages) {
                            setInputs(inputs => ({ ...inputs, "page": 1 }));
                        }

                    } else if (response.data.status == "norecords") {
                        setPages(0);
                        setMessages([]);
                        setInputs(inputs => ({ ...inputs, "page": 1 }));
                    } else {

                        alert(t('erroregenerico'));
                    }
                })

        } catch (e) {

            alert(t('erroregenerico')); console.log(e);
        }
    };

    useEffect(() => {

        SendData();

    }, [inputs.page])

    useEffect(() => {

        if (messages != "empty") {
            setLoader(false);
        }
    }, [messages])

    const reload = () => {

        SendData();
    }

    const unsetInput = () => {

        setInputs({ "user_id": USER["id"], "page": 1 });
    }

    const sendPreviousPage = () => {
        if (inputs.page > 1) {
            setInputs(inputs => ({ ...inputs, "page": parseInt(inputs.page) - 1 }));
        }
    }

    const sendNextPage = () => {
        if (inputs.page < pages) {
            setInputs(inputs => ({ ...inputs, "page": parseInt(inputs.page) + 1 }));
        }
    }

    const DeleteMessage = async (id) => {

        try {

            const data = await api
                .get('rest/deletemessage/:' + id + "/")
                .then(response => {

                    if (response.data.status == "ok") {

                        SendData();

                    } else if (response.data.status == "error") {

                        alert(t('erroregenerico'));
                        setLoader(false);
                    } else {

                        setLoader(false);
                        alert(t('erroregenerico'));
                    }
                })

        } catch (e) {

            alert(t('erroregenerico')); console.log(e);
        }
    }

    const VisualMessage = async (id) => {

        try {

            const data = await api
                .get('rest/visualmessage/:' + id + "/")
                .then(response => {

                    if (response.data.status == "ok") {

                        setRealMessage(response.data.params);
                        SendData();

                    } else if (response.data.status == "error") {

                        alert(t('erroregenerico'));
                        SendData();
                        setLoader(false);
                    } else {

                        alert(t('erroregenerico'));
                        SendData();
                        setLoader(false);
                    }
                })

        } catch (e) {

            alert(t('erroregenerico')); console.log(e);
        }
    }

    useEffect(() => {

        if (realMessage != "empty") {
            setShow(true);
            setLoader(false);
        }
    }, [realMessage])

    const ChangeState = (id, stato) => {

        setLoader(true);

        if (stato == 2) {

            if (window.confirm('Sicuro di voler elimare il messaggio selezionato?')) {

                DeleteMessage(id);
            } else {
                setLoader(false);
            }
        } else {

            VisualMessage(id);
        }
    };

    return (
        <>
            <div className="container-fluid body-content">
                <div className="row">

                    {<Profile paginaAttuale={"messages"} datiUtente={USER} countMessages={countMessages} />}

                    {<ModalMessage
                        modalState={show}
                        closeModal={() => setShow(false)}
                        message={realMessage}
                    />}

                    <div className="col-md-12 col-lg-9">
                        <table width="100%" className="table table-bordered">
                            <tbody>
                                <tr>
                                    <td>

                                        <h2 className="virtual-title">{t('messaggir')}</h2>



                                        <div className="row">

                                            <div className="col-md-6 form-group">

                                                <label>{t('categoriam')}:</label>

                                                <SelectCatMex name={"message_cat"} value={inputs.message_cat || ""} onchange={() => handleChange} />
                                            </div>

                                            <div className="col-lg-6 col-md-8 margin-top-14px">
                                                <label className="col-form-label">{t('oggetto')}:</label>
                                                <input type="text" className="form-control kt-input" placeholder="Oggetto" name="object" id="object" value={inputs.object || ""} onChange={handleChange} />
                                            </div>

                                            <div className="col-lg-6 col-md-8 margin-top-14px">

                                                <label className="col-form-label">{t('datarice')}:</label>

                                                <SelectPeriod onchange={handleChangeData} />

                                            </div>

                                            <div className="col-lg-6 col-md-8 margin-top-14px">
                                                <label className="col-form-label">{t('statom')}:</label>

                                                <SelectMexStato name={"message_stato"} value={inputs.message_stato || ""} onchange={() => handleChange} />
                                            </div>

                                            <div className="col-md-12 form-group">
                                                <div>
                                                    <button onClick={reload} className="login button-account-m-p" id="btnRicerca" name="btnRicerca" ><i className="fa fa-search"></i> {t('cerca')} </button>
                                                    <button onClick={unsetInput} className="login button-account-m-p" id="btnFiltri" name="btnFiltri"><i className="fa fa-times"></i> {t('toglifiltri')}</button>
                                                </div>
                                            </div>

                                        </div>



                                        {pages && pages > 1 ?

                                            <>

                                                <div className="row">

                                                    <div className="col-sm-6">

                                                        <div className="no-b">
                                                            <button href="" onClick={sendPreviousPage}>-</button><span className="text-muted"><SelectPage pages={pages} onchange={() => handleChange} value={inputs.page || ""} /></span><button href="" onClick={sendNextPage}>+</button>

                                                        </div>

                                                    </div>

                                                    <div className="col-6">
                                                        <strong>{t('totalep')}{pages}</strong>
                                                    </div>
                                                </div>

                                            </>

                                            :

                                            <></>

                                        }

                                        <div className="clearfix"></div>

                                        <div className="pagination-content;"></div>

                                        <a onClick={() => reload()}><span className="fa fa-refresh"></span>{t('aggiorna')}</a>

                                        {loader ? <Loader /> :

                                            <>

                                                <div className="table-responsive" id="messagesElenco" name="messagesElenco">
                                                    <div className="table-responsive" id="messagesElenco" name="messagesElenco">
                                                        <table className="responsive-p">
                                                            <thead>
                                                                <tr>
                                                                    <td scope="col">
                                                                        {t('oggetto')}
                                                                    </td>
                                                                    <td scope="col">
                                                                        {t('categoria')}
                                                                    </td>
                                                                    <td scope="col">
                                                                        {t('stato')}
                                                                    </td>
                                                                    <td scope="col">
                                                                        {t('datarice')}
                                                                    </td>
                                                                    <td scope="col">
                                                                        {t('azioni')}
                                                                    </td>
                                                                </tr>
                                                            </thead>

                                                            {pages ?

                                                                <>
                                                                    <tbody>
                                                                        {messages.map(messaggio => {
                                                                            return (
                                                                                <tr key={messaggio.id}>

                                                                                    <>
                                                                                        <td>
                                                                                            {messaggio.object}
                                                                                        </td>
                                                                                        <td>
                                                                                            {messaggio.typo}
                                                                                        </td>
                                                                                        <td>
                                                                                            {messaggio.stato == 1 ? "Già letto" : "Non letto"}
                                                                                        </td>
                                                                                        <td>
                                                                                            {convertDate(messaggio.addedTime)}
                                                                                        </td>
                                                                                        <td>
                                                                                            {messaggio.stato == 1 ? <><button onClick={() => ChangeState(messaggio.id, 1)}>{t('visual')}</button>/<button onClick={() => ChangeState(messaggio.id, 2)}>{t('delete')}</button></> : <button onClick={() => ChangeState(messaggio.id, 1)}>{t('visual')}</button>}
                                                                                        </td>
                                                                                    </>
                                                                                </tr>
                                                                            )
                                                                        })}
                                                                    </tbody>
                                                                </>

                                                                :

                                                                <>
                                                                    <tbody>
                                                                        <tr>
                                                                            <td colSpan="5">
                                                                                {t('nomex')}
                                                                            </td>
                                                                        </tr>
                                                                    </tbody>
                                                                </>

                                                            }
                                                        </table>
                                                        
                                                        <br />
                                                    </div>
                                                </div>
                                            </>
                                        }
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

export default Messages;