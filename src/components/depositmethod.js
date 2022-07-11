import React, { useEffect, useState } from "react";
import Account from "../pages/account";

import { ComponentVoucher } from "../pagesdeposit/voucherdepositcomponent";
import { ComponentPix } from "../pagesdeposit/pixdepositcomponent";
import { ComponentCreditCard } from "../pagesdeposit/creditcarddepositcomponent";
import { ComponentCrypto } from "../pagesdeposit/cryptodepositcomponent";
import { ComponentBank } from "../pagesdeposit/bankdepositcomponent";
import { ComponentLidgicash } from "../pagesdeposit/lidgicashdepositcomponent";
import { ComponentIntouch } from "../pagesdeposit/intouchdepositcomponent";
import { api, ConvertToAssociativeArray } from "../constants/global";
import { Loader } from "./spinner";

import { useTranslation } from "react-i18next";

function DepositMethod (props){

    const USER = props.user;
    const SKIN = props.skin;

    const { t, i18n } = useTranslation();

    const [default_promo, setDefault_promo] = useState(["empty"]);
    const [loader, setLoader] = useState(true);

    const method = props.method;

    const methodInfo = ConvertToAssociativeArray(props.countMethods.depositMethods);

    const getDefaultPromoActive = async () =>{

        try {
    
            const data = await api
            .get('rest/defaultpromoactive/:'+USER["id"]+'/')
            .then(response => {
      
              if(response.data.status=="ok" || response.data.status=="error"){
      
                setDefault_promo(response.data.dati);
      
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
        getDefaultPromoActive();
    },[]);

    useEffect(()=>{
        if(default_promo!="empty"){
            setLoader(false);
        }
    },[default_promo])

    var mainComponent;

    useEffect(()=>{

        switch(method){

            case "pix":
                mainComponent = <ComponentPix methodInfo ={methodInfo.pix} user={USER} skin={SKIN} defaultPromo={default_promo} />
            break;

            case "voucher":
                mainComponent = <ComponentVoucher methodInfo ={methodInfo.voucher} user={USER} skin={SKIN} defaultPromo={default_promo} />
            break;

            case "creditcard":
                mainComponent = <ComponentCreditCard methodInfo ={methodInfo.creditcard} user={USER} skin={SKIN} defaultPromo={default_promo} />
            break; 

            case "pixs2p":
                mainComponent = <ComponentPix methodInfo ={methodInfo.pixs2p} user={USER} skin={SKIN} defaultPromo={default_promo} />
            break;

            case "cryptoio":
                mainComponent = <ComponentCrypto methodInfo ={methodInfo.cryptoio} user={USER} skin={SKIN} defaultPromo={default_promo} />
            break;

            case "pixm":
                mainComponent = <ComponentPix methodInfo ={methodInfo.pixm} user={USER} skin={SKIN} defaultPromo={default_promo} />
            break;

            case "intouch":
                mainComponent = <ComponentIntouch methodInfo ={methodInfo.intouch} user={USER} skin={SKIN} defaultPromo={default_promo} />
            break;

            case "lidgi":
                mainComponent = <ComponentLidgicash methodInfo ={methodInfo.lidgi} user={USER} skin={SKIN} defaultPromo={default_promo} />
            break;

            case "bank":
                mainComponent = <ComponentBank methodInfo ={methodInfo.bank} user={USER} skin={SKIN} defaultPromo={default_promo} />
            break;
        }

    },[default_promo])
        
    return (
        <>
            {!loader ? 

            <>
                <Account countMethods={props.countMethods} paginaAttuale={"deposit"} datiUtente={USER} />
                {mainComponent}
            </> 
            
            : 
            
            <Loader />
            
            }
        </>
    )
}

export default DepositMethod;