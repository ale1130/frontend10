import React, { useState, useEffect } from "react";
import Modal from "react-modal";

import axios from "axios";

import {SetLastLogin, PLAYER_LEVEL, ConvertObjectToArraySettings, getAge, format, generateMd5, generateUniqId, ckeckSkinSett, skinId, SHOP_LEVEL, ConvertObjectToArray, ConvertObjectToStringIndex, ConvertObjectToStringValues } from "../constants/global";

import BoxPromo from './boxpromodefault'
import ErrorBox from "../components/errorBox";

import {SelectCountry} from './selectCountry';
import {SelectProvince} from './selectCountry';
import {SelectCity} from './selectCountry';

import SelectDate from './selectDate'

import 'bootstrap/dist/css/bootstrap.min.css';
import Spinner from 'react-bootstrap/Spinner';

Modal.setAppElement("#root");

function generateApiKey(){

    var apiKey = generateMd5(generateUniqId());
    return apiKey;
}  

function RegistrationModalPix(props) {

    const close = props.closeModal;
    const SKIN = props.skin;

    const [loader, setLoader] = useState(false);
    const [skinSettings, setSkinSettings] = useState(["empty"]);

    const [modalError, setModalError] = useState(false);

    const [inputs, setInputs] = useState(["empty"]);
    const [errorMessages, setErrorMessages] = useState([]);
    const [submit, setSubmit] = useState(0);

    const [termini, setTermini] = useState(false);
    const [maggiorenne, setMaggiorenne] = useState(false);

    const [promoter, setPromoter] = useState(["empty"]);
    const [errorDupUsername, setDupUsername] = useState(["found"]);
    const [errorDupEmail, setDupEmail] = useState(["found"]);

    const [userId, setUserId] = useState({"id":0});
    const [asking, setAsking] = useState(false);

    const [cpf, setCpf] = useState("");

    const handleChange = (event) => {
        const name = event.target.name;
        const value = event.target.value;
        
        setInputs(inputs => ({...inputs,[name]: value}))
    }

    const handleChangeData = (data) => {
        
        let date = JSON.stringify(data);

        var dataFinale = date.slice(1,11);

        setInputs(inputs => ({...inputs,"birthday": dataFinale}))
    }

    const Settings = async () =>{
        try{

            const data = await axios
            .post('http://localhost:3001/getskinsettings',{ id : SKIN["id"] })
            .then(response => {

                if(!response.data.err){

                    setSkinSettings(ConvertObjectToArraySettings(response.data));
                }
            })

        }catch (e){

            alert("Errore tecnico, contattare l'assistenza");  console.log(e);
        }
    };

    useEffect(()=>{

        Settings();
    },[]);

    const createPlayer = async () =>{

        const indici = ConvertObjectToStringIndex(inputs);
        const valori = ConvertObjectToStringValues(inputs);

        const stringa = indici+" VALUES "+valori;

        try{

            const data = await axios
            .post('http://localhost:3001/createplayer',{ query : stringa })
            .then(response => {
                if(!response.data.err){
                    getUserid();
                }else{
                    console.log(response.data.err);
                }
            })

        }catch (e){

            alert("Errore tecnico, contattare l'assistenza");  console.log(e);
        }
        
    }

    const getUserid = () =>{

        const query2="SELECT id, realpass, passhash FROM users WHERE username = '"+inputs.username+"' AND skin_id="+SKIN["id"]+"";

        try{

            axios
            .post('http://localhost:3001/getuserid',{ query: query2})
            .then(response => {

                if(!response.data.err && !response.data.message){

                    setUserId(id => ({...id, "id" : response.data[0].id}));
                }else{
                    console.log(response.data.err);
                }
            })

        }catch (e){

            alert("Errore tecnico, contattare l'assistenza");  console.log(e);
        }
    }

    useEffect(()=>{

        if(userId.id!=0){
            AddUserPath();
        }
       
    },[userId]);

    const AddUserPath = async () =>{

        const path = promoter.user_path+"/"+userId.id;

        const query3 = "UPDATE users SET user_path = '"+path+"' WHERE id = "+userId.id;

        try{

            const data = await axios
            .post('http://localhost:3001/adduserpath',{ query : query3 })
            .then(response => {

                if(!response.data.err){

                    GetDataUser();
                }else{

                    console.log(response.data.err);
                }
            })

        }catch (e){

            alert("Errore tecnico, contattare l'assistenza");  console.log(e);
        }
    }

    const GetDataUser = async () => {

        try{

            const data = await axios
            .post('http://localhost:3001/getuserdata',{ username : inputs.username, password : inputs.realpass, skin : SKIN["id"] })
            .then(response => {

                if(!response.data.message){

                    props.setUserC(ConvertObjectToArray(response.data[0]));
                    props.setLogin(true);
                    localStorage.setItem('username', response.data[0].username);
                    localStorage.setItem('passhash', response.data[0].passhash);

                    setLoader(false);
                    close();

                    SetLastLogin(userId.id)
                }else{
                    
                }
            })
        }catch (e){

           alert("Errore tecnico, contattare l'assistenza");
            console.log(e);
        }
    };

    const CheckIfUserExist = async () =>{

        const query = "SELECT * FROM users WHERE username = '"+inputs.username+"'";
        try{

            const data = await axios
            .post('http://localhost:3001/checkuniqplayer',{ query : query })
            .then(response => {

                setDupUsername([response.data.message]); 
            })

        }catch (e){

            alert("Errore tecnico, contattare l'assistenza");  console.log(e);
        }
    }

    const CheckIfUserExistEmail = async () =>{

        const query = "SELECT * FROM users WHERE email = '"+inputs.email+"'";
        try{

            const data = await axios
            .post('http://localhost:3001/checkuniqplayeremail',{ query : query })
            .then(response => {

                setDupEmail([response.data.message]); 
            })

        }catch (e){

            alert("Errore tecnico, contattare l'assistenza");  console.log(e);
        }
    }

    const GetShop = async () =>{

        try{

            const data = await axios
            .post('http://localhost:3001/getshop',{ id : inputs.promoter_code, skin : skinId, shop_level : SHOP_LEVEL })
            .then(response => {

                if(!response.data.message){
    
                    setPromoter(response.data[0])
                }else{
                   
                    setPromoter(["changedempty"]);
                }
            })
        }catch (e){

            alert("Errore tecnico, contattare l'assistenza");  console.log(e);
        }
    }

    const handleSubmit = () => {

        setErrorMessages([]);

        setErrorMessages(errore => ({...errore, "countAzioni" : 0}));

        if(!inputs.firstname){
            setErrorMessages(errore => ({...errore, 1 : "Inserisci il tuo nome"}));
        }

        if(!inputs.lastname){
            setErrorMessages(errore => ({...errore, 2 : "Inserisci il tuo cognome"}));
        }

        if(!inputs.email){
            setErrorMessages(errore => ({...errore, 3 : "Inserisci la tua email"}));
        }else{
            CheckIfUserExistEmail();
        }

        if(!inputs.mobile){
            setErrorMessages(errore => ({...errore, 4 : "Inserisci il tuo numero di cellulare"}));
        }

        if(!inputs.country_residence){
            setErrorMessages(errore => ({...errore, 5 : "Inserisci il tuo stato di residenza"}));
        }

        if(inputs.country_residence=='IT'){

            if(!inputs.province_residence){
                setErrorMessages(errore => ({...errore, 6 : "Inserisci la tua provincia di residenza"}));
            }

            if(!inputs.city_residence){
                setErrorMessages(errore => ({...errore, 7 : "Inserisci la tua città di residenza"}));
            }
        }else{
            setInputs(inputs => ({...inputs,"province_residence": "", "city_residence" : ""}));
        }

        if(!inputs.address_residence){
            setErrorMessages(errore => ({...errore, 8 : "Inserisci il tuo indirizzo di residenza"}));
        }

        if(!inputs.zip_residence){
            setErrorMessages(errore => ({...errore, 9 : "Inserisci il CAP di residenza"}));
        }

        if(!inputs.country_birth){
            setErrorMessages(errore => ({...errore, 10 : "Inserisci il tuo stato di nascita"}));
        }

        if(inputs.country_birth=='IT'){

            if(!inputs.province_birth){
                setErrorMessages(errore => ({...errore, 11 : "Inserisci la tua provincia di nascita"}));
            }

            if(!inputs.city_birth){
                setErrorMessages(errore => ({...errore, 12 : "Inserisci la tua città di nascita"}));
            }
        }else{
            setInputs(inputs => ({...inputs,"province_birth": "", "city_birth" : ""}));
        }

        if(!inputs.birthday){
            setErrorMessages(errore => ({...errore, 13 : "Inserisci il tuo giorno di nascita"}));
        }
        
        if(!getAge(inputs.birthday)){
            setErrorMessages(errore => ({...errore, 14 : "La tua età risulta inferiore ai minimi di legge richiesti per poter accedere alla nostra piattaforma"}));
        }

        if(!inputs.sex){
            setErrorMessages(errore => ({...errore, 15 : "Inserisci il tuo sesso"}));
        }

        if(inputs.country_residence=='IT'){

            if(!inputs.fiscal_code){
                setErrorMessages(errore => ({...errore, 16 : "Inserisci il tuo codcie fiscale o calcolalo automaticamente"}));
            }
        }

        if(!inputs.document_type){
            setErrorMessages(errore => ({...errore, 17 : "Inserisci la tua categoria di documento"}));
        }

        if(!inputs.document_number){
            setErrorMessages(errore => ({...errore, 18 : "Inserisci il tuo numero di documento"}));
        }

        if(format.test(inputs.username)){
            setErrorMessages(errore => ({...errore, 21 : "Impossibile creare un nome utente contenente caratteri speciali o spazi"}));
        }

        if(!inputs.realpass){
            setErrorMessages(errore => ({...errore, 22 : "Inserisci la tua password"}));
        }else{
           setInputs(inputs => ({...inputs,"passhash" : generateMd5(inputs.realpass)}));
        }
        
        if(!termini){
            setErrorMessages(errore => ({...errore, 23 : "E' necessario accetare i nostri termini e le condizioni d'uso"}));
        }

        if(!maggiorenne){
            setErrorMessages(errore => ({...errore, 24 : "E' necessario confermare di aver raggiunto la maggiore età"}));
        }

        if(!inputs.promoter_code){

            if(ckeckSkinSett(skinSettings, "reg_free")){

                setInputs(inputs => ({...inputs, "parent_id" : SKIN["online_shop_id"], currency : SKIN["currency"]}))
            }else{

                setErrorMessages(errore => ({...errore, 19 : "Inserisci il codice promotore"}));
            }
        }else{
            GetShop();
        }

        if(!inputs.username){
            setErrorMessages(errore => ({...errore, 20 : "Inserisci il tuo username"}));

        }else{
            CheckIfUserExist();
        }

        setInputs(inputs => ({...inputs,"fonte" : 1, "confirm_token" : generateUniqId(), "skin_id" : SKIN["id"], "api_key" : generateApiKey(), "user_level" : PLAYER_LEVEL, "primary_language" : SKIN["language"], "addedTime" : Math.floor(Date.now() / 1000), "last_login" : Math.floor(Date.now() / 1000)}));
    }

    const checkCpf = () =>{
        
    }

    return (

        <>
            <Modal isOpen={props.modalState} onRequestClose={close} className="mymodal" overlayClassName="myoverlay">
                <div class="modal-content modal-style-1">

                    {loader ? 

                    <>
                        <Spinner animation="border" role="status">
                            <span className="visually-hidden">Loading...</span>
                        </Spinner>
                    </>

                    :

                    <>

                        {<BoxPromo skindefaultpromo={SKIN["default_promo"]} skin_id={SKIN["id"]} />}

                        {modalError ? <ErrorBox message={ConvertObjectToArray(errorMessages)}/> : ""}

                        {!cpf ? 

                        <>

                            <div className="row">
                                <div className="col-sm-12">
                                    <h3>CPF</h3>
                                    <input type="text" className="form-control margin-bottom-5" id="cpf" name="cpf" placeholder="*CPF" maxlength="14" value={inputs.cpf || ""} onChange={handleChange}/>
                                    <button href="#" id="checkCpfButton" className="login" onClick={checkCpf}>Continua</button>
                                </div>
                            </div>

                        </>

                        :

                        <>
                        
                            <div></div>
                        
                        </>
                        
                        }
                    </>
                    }

                </div >
            </Modal>
        </>
    );
}

export default RegistrationModalPix;