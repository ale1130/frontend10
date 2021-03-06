import axios from "axios";
import React, { useEffect, useState } from "react";
import { SelectPage, SelectPeriod } from "../components/selectors";
import { convertDate, convertObjectStringToNumbers, convertToFormdata, differenceDate, differenceHour, getRichiestaPrelievoClass, getRichiestaPrelievoStato, skinUrl } from "../constants/global";
import Account from "./account";

import { useTranslation } from "react-i18next";
import { Loader } from "../components/spinner";
import { differenceInHours } from "date-fns";

function WithdrawalsRequests (props){

    const USER = props.user;

    const [inputs, setInputs] = useState({"user_id":USER["id"],"page":1});

    const [withdrawals, setWithdrawals] = useState(["empty"]);

    const [pages, setPages] = useState(0);

    const [loader, setLoader] = useState(true);

    const { t, i18n } = useTranslation();

    const handleChange = (event) => {

        const name = event.target.name;
        const value = event.target.value;

        setInputs(values => ({...values,[name]: value}))
    }

    const handleChangeData = (event,data,indice) => {

        const index = indice;
        const value = event;
        
        let date = JSON.stringify(value);

        var dataTradotta = date.slice(1,11);

        setInputs(values => ({...values, [index]: dataTradotta}))
    }

    const getData = async () => {

        try{
    
          const data = await axios
            ({
                method:"post",
                url:skinUrl+"rest/withdrawals.php",
                data:convertToFormdata(inputs)
            })
          .then(response => {
    
            if(response.data.status=="ok"){

                setWithdrawals(convertObjectStringToNumbers(response.data.params.richieste));
                setPages(response.data.params.total_pages);

                if(inputs.page > response.data.params.total_pages){
                    setInputs(inputs => ({...inputs,"page":1}));
                }
              
            }else if(response.data.status=="norecords"){
                setPages(0);
                setWithdrawals([]);
                setInputs(inputs => ({...inputs,"page":1}));
            }else{

                alert(t('erroregenerico'));
            }
          })
    
        }catch (e){
    
            alert(t('erroregenerico'));  console.log(e);
        }
    };

    const deleteWithdraw = async (id) => {

        const dati = {"id":id,"user_id":USER["id"]};

        try{
    
            const data = await axios
              ({
                method:"post",
                url:skinUrl+"rest/deleteRequest.php",
                data:convertToFormdata(dati)
              })
            .then(response => {
      
              if(response.data.status=="ok"){
  
                handleSubmit();
                
              }else{
  
                alert("E' incorso un problema durante il tentativo di eliminazione della richiesta si prega di riprovare, se l'errore dovesse persistere contattare l'assistenza tecnica!");
              }
            })
      
          }catch (e){
      
            alert(t('erroregenerico'));  console.log(e);
          }
    }

    const sendPreviousPage = () =>{

        if(inputs.page>1){
            setInputs(inputs => ({...inputs,"page": parseInt(inputs.page)-1}));
        }
    }

    const sendNextPage = () =>{
 
        if(inputs.page<pages){
            setInputs(inputs => ({...inputs,"page": parseInt(inputs.page)+1}));
        }
    }

    useEffect(()=>{

        setLoader(true)
        getData();
    },[inputs.page])

    useEffect(()=>{

        if(withdrawals!="empty"){
            setLoader(false)
        }
    },[withdrawals])

    const handleSubmit = () => {

        setLoader(true)
        getData();
    }

    const unsetInput = () =>{

        setInputs({"user_id":USER["id"],"page":1});
    }

    const eliminaPrelievo = (id,data) =>{

        if(differenceHour(Math.floor(Date.now()/1000),data) < 8){

            if (window.confirm('Sicuro di voler elimare la richiesta di prelievo selezionata?')){

                deleteWithdraw(id);
            }
        }else{

            alert('Ops mentre aspettavi ?? scaduto il tempo limite per annullare la richiesta di prelievo!')
            handleSubmit();
        }
        
    }

    return (
        <>
            {<Account countMethods={props.countMethods} paginaAttuale={"withdrawals_requests"} datiUtente={USER} />}

            <div className="col-lg-9 col-md-12">
                <table width="100%" className="table table-bordered">
                    <tbody>
                        <tr>
                            <td>
                                <h2 className="virtual-title">{t('serachrequest')}</h2>
                                <hr className="border-hr" />

                                <div className="row">

                                    <div className="col-md-3 form-group">
                                            
                                               
                                        <div className="input-group">
                                        
                                            <label className="col-form-label">{t('datarequest')}</label>
                                            
                                            <SelectPeriod onchange={handleChangeData}/>
                                        </div>
                                    
                                    </div>
                                    

                                    <div className="col-md-3 form-group">

                                        {t('answerdesc')}               

                                        <input type="text" className="form-control margin-bottom-5" name="answer" id="answer" value={inputs.answer || ""} onChange={handleChange} placeholder="Inserire testo" />

                                    </div>

                                    <div className="col-md-3 form-group">
                                    
                                        {t('valore')}          
                                        
                                        <div className="input-group ">
                                        
                                            <div className="input-group-prepend">
                                                <span className="input-group-text" id="basic-addon1">{t('da')}</span>
                                            </div>
                                            
                                            <input value={inputs.amountDa || ""} onChange={handleChange} type="text" className="form-control kt-input" placeholder={t('da')} name="amountDa" id="amountDa" />
                                                
                                            <div className="input-group-prepend">
                                                <span className="input-group-text">{t('a')}</span>
                                            </div>
                                            
                                            <input value={inputs.amountA || ""} onChange={handleChange} type="text" className="form-control kt-input" placeholder={t('a')} name="amountA" id="amountA" />
                                        </div>
                                    </div>

                                    <div className="col-md-3 form-group">
                                        {t('stato')}
                                        <select className="form-control kt-input" id="status" name="status" value={inputs.status || ""} onChange={handleChange}>
                                            <option value="">{"--"+t('seleziona')+"--"}</option>
                                            <option value="zero">{t('sospeso')}</option>
                                            <option value="2">{t('negata')}</option>
                                            <option value="3">{t('errore')}</option>
                                            <option value="4">{t('annulla')}</option>
                                        </select>
                                    </div>

                                    <div className="col-md-12 form-group">
                                        <div>
                                            <button onClick={()=>handleSubmit()} className="login button-account-m-p" id="btnRicerca" name="btnRicerca" ><i className="fa fa-search"></i> {t('cerca')} </button>
                                            <button onClick={()=>unsetInput()} className="login button-account-m-p" id="btnFiltri" name="btnFiltri"><i className="fa fa-times"></i> {t('toglifiltri')}</button>
                                        </div>
                                    </div>

                                </div>
                                
                                <h2 className="virtual-title">{t('tuoiprelievi')}</h2>

                                <a onClick={()=>handleSubmit()}><span className="fa fa-refresh"></span>{t('aggiorna')}</a>

                                {!loader ? <>

                                    {pages >1?

                                        <>

                                            <div className="row">

                                                <div className="col-sm-6">
                                                    
                                                    <div className="no-b">

                                                        <button href="" onClick={sendPreviousPage}>-</button><span className="text-muted"><SelectPage pages={pages} onchange={() => handleChange} value={inputs.page || ""} /></span><button href="" onClick={sendNextPage}>+</button>
                                                    </div>

                                                </div>

                                                <div className="col-6">
                                                    <strong>{t('totalep')} {pages}</strong>
                                                </div>
                                            </div>

                                        </>

                                        :

                                        <></>

                                    }

                                    <br />

                                    <table className="responsive-p">
                                        <thead>

                                            <tr>
                                                <td scope="col">
                                                    {t('datarichiestap')}                
                                                </td>

                                                <td scope="col">
                                                    {t('descrisposta')}                
                                                </td>

                                                <td scope="col">
                                                    {t('valore')}                
                                                </td>

                                                <td scope="col">
                                                    {t('statorequest')}                
                                                </td>

                                                <td scope="col">
                                                    {t('azioniprelievi')}                
                                                </td>
                                            </tr>

                                        </thead>

                                        <tbody>

                                            {withdrawals && withdrawals.length>0 ?

                                                <>
                                                    {withdrawals.map(prelievo => {return (
                                                        
                                                        <tr key={prelievo.id}>
                                                            <td scope="col">
                                                                {convertDate(prelievo.addedTime)}                
                                                            </td>

                                                            <td scope="col">
                                                                {prelievo.request_status == 4 ? "Annullata dal giocatore" : prelievo.answer_description}                
                                                            </td>

                                                            <td scope="col">
                                                                {prelievo.amount}                
                                                            </td>

                                                            <td scope="col">
                                                                <span className={getRichiestaPrelievoClass(prelievo.request_status)}>{getRichiestaPrelievoStato(prelievo.request_status)}</span>            
                                                            </td>

                                                            <td scope="col">
                                                                {prelievo.request_status==0 && differenceHour(Math.floor(Date.now()/1000),prelievo.addedTime) < 8 ? <button onClick={() => eliminaPrelievo(prelievo.id,prelievo.addedTime)}>{t('deletereq')}</button> : <>{t('noaction')}</>}
                                                            </td>
                                                        </tr>

                                                    )})}
                                                </>
                                            
                                                :

                                                <tr>
                                                    <td colSpan="4">
                                                        {t('norequest')}                
                                                    </td>
                                                </tr>
                                            }
                                            
                                        </tbody>
                                    </table>

                                </>

                                :

                                <>
                                    <Loader />
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

export default WithdrawalsRequests;


        