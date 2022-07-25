import React, { useEffect, useState } from "react";
import { api, MEDIA_PROMO_WEB_PATH } from "../constants/global";

import { useTranslation } from "react-i18next";
import { Loader } from "../components/spinner";

function Promotions (props){

    const USER = props.user;
    const SKIN = props.skin;

    const logged = props.islogged ? 1 : 0;
    const [loader, setLoader] = useState(true);

    const [promos, setPromos] = useState(["empty"]);

    const { t, i18n } = useTranslation();

    const getData = async () =>{

        try {

            const data = await api
              .get('rest/getallpromo/')
              .then(response => {
      
                if (response.data.status == "ok") {
      
                  setPromos(response.data.dati);
      
                } else if (response.data.status == "error") {
      
                    setPromos(["nopromos"])
                } else {
      
                  alert(t('erroregenerico'));
                }
              })
      
        } catch (e) {
    
            alert(t('erroregenerico'));
            console.log(e);
        }
    }

    useEffect(()=>{

        getData();
    },[])

    useEffect(()=>{
        
        if(promos!="empty"){
            setLoader(false);
        }
    },[promos])

    return (
        <>
            {!loader ?

                <>
                    {promos.length>0 && promos != "nopromos" ? 
                    
                        <>
                            {promos.map(promo => {return(
                                
                                <div className="col-md-6">
                                    <div className="card style-card">
                                    
                                        <a href={"promo?n="+promo.id}>
                                            <img className="card-img-top" src={MEDIA_PROMO_WEB_PATH(SKIN)+promo.img} />
                                        </a>
                                        
                                        <div className="card-body">
                                            <h5>{promo.nome}</h5>
                                            <p>{promo.breve_descrizione}</p>
                                            <a href={"promo?n="+promo.id} className="login">{t('vedipromozione')}</a>
                                        </div>
                                    </div>
                                </div>
                            )})}
                        </>
                    
                    : 
                    
                        <div>{t('nopromo')}</div>
                    }
                </>

                :

                <Loader />
            }
            
        </>
    )
}

export default Promotions;


        