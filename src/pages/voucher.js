import axios from "axios";
import React, {useState, useEffect} from "react";
import { Loader } from "../components/spinner";
import { convertDate, convertToFormdata, skinUrl } from "../constants/global";
import Account from "./account";

import { useTranslation } from "react-i18next";
import { SelectPage } from "../components/selectors";
import { ModalVoucher } from "../components/modalvoucher";

function Voucher (props){

    const SKIN = props.skin;
    
    const USER = props.user;

    const [inputs, setInputs] = useState({"user_id":USER["id"],"page":1});

    const [vouchers, setVouchers] = useState(["empty"]);

    const [loader, setLoader] = useState(true);

    const [pages, setPages] = useState(0);

    const { t, i18n } = useTranslation();

    const [realVoucher, setRealVoucher] = useState(["empty"]);

    const [show, setShow] = useState(false);
 
    const handleChange = (event) => {

        const name = event.target.name;
        const value = event.target.value;

        setInputs(values => ({...values,[name]: value}))
    }

    const getData = async () => {

        try{
    
          const data = await axios
            ({
                method:"post",
                url:skinUrl+"rest/getvouchers.php",
                data:convertToFormdata(inputs)
            })
          .then(response => {
    
            if(response.data.status=="ok"){

                setVouchers(response.data.dati);
                setPages(response.data.total_pages);

                if(inputs.page > response.data.total_pages){
                    setInputs(inputs => ({...inputs,"page":1}));
                }
              
            }else if(response.data.status=="norecords"){

                setVouchers([]);
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

        if(vouchers!="empty"){
            setLoader(false)
        }
    },[vouchers])

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

    const showVoucher = (voucher) =>{
        setRealVoucher(voucher)
    }

    useEffect(()=>{
        if(realVoucher!="empty"){
            setShow(true);
        }
    },[realVoucher])

    return (
        <>
            {<Account countMethods={props.countMethods} paginaAttuale={"vouchers"} datiUtente={USER} />}

            {<ModalVoucher 
                modalState={show} 
                closeModal={() => setShow(false)}
                voucher={realVoucher}
                skin={SKIN}
            />}

            <div className="col-lg-9 col-md-12">
                <table width="100%" className="table table-bordered">
                    <tbody>
                        <tr>
                            <td>
                        
                                <h2 className="virtual-title">I tuoi voucher</h2>
                
                                <div className="clearfix"></div>
                                    
                                <br />

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

                                    <table className="responsive-p" id="voucherT">
                                    
                                        <thead>
                                            <tr>
                                                <td scope="col">
                                                    Codice voucher                
                                                </td>

                                                <td scope="col">
                                                    Valore                
                                                </td>

                                                <td scope="col">
                                                    Stato                
                                                </td>

                                                <td scope="col">
                                                    Data creazione                
                                                </td>
                                            </tr>
                                        </thead>

                                        { vouchers && vouchers.length>0 ?
                                    
                                        <>
                                            <tbody>
                                                {vouchers.map(voucher => {return(
                                            
                                                    <tr key={voucher.voucher_code}>
                                                        <td data-label="Codice voucher">
                                                            <button className="pul-user" onClick={()=>showVoucher(voucher)}><i className="fa fa-search-plus">{voucher.voucher_code}</i></button>                    
                                                        </td>

                                                        <td data-label="Valore">
                                                            {voucher.amount}                    
                                                        </td>

                                                        <td data-label="Stato">
                                                            {voucher.stato}                    
                                                        </td>

                                                        <td data-label="Data creazione">
                                                            {convertDate(voucher.addedTime)}                    
                                                        </td>
                                                    </tr>
                                                    
                                                )})}
                                                
                                            </tbody>     
                                        </>

                                        :

                                        <>
                                            <tbody>
                                                <tr>
                                                    <td colspan="4">
                                                        Nessun voucher visualizzabile...                    
                                                    </td>
                                                </tr>
                                            </tbody>
                                        </>

                                        }

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

export default Voucher;


        