import React,{useEffect, useState} from "react";

import axios from "axios";

import { skinUrl, convertToFormdata, ConvertObjectToArrayErrors } from "../constants/global";

import Profile from "../pages/profile";
import ErrorBox from "../components/errorBox";
import SuccessBox from "../components/successBox";

import { useTranslation } from "react-i18next";
import { SelectCatMex, SelectMexStato, SelectPeriod } from "../components/selectors";
import { Loader } from "../components/spinner";

function Messages (props){

    const USER = props.datiUtente;

    const { t, i18n } = useTranslation();

    const [inputs, setInputs] = useState({"user_id":USER["id"],"page":1});

    const [modalError, setModalError] = useState(false);
    const [errorMessage, setErrorMessage] = useState([]);

    const [modalSuccess, setModalSuccess] = useState(false);
    const [successMessage, setSuccessMessage] = useState("");

    const [messages, setMessages] = useState(["empty"]);
    const [loader, setLoader] = useState(true);

    const [pages, setPages] = useState(0);
    //const [nowPage, setNowPage] = useState(0);

    const handleChange = (event) => {
        const name = event.target.name;
        const value = event.target.value;

        setInputs(values => ({...values,[name]: value}))
    }

    const handleChangeData = (event,data,indice) => {

        const index = indice;
        const value = data;
        
        let date = JSON.stringify(value);

        var dataTradotta = date.slice(1,11);

        setInputs(values => ({...values, [index]: dataTradotta}))
    }

    const error = (message=[]) =>{
        setModalSuccess(false);
        setModalError(true);

        console.log(message)

        setErrorMessage(message);
    }

    const success = (message="Complimenti") =>{
        setModalError(false);
        setModalSuccess(true);

        setSuccessMessage(message);
    }

    const unsetInput = () =>{

        setInputs({"user_id":USER["id"]});
    }
    
    const SendData = async () => {

        try{
    
          const data = await axios
            ({
                method:"post",
                url:skinUrl+"rest/messages.php",
                data:convertToFormdata(inputs)
            })
          .then(response => {
    
            console.log(response.data)
    
            if(response.data.status=="ok"){

                setMessages(response.data.message);
                setPages(response.data.params.total_pages);
                setInputs(inputs => ({...inputs,"page":1}));
              
            }else if(response.data.status=="norecords"){

                setMessages([]);
            }else{

                alert(t('erroregenerico'));
            }
          })
    
        }catch (e){
    
            alert(t('erroregenerico'));  console.log(e);
        }
    };

    const handleSubmit = (event) => {

        event.preventDefault();

        setLoader(true);

        SendData();
    }

    useEffect(()=>{

        SendData();
    },[pages])

    useEffect(()=>{

        if(messages!="empty"){
            setLoader(false);
        }
    },[messages])

    const sendPreviousPage = () =>{
        if(inputs.page>1){
            setInputs(inputs => ({...inputs,"page": inputs.page+1}));
        }
    }

    const sendNextPage = () =>{
        if(inputs.page<pages){
            setInputs(inputs => ({...inputs,"page": inputs.page-1}));
        }
    }

    return (
        <>

            {<Profile paginaAttuale={"messages"} datiUtente={USER} />}

            <div className="col-md-12 col-lg-9">
                <table width="100%" className="table table-bordered">
                    <tbody>
                        <tr>
                            <td>
                            
                                <h2 className="virtual-title">Messaggi ricevuti</h2>

                                <form onSubmit={handleSubmit}>

                                    <div className="row">

                                        <div className="col-md-6 form-group">
                                        
                                            <label>Categoria Messaggio:</label>

                                            <SelectCatMex name={"message_cat"} value={inputs.message_cat || ""} onchange={()=>handleChange}/>
                                        </div>

                                        <div className="col-lg-6 col-md-8 margin-top-14px">
                                            <label className="col-form-label">Oggetto:</label>
                                            <input type="text" className="form-control kt-input" placeholder="Oggetto" name="object" id="object" value={inputs.object || ""} onChange={handleChange} />
                                        </div>

                                        <div className="col-lg-6 col-md-8 margin-top-14px">
                                        
                                            <label className="col-form-label">Data ricezione:</label>
                                            
                                            <SelectPeriod onchange={handleChangeData}/>
                                            
                                        </div>

                                        <div className="col-lg-6 col-md-8 margin-top-14px">
                                            <label className="col-form-label">Stato Messaggio:</label>

                                            <SelectMexStato name={"message_stato"} value={inputs.message_stato || ""} onchange={()=>handleChange}/>
                                        </div>	
                                    
                                        <div className="col-md-12 form-group">
                                            <div>
                                                <input type="submit" className="login button-account-m-p" id="btnRicerca" name="btnRicerca" value={t('cerca')} /><i className="fa fa-search"></i>
                                                <button onClick={unsetInput} className="login button-account-m-p" id="btnFiltri" name="btnFiltri"><i className="fa fa-times"></i> {t('toglifiltri')}</button>
                                            </div>
                                        </div>

                                    </div>

                                </form>

                                { pages ?

                                <>

                                    <div className="row">

                                        <div className="col-sm-6">
                                            
                                            <div className="no-b">
                                                <button href="" onClick={sendPreviousPage}>-</button><span className="text-muted">Pagina:{inputs.page}</span><button href="" onClick={sendNextPage}>+</button>

                                            </div>

                                        </div>

                                        <div className="col-6">
                                            <strong>Totale pagine{pages}</strong>
                                        </div>
                                    </div>

                                </>

                                :

                                <></>

                                }

                                <div className="clearfix"></div>

                                <div className="pagination-content;"></div>

                                <a href="javascript:void(0)" ><span className="fa fa-refresh"></span>Aggiorna</a>

                                {loader ? <Loader /> :

                                <>

                                    <div className="table-responsive" id="messagesElenco" name="messagesElenco">
                                        <div className="table-responsive" id="messagesElenco" name="messagesElenco">
                                            <table className="responsive-p">
                                                <thead>
                                                    <tr>
                                                        <td scope="col">
                                                            Oggetto                
                                                        </td>
                                                        <td scope="col">
                                                            Categoria Messaggio                
                                                        </td>
                                                        <td scope="col">
                                                            Stato                
                                                        </td>
                                                        <td scope="col">
                                                            Data ricezione                
                                                        </td>
                                                        <td scope="col">
                                                            Azioni                
                                                        </td>
                                                    </tr>
                                                </thead>

                                                { pages ?
                                                        
                                                <>
                                                    <tbody>
                                                        <tr>
                                                            {messages.map(messaggio =>{
                                                                <>
                                                                    <td>
                                                                        {messaggio.object}
                                                                    </td>
                                                                    <td>
                                                                        {messaggio.typo}        
                                                                    </td>
                                                                    <td>
                                                                        {messaggio.stato}        
                                                                    </td>
                                                                    <td>
                                                                        {messaggio.addedTime}        
                                                                    </td>
                                                                    <td>
                                                                        Azioni
                                                                    </td>
                                                                </>
                                                            })}
                                                        </tr>
                                                    </tbody>
                                                </>

                                                :

                                                <>
                                                    <tbody>
                                                        <tr>
                                                            <td colSpan="5">
                                                                Nessun messaggio visualizzabile...                    
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
        </>
    )
}

export default Messages;