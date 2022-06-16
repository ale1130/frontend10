import React, { useEffect, useState } from "react";
import {CURR_DEVICE} from "../constants/global";

import axios from "axios";

function Casino (props){

    const SKIN = props.skin;

    const getProviders = async () =>{

        var dati ='';

        try{
            const data = await axios
            .post('http://localhost:3001/getproviders',{ stringa : dati , skin : SKIN["id"]})
            .then(response => {

                if(response.data.err){
                    console.log(response.data.err);
                }

            })
        }catch (e){

            alert("Errore tecnico, contattare l'assistenza");  
            console.log(e);
        }
    }

    useEffect(() => {
        //getProviders();
    },[])

    return (
        <>
            <h1>{CURR_DEVICE}</h1>
            <h1>{props.isLogged ? "loggato" : "non Loggato"}</h1>

            <div className="box-container-provider">
                <div className="box-search" id="trigger-overlay">
                    <div className="container-s">
                        <div className="search"></div>
                    </div>
                </div>
                    
                <div className="slide-casino">
                    <div className="provider providers-list" id="provider-">
                        <a><img src="http://commondatastorage.googleapis.com/codeskulptor-assets/lathrop/nebula_brown.png" className="provider-"/></a>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Casino;


        