import React, {useState, useEffect} from "react";

import axios from "axios";

import { useTranslation } from "react-i18next";
import { MEDIA_PROMO_WEB_PATH } from "../constants/global";

import { api,convertObjectStringToNumbers, skinUrl } from "../constants/global";

function BoxPromo (props){

    const { t, i18n } = useTranslation();

    const [datiPromo, setDatiPromo] = useState(["empty"]);
    const [SKIN, setSkin] = useState(props.skin);

    const GetPromo = async () =>{

        try{
    
          const data = await api
          .get('rest/getdatapromo/:'+SKIN["default_promo"]+"/")
          .then(response => {

            if(response.data.status=="ok"){
                setDatiPromo(convertObjectStringToNumbers(response.data.dati));
            }
            
          })
        }catch (e){
            
         alert(t('erroregenerico'));  console.log(e);
        }
    };


    useEffect(() => {
        GetPromo();
    },[]);
   
    return(
        <>
            {
                datiPromo!="empty"
                
                ?
                
                <>
                    <div className="col-sm-4">
                        <h1 className="title-sport white">
                            {t('promozione')}
                        </h1>

                        <div className="card style-card">

                            <img className="card-img-top" src={MEDIA_PROMO_WEB_PATH(SKIN)+datiPromo["img"]} alt={datiPromo["name"]} />

                            <div className="card-body">
                                <h5>{datiPromo["name"]}</h5>
                                <p>{datiPromo["descrizione"]}</p>
                            </div>
                        </div>
                    </div>
                </>

                :

                <>

                </>
            }
        </>
    );
}

export default BoxPromo;