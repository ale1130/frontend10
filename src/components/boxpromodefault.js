import React, {useState, useEffect} from "react";

import axios from "axios";

import Spinner from 'react-bootstrap/Spinner';

import { useTranslation } from "react-i18next";
import { MEDIA_PROMO_WEB_PATH } from "../constants/global";

function BoxPromo (props){

    const { t, i18n } = useTranslation();

    const logoDirectory = "";

    const promoId = props.skindefaultpromo;

    const [datiPromo, setDatiPromo] = useState(["empty"]);
    const [SKIN, setSkin] = useState(props.skin);

    const ConvertObjectToArray = (object) =>{

        var objectArray = Object.entries(object);
    
        var arrUtilizzo = [];
    
        objectArray.forEach(([key, value]) => {
    
          arrUtilizzo[key] = value;
        });
    
        return arrUtilizzo;
    }

    const GetPromo = async () =>{

        try{
    
          const data = await axios
          .post('http://localhost:3001/getdatapromo',{id : promoId, skin_id: props.skin_id})
          .then(response => {

            if(!response.data.message){
                setDatiPromo(ConvertObjectToArray(response.data[0]));
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