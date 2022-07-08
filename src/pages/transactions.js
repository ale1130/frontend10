import axios from "axios";
import React, {useState, useEffect} from "react";
import { api, convertDate, skinUrl } from "../constants/global";
import Account from "./account";

import { useTranslation } from "react-i18next";
import { SelectPeriod } from "../components/selectors";
import { SelectPage } from "../components/selectors";
import { Loader } from "../components/spinner";
import { convertToFormdata } from "../constants/global";

function Transactions (props){

    const USER = props.user;

    const [inputs, setInputs] = useState({"user_id":USER["id"],"page":1});

    const [transactions, setTransactions] = useState(["empty"]);

    const [loader, setLoader] = useState(true);

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
                url:skinUrl+"rest/gettransactions.php",
                data:convertToFormdata(inputs)
            })
          .then(response => {
    
            if(response.data.status=="ok"){

                setTransactions(response.data.dati);
                setPages(response.data.total_pages);

                if(inputs.page > response.data.total_pages){
                    setInputs(inputs => ({...inputs,"page":1}));
                }
              
            }else if(response.data.status=="norecords"){

                setTransactions([]);
                setPages(0);
            }else{

                alert(t('erroregenerico'));
            }
          })
    
        }catch (e){
    
            alert(t('erroregenerico'));  console.log(e);
        }
    };

    useEffect(()=>{

        setLoader(true)
        getData();
    },[inputs.page])

    useEffect(()=>{

        setLoader(true)
        getData();
    },[])

    useEffect(()=>{

        if(transactions!="empty"){
            setLoader(false)
        }
    },[transactions])

    const handleSubmit = () => {

        setLoader(true)
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

    return (
        <>
            {<Account countMethods={props.countMethods} paginaAttuale={"transactions"} datiUtente={USER} />}

            <div className="col-lg-9 col-md-12">

                <table width="100%" className="table table-bordered">
                    <tbody>
                        <tr>
                            <td>
                                <h2 className="virtual-title">Movimenti e saldo</h2>
                                                
                                <div className="row">

                                    <div className="col-md-6 form-group">
                                        Periodo
                                        <div className="input-group ">
                                            <SelectPeriod onchange={handleChangeData} />
                                        </div>
                                    </div>
                                    
                                    <div className="col-md-6 form-group">
                                        Tipologia
                                        <select name="type" className="form-control" value={inputs.type || ""} onChange={handleChange}>
                                            <option value="">Tutte</option>
                                            <option value="1">Versamento</option>
                                            <option value="5">Prelievo</option>
                                            <option value="10">Bonus</option>
                                        </select>
                                    </div>
                                    
                                    <div className="col-md-12 form-group">
                                        <button onClick={()=>handleSubmit()} className="login button-account-m-p"><i className="fa fa-search"></i>Cerca</button>
                                        <button onClick={()=>unsetInput()} className="login button-account-m-p" id="btnFiltri" name="btnFiltri"><i className="fa fa-times"></i> {t('toglifiltri')}</button>
                                        <a onClick={()=>handleSubmit()}><span className="fa fa-refresh"></span>Aggiorna tutto</a>
                                    </div>
                                </div>
                                                    
                                <div className="row marginTop">
                                    <div className="col-sm-12 paddingLeft pagerfwt"></div>
                                    <div className="clearfix"></div>
                                </div>
                                <div className="clearfix"></div>

                                {!loader ?

                                    <>

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
                                                                       
                                        <div className="table-responsive">
                                            <table className="responsive-p">
                                                <thead>
                                                    <tr>
                                                        <td scope="col">
                                                            Data                
                                                        </td>
                                                        <td scope="col">
                                                            Tipologia                
                                                        </td>
                                                        <td scope="col">
                                                            Importo                
                                                        </td>
                                                        <td scope="col">
                                                            Metodo                
                                                        </td>
                                                        <td scope="col">
                                                            Causale                
                                                        </td>
                                                    </tr>
                                                </thead>
                                                
                                                <tbody>
                                                    {transactions && transactions.length>0 ?

                                                        <>
                                                            {transactions.map(transaction => {return (
                                                                <tr key={transaction.id}>
                                                                    <td scope="col">
                                                                        {convertDate(transaction.addedTime)}                
                                                                    </td>
                                                                    <td scope="col">
                                                                        {transaction.tipologia}                
                                                                    </td>
                                                                    <td scope="col">
                                                                        {transaction.amount}                
                                                                    </td>
                                                                    <td scope="col">
                                                                        {transaction.metodo}                
                                                                    </td>
                                                                    <td scope="col">
                                                                        {t(transaction.causale) +' '+ transaction.codice}                
                                                                    </td>
                                                                </tr>
                                                            )})}
                                                        </>

                                                        :

                                                        <>
                                                            <tr>
                                                                <td colspan="5">
                                                                    Non ci sono transazioni...                    
                                                                </td>
                                                            </tr>
                                                        </>

                                                    }
                                                </tbody>
                                            </table>
                                        </div>     
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

export default Transactions;


        