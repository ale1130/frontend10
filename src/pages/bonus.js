import axios from "axios";
import React, {useState, useEffect} from "react";
import { api, convertDate, skinUrl } from "../constants/global";
import Account from "./account";

import { useTranslation } from "react-i18next";

import { SelectPeriod } from "../components/selectors";

import { SelectPage } from "../components/selectors";

import { Loader } from "../components/spinner";

import { convertToFormdata } from "../constants/global";

function Bonus (props){

    const USER = props.user;

    const [inputs, setInputs] = useState({"user_id":USER["id"],"page":1});

    const [bonus, setBonus] = useState(["empty"]);

    const [jackpots, setJackpots] = useState(["empty"]);

    const [loaderBonus, setLoaderBonus] = useState(true);
    const [loaderJackpots, setLoaderJackpots] = useState(true);

    const [pages, setPages] = useState(0);

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
                url:skinUrl+"rest/getbonus.php",
                data:convertToFormdata(inputs)
            })
          .then(response => {
    
            if(response.data.status=="ok"){

                setBonus(response.data.dati);
                setPages(response.data.total_pages);

                if(inputs.page > response.data.total_pages){
                    setInputs(inputs => ({...inputs,"page":1}));
                }
              
            }else if(response.data.status=="norecords"){

                setBonus([]);
                setPages(0);
            }else{

                alert(t('erroregenerico'));
            }
          })
    
        }catch (e){
    
            alert(t('erroregenerico'));  console.log(e);
        }
    };

    const getDataJackpots = async () => {

        try {
    
          const data = await api
          .get('rest/getjackpotsuser/:'+USER["id"]+'/')
          .then(response => {
    
            if(response.data.status=="ok"){
    
              setJackpots(response.data.dati);
    
            }else if(response.data.status=="nodata"){
                
              setJackpots([])
            }else{
    
              alert(t('erroregenerico'));
            }
          })
    
        } catch (e) {
    
          alert(t('erroregenerico'));  
          console.log(e);
        }
      }

    useEffect(()=>{

        setLoaderBonus(true)
        getData();
    },[inputs.page])

    useEffect(()=>{

        setLoaderJackpots(true)
        getDataJackpots();
    },[])

    useEffect(()=>{

        if(bonus!="empty"){
            setLoaderBonus(false)
        }
    },[bonus])

    useEffect(()=>{

        if(jackpots!="empty"){
            setLoaderJackpots(false)
        }
    },[jackpots])

    const handleSubmit = () => {

        setLoaderBonus(true)
        getData();
    }

    const unsetInput = () =>{

        setInputs({"user_id":USER["id"],"page":1});
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

    const aggiorna = () =>{

        setLoaderJackpots(true)
        getDataJackpots();
        setLoaderBonus(true)
        getData();
    }

    return (
        <>
            {<Account countMethods={props.countMethods} paginaAttuale={"bonus"} datiUtente={USER} />}

            <div className="col-lg-9 col-md-12">
                <table width="100%" className="table table-bordered">
                    <tbody>
                        <tr>
                            <td>
                                <h2 className="virtual-title">I tuoi bonus</h2>
                                <hr className="border-hr" />

                                <div className="row">

                                    <div className="col-md-3 form-group">
                                            
                                            
                                        <div className="input-group">
                                        
                                            <label className="col-form-label">Periodo</label>
                                            
                                            <SelectPeriod onchange={handleChangeData}/>
                                        </div>
                                    
                                    </div>

                                    <div className="col-md-12 form-group">
                                        <div>
                                            <button onClick={()=>handleSubmit()} className="login button-account-m-p" id="btnRicerca" name="btnRicerca" ><i className="fa fa-search"></i> {t('cerca')} </button>
                                            <button onClick={()=>unsetInput()} className="login button-account-m-p" id="btnFiltri" name="btnFiltri"><i className="fa fa-times"></i> {t('toglifiltri')}</button>
                                            <a onClick={()=>aggiorna()}><span className="fa fa-refresh"></span>Aggiorna tutto</a>
                                        </div>
                                    </div>

                                </div>

                                {!loaderBonus ? <>

                                    {pages>1 ?
                                    
                                        <div className="row">

                                            <div className="col-sm-6">
                                                
                                                <div className="no-b">

                                                    <button href="" onClick={sendPreviousPage}>-</button><span className="text-muted"><SelectPage pages={pages} onchange={() => handleChange} value={inputs.page || ""} /></span><button href="" onClick={sendNextPage}>+</button>
                                                </div>

                                            </div>

                                            <div className="col-6">
                                                <strong>Totale pagine{pages}</strong>
                                            </div>
                                        </div>

                                        :

                                        <></>
                                    
                                    }

                                    <table className="responsive-p">
                                        <thead>

                                            <tr>
                                                <td scope="col">
                                                    Data              
                                                </td>

                                                <td scope="col">
                                                    Nome                
                                                </td>

                                                <td scope="col">
                                                    Scadenza                
                                                </td>

                                                <td scope="col">
                                                    Importo accreditato                
                                                </td>

                                                <td scope="col">
                                                    Stato                
                                                </td>
                                            </tr>

                                        </thead>

                                        <tbody>

                                            {bonus && bonus.length>0 ?

                                                <>
                                                    {bonus.map(bonu => {return (
                                                        
                                                        <tr key={bonu.id}>
                                                            <td scope="col">
                                                                {convertDate(bonu.addedTime)}                
                                                            </td>

                                                            <td scope="col">
                                                                {bonu.nome_promo}                
                                                            </td>

                                                            <td scope="col">
                                                                {convertDate(bonu.scadenza)}                
                                                            </td>

                                                            <td scope="col">
                                                                {bonu.importo}           
                                                            </td>

                                                            <td scope="col">
                                                                {bonu.stato}
                                                            </td>
                                                        </tr>

                                                    )})}
                                                </>
                                            
                                                :

                                                <tr>
                                                    <td colSpan="4">
                                                        Nessun bonus visualizzabile...                
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

                                {!loaderJackpots ?
                                
                                    <>
                                        <h2 className="virtual-title">Jackpots assegnati</h2>

                                        <table className="responsive-p">
                                            <thead>

                                                <tr>
                                                    <td scope="col">
                                                        Data              
                                                    </td>

                                                    <td scope="col">
                                                        Importo accreditato                
                                                    </td>
                                                </tr>

                                            </thead>

                                            <tbody>

                                                {jackpots && jackpots.length>0?

                                                    <>
                                                        {jackpots.map(jackpot => {return (
                                                            
                                                            <tr key={jackpot.id}>
                                                                <td scope="col">
                                                                    {convertDate(jackpot.addedTime)}                
                                                                </td>

                                                                <td scope="col">
                                                                    {Math.round(jackpot.win_amount*100)/100+" "+USER["currency"]}    
                                                                </td>
                                                            </tr>
                                                        )})}
                                                    </>
                                                
                                                    :

                                                    <tr>
                                                        <td colSpan="4">
                                                            Nessun jackpot assegnato...                
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

export default Bonus;

        