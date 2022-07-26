import React, {useState, useEffect} from "react";
import { SelectPage, SelectPeriod } from "../components/selectors";
import { Loader } from "../components/spinner";
import Account from "./account";

import axios from "axios";

import { useTranslation } from "react-i18next";

import { convertDate, convertObjectStringToNumbers, convertToFormdata, playlogiqTicketStatus, skinUrl } from "../constants/global";
import Cookies from "universal-cookie";
import { ModalCoupon } from "../components/modalCoupon";

function Coupons (props){

    const cookie = new Cookies();

    const USER = props.user;

    const [inputs, setInputs] = useState({"user_id":USER["id"],"page":1});

    const [coupons, setCoupons] = useState(["empty"]);

    const [loader, setLoader] = useState(true);

    const [pages, setPages] = useState(0);

    const { t, i18n } = useTranslation();

    const [showCoupon, setShowCoupon] = useState(false);

    const [urlCoupon, setUrlCoupon] = useState(["empty"]);

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
                url:skinUrl+"rest/getcoupons.php",
                data:convertToFormdata(inputs)
            })
          .then(response => {
    
            if(response.data.status=="ok"){

                setCoupons(convertObjectStringToNumbers(response.data.dati));
                setPages(response.data.total_pages);

                if(inputs.page > response.data.total_pages){
                    setInputs(inputs => ({...inputs,"page":1}));
                }
              
            }else if(response.data.status=="norecords"){

                setCoupons([]);
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

        if(coupons!="empty"){
            setLoader(false)
        }
    },[coupons])

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

    const VisualCoupon = async (id) => {
        
        const dati = {"id":id,"user_id":USER["id"],"lang": cookie.get("la")};
        
        try{

            const data = await axios
            ({
                method:"post",
                url:skinUrl+"rest/showcoupon.php",
                data:convertToFormdata(dati)
            })
            .then(response => {

                if(response.data.status=="ok"){

                    setUrlCoupon(response.data.params);

                }else if(response.data.status!="ok"){
                    
                    alert(t('erroregenerico'));
                }else{

                    alert(t('erroregenerico'));
                }
            })
    
        }catch (e){
    
            alert(t('erroregenerico'));  console.log(e);
        }
    }

    useEffect(()=>{

        if(urlCoupon!="empty"){
            setShowCoupon(true);
        }
    },[urlCoupon])

    const seeCoupon = (id) => {
        VisualCoupon(id);
    }

    return (
        <>
            {<Account countMethods={props.countMethods} paginaAttuale={"coupons"} datiUtente={USER} />}

            {<ModalCoupon
                modalState={showCoupon} 
                urls={urlCoupon} 
                closeModal={() => setShowCoupon(false)}
            />}

            <table width="100%" className="table table-bordered">
                <tbody>
                    <tr>
                        <td>		
                            <h2 className="virtual-title">{t('sportbet')}</h2>

                                <div className="row">

                                    <div className="col-md-6 form-group">
                                    
                                        {t('periodo')}
                                        <div className="input-group ">
                                            <SelectPeriod onchange={handleChangeData} />
                                        </div>
                                    </div>

                                    <div className="col-md-6 form-group">

                                        {t('betcode')}            
                                        <input type="text" name="codice" id="codice" value={inputs.codice || ""} onChange={handleChange} className="form-control margin-bottom-5" placeholder="Codice scommessa" />
                                    </div>

                                    <div className="col-md-3 form-group">

                                        {t('bettype')}:

                                        <select className="form-control" name="TypoBet" id="TypoBet" value={inputs.typoBet || ""} onChange={handleChange}>
                                            <option value="">Seleziona</option>
                                            <option value="e">{t('emissione')}</option>
                                            <option value="c">{t('chiusura')}</option>
                                        </select>
                                    </div>
                                    
                                    <div className="col-md-3 form-group">

                                        Categoria:

                                        <select className="form-control" name="coupons_search_type" id="coupons_search_type" value={inputs.coupons_search_type || ""} onChange={handleChange}>
                                            <option value="">Seleziona</option>
                                            <option value="P">{t('prematch')}</option>
                                            <option value="L">{t('live')}</option>
                                            <option value="S">{t('sistema')}</option>
                                            <option value="M">{t('live')} &amp; {t('prematch')}</option>
                                        </select>
                                    </div>


                                    <div className="col-md-3 form-group">
                                        {t('stato')}:
                                        <select className="form-control" name="status_coupon" id="status_coupon" value={inputs.status_coupon || ""} onChange={handleChange}>
                                            <option value="">Seleziona</option>
                                            <option value="N">{t('insospeso')}</option>
                                            <option value="L">{t('perso')}</option>
                                            <option value="W">{t('vincente')}</option>
                                            <option value="V">{t('nullo')}</option>
                                            <option value="C">{t('nosystem')}</option>
                                        </select>
                                    </div>
                                    
                                    <div className="col-md-12 form-group">
                                        <div>
                                            <button onClick={()=>handleSubmit()} className="login button-account-m-p" id="btnRicerca" name="btnRicerca"><i className="fa fa-search"></i> {t('cerca')} </button>
                                            <button onClick={()=>unsetInput()} className="login button-account-m-p" id="btnFiltri" name="btnFiltri"><i className="fa fa-times"></i> {t('nofilter')} </button>
                                            <a onClick={()=>handleSubmit()}><span className="fa fa-refresh"></span>{t('aggiorna')} {t('tutto')}</a>
                                        </div>
                                    </div>

                                </div>
                            

                            <div className="pagination-content"></div>

                            <br />

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
                                                <strong>{t('totalep')} {pages}</strong>
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
                                                            {t('data')}            
                                                        </td>
                                                        <td scope="col">
                                                            {t('codicetick')}            
                                                        </td>
                                                        <td scope="col">
                                                            {t('importo')}            
                                                        </td>
                                                        <td scope="col">
                                                            {t('vincita')}            
                                                        </td>
                                                        <td scope="col">
                                                            {t('statobet')}            
                                                        </td>
                                                    </tr>
                                                </thead>
                                                
                                                <tbody>

                                                    {coupons && coupons.length>0
                                        
                                                        ?

                                                        <>
                                                            {coupons.map(coupon => {return (
                                                                
                                                                

                                                                <tr key={coupon.id}>
                                                                    <td scope="col">
                                                                        {convertDate(coupon.addedTime)}         
                                                                    </td>
                                                                    <td scope="col">
                                                                        <button onClick={()=>seeCoupon(coupon.id)}>{coupon.ticketcode}</button>            
                                                                    </td>
                                                                    <td scope="col">
                                                                        {coupon.ticketbet}            
                                                                    </td>
                                                                    <td scope="col">
                                                                        {coupon.win}            
                                                                    </td>
                                                                    <td scope="col" className={"ticket-status-"+coupon.ticketstatus}>
                                                                        {playlogiqTicketStatus(coupon.ticketstatus)}   
                                                                    </td>
                                                                </tr>
                                                            
                                                            )})}
                                                        </>

                                                        :

                                                        <>
                                                            <tr>
                                                                <td colspan="5">
                                                                    {t('nobet')}                
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
        </>
    )
}

export default Coupons;


        