import React, { useEffect, useState } from "react";
import { Loader } from "../components/spinner";
import Account from "./account";

import { api } from "../constants/global";

import { useTranslation } from "react-i18next";

function Withdrawals (props){

    const { t, i18n } = useTranslation();

    const USER = props.user;

    const SKIN = props.skin;

    const [loader, setLoader] = useState(0);

    const [methods, setMethods] = useState(["empty"]);

    const GetMethods = async () => {
    
        try {
    
          const data = await api
          .get('rest/getwithdrawmethods/:'+SKIN["id"]+'/:'+USER["id"]+'/')
          .then(response => {
    
            if(response.data.status=="ok"){
    
              setMethods(response.data.dati);
    
            }else if(response.data.status=="error"){
                
                setMethods(["nomethods"])
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
        GetMethods();
    },[])

    useEffect(()=>{
        if(methods!="empty"){
            setLoader(loader+1);
        }
    },[methods])

    return (
        <>
            {<Account countMethods={props.countMethods} paginaAttuale={"withdrawals"} datiUtente={USER} />}

            {loader>1 ?

                <>{methods != "empty" && methods != "nomethods" ?

                    <>
                        <div className="col-lg-9 col-md-12">
                            <table className="table table-bordered">
                                <tbody>
                                    <tr>
                                        <td>
                                            <h2 className="virtual-title">{t('prelievo')}</h2>
                                            <p>{t('selectprelmeth')}</p>

                                            <div className="row">

                                                {methods.map(metodo => { return (

                                                    <div key={metodo.method_code} className="col-md-6">
                                                        <div className="box-payment">

                                                            <img src={metodo.img} className="payimg"/>

                                                            <div className="box-info-payment">
                                                                <h3>{metodo.name}</h3>
                                                                <p>{t('prelievoist')} {metodo.name} </p>

                                                                <a href={"/account/withdrawals/"+metodo.method_code} className="login">{t('prelevaora')}</a>
                                                            </div>
                                                        </div>
                                                    </div>
                                                )})}
                                            </div>
                                        </td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </>
                
                    :

                    <><div>{t('noprelmeth')}</div></>
                }</>
                

                :

                <><Loader /></>
            }

        </>
    )
}

export default Withdrawals;