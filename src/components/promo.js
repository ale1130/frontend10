import React, { useEffect, useState } from "react";
import { api, MEDIA_PROMO_WEB_PATH} from "../constants/global";

import { useTranslation } from "react-i18next";
import { Loader } from "../components/spinner";
import { contextType } from "react-modal";

function Promo (props){

    var url_string = window.location;
    var url = new URL(url_string);

    const promoNumber = url.searchParams.get('n');

    const USER = props.user;
    const SKIN = props.skin;

    const logged = props.islogged ? 1 : 0;
    const [loader, setLoader] = useState(true);

    const [promo, setPromo] = useState(["empty"]);

    const { t, i18n } = useTranslation();

    const getData = async () =>{

        try {

            const data = await api
              .get('rest/getdatapromo/:'+promoNumber+'/')
              .then(response => {
      
                if (response.data.status == "ok") {
      
                  setPromo(response.data.dati);
      
                } else if (response.data.status == "error") {
      
                    setPromo(["nopromo"])
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
        
        if(promo!="empty"){
            setLoader(false);
        }
    },[promo])

    const copy = () =>{
        navigator.clipboard.writeText(SKIN["url"]+"/signup-promo/?source=promotions&promocode="+promo.code+"&affiliate_id="+USER["id"]);
        alert("copiato");
    }
    
    return(
        <>
            {!loader ?

            <>
                {promo != "nopromo" ? 
                
                    <>
                        <div className="container-fluid body-content stelle-promo">

                            <div id="stars"></div>

                            <div id="stars2"></div>
                                
                            <div id="stars3"></div>
                                
                            <div className="row">
                                <div className="col-12">
                                    <img src={MEDIA_PROMO_WEB_PATH(SKIN)+promo.img} />
                                </div>
                            </div>
                        </div>

                        <div className="container-fluid send-promotion">
                            <div className="container">
                    
                            </div>
                        </div>

                        <div className="container-fluid">
                            <div className="container">
                                <div className="row">
                                    <div className="col-12">
                                        <div className="card style-card">
                                            <div className="card-body">
                                            
                                                <h2>{promo.name}</h2>

                                                <h5>{promo.descrizione_breve}</h5>

                                                <div className="description-promo" dangerouslySetInnerHTML={{__html: promo.descrizione}}>
                                                    
                                                </div>

                                                <div align="left">

                                                    {logged==1 ?

                                                        <>
                                                           {promo.promotype=="affiliation" 
                                                           
                                                            ?

                                                                <div className="friends">
                                                                    <h4>Affiliation link:</h4>
                                                                    <input type="text" name="link" id="affiliation_link" className="form-control" value={SKIN["url"]+"/signup-promo/?source=promotions&promocode="+promo.code+"&affiliate_id="+USER["id"]} />
                                                                    <a className="login" onClick={()=>copy()}>Copia link</a>
                                                                </div>   
                                                            :

                                                                <></>
                                                            }
                                                        </>

                                                    :

                                                        <>
                                                            <a onClick={props.login} className="login">Accedi</a>
                                                        </>
                                                    }

                                                </div>	
                                                
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </>
                
                : 
                
                    <div>Non è stato possibile individuare la promozione </div>
                }
            </>

            :

            <Loader />
            }
        </>
    )
}

export {Promo};