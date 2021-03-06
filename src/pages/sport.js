import axios from "axios";
import { t } from "i18next";
import React, { useEffect, useState } from "react";
import { Loader } from "../components/spinner";
import { convertToFormdata, skinUrl } from "../constants/global";

function Sport (props){

    const USER = props.user;

    const [urlIframe, setUrlIframe] = useState('');
    const [loader, setLoader] = useState('');

    const GetIframeSport = async () => {

        const dati = { "user_id": USER["id"] }

        try {

            const data = await axios
                ({
                    method: "post",
                    url: skinUrl + "rest/sport-controller.php",
                    data: convertToFormdata(dati)
                })
                .then(response => {

                    if(response.status==200){
                        
                        setUrlIframe(response.data.url);
                    }else{
                        alert("error");
                        setUrlIframe('error');
                    }
                    
                })

        } catch (e) {

            alert("error");
            console.log(e);
        }
    }

    useEffect(()=>{
        GetIframeSport();
    },[])

    useEffect(()=>{

        setLoader(false);
    },[urlIframe])

    
    return (
        <>
            {!loader ? <> {urlIframe != 'error' ? <iframe className="framesport" src={urlIframe}></iframe> : <><div>{t('nosport')}</div></>} </> : <Loader />}
            
        </>
    )
}

export default Sport;


        