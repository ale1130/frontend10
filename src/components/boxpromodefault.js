import React, {useState, useEffect} from "react";

import axios from "axios";

import Spinner from 'react-bootstrap/Spinner';

function BoxPromo (props){

    const logoDirectory = "";

    const promoId = props.skindefaultpromo;

    const [datiPromo, setDatiPromo] = useState(["empty"]);

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
            
         alert("Errore tecnico, contattare l'assistenza2");  console.log(e);
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
                            Promotion
                        </h1>

                        <div className="card style-card">

                            <img className="card-img-top" src={logoDirectory+datiPromo["img"]} alt={datiPromo["name"]} />

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