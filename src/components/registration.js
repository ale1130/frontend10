import React, { useState, useEffect } from "react";
import Modal from "react-modal";

import {SetLastLogin, PLAYER_LEVEL, ConvertObjectToArraySettings, getAge, format, generateMd5, generateUniqId, ckeckSkinSett, skinId, SHOP_LEVEL, ConvertObjectToArray, ConvertObjectToStringIndex, ConvertObjectToStringValues } from "../constants/global";

import BoxPromo from './boxpromodefault'
import ErrorBox from "../components/errorBox";

import {SelectCountry} from './selectCountry';
import {SelectProvince} from './selectCountry';
import {SelectCity} from './selectCountry';

import SelectDate from './selectDate'

import axios from "axios";

import 'bootstrap/dist/css/bootstrap.min.css';
import Spinner from 'react-bootstrap/Spinner';

Modal.setAppElement("#root");

function generateApiKey(){

    var apiKey = generateMd5(generateUniqId());
    return apiKey;
}  

function RegistrationModal(props) {

    const close = props.closeModal;
    const SKIN = props.skin;

    const [inputs, setInputs] = useState(["empty"]);

    const [modalError, setModalError] = useState(false);

    const [termini, setTermini] = useState(false);
    const [maggiorenne, setMaggiorenne] = useState(false);

    const [skinSettings, setSkinSettings] = useState(["empty"]);

    const [errorMessages, setErrorMessages] = useState([]);
    const [submit, setSubmit] = useState(0);

    const [promoter, setPromoter] = useState(["empty"]);
    const [errorDupUsername, setDupUsername] = useState(["found"]);
    const [errorDupEmail, setDupEmail] = useState(["found"]);

    const [loader, setLoader] = useState(false);

    const [userId, setUserId] = useState({"id":0});
    const [asking, setAsking] = useState(false);

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

    var CodiceFiscale = require('codice-fiscale-js');

    const CalcoloCodiceFiscale = () =>{

        if(inputs.firstname && inputs.lastname && inputs.sex && inputs.birthday && inputs.city_birth){

            const gender = inputs.sex;

            var dateObj = new Date(inputs.birthday);

            if(inputs.country_birth=='IT'){
                CodiceFiscale = new CodiceFiscale({
                    name: inputs.firstname,
                    surname: inputs.lastname,
                    gender: gender.toUpperCase(),
                    day: dateObj.getUTCDate(),
                    month: dateObj.getUTCMonth() + 1,
                    year: dateObj.getUTCFullYear(),
                    birthplace: inputs.city_birth, 
                });
            }else{

                alert("Se il luogo di nascita corrisponde ad un paese estero si prega di inserire il codice fiscale manualmente");

                CodiceFiscale = "";
            }
            
            setInputs(inputs => ({...inputs,"fiscal_code": CodiceFiscale}));

        }else{
            alert("E' necessario inserire tutti i dati utili: nome, cognome, data e luogo di nascita per poter calcolare il codice fiscale");
        }
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

    //UseEffect superflui

    useEffect(()=>{

        if(submit==1){

            if(promoter != "changedempty"){
                setInputs(inputs => ({...inputs, "parent_id" : promoter.id , currency : promoter.currency}));
                setErrorMessages(errore => ({...errore, "countAzioni" : errore.countAzioni+1}));
            }else{
                setErrorMessages(errore => ({...errore, 25 : "Impossibile trovare un promotore associato a questo codice", "countAzioni" : errore.countAzioni+1}));
            }
        }
    }, [promoter]);

    useEffect(()=>{

        if(submit==1){
                    
            if(errorDupUsername=="changedfound"){
                setErrorMessages(errore => ({...errore, 26 : "Ci dispiace ma il nome utente digitato risulta già utilizzato, si prega di sceglierne un altro", "countAzioni" : errore.countAzioni+1}));
            }else{
                setErrorMessages(errore => ({...errore, "countAzioni" : errore.countAzioni+1}));
            }
        }
    },[errorDupUsername]);

    useEffect(()=>{

        if(submit==1){
                    
            if(errorDupEmail=="changedfound"){
                setErrorMessages(errore => ({...errore, 27 : "La mail inserita risulta già registrata nella nostra banca dati, se non hai sbagliato a digitare prova ad effettuare il login ora!", "countAzioni" : errore.countAzioni+1}));
            }else{
                setErrorMessages(errore => ({...errore, "countAzioni" : errore.countAzioni+1}));
            }
        }
    },[errorDupEmail]);

    //

    useEffect(()=>{

        if(submit==1){
            
            setModalError(false);
            
            if(ConvertObjectToArray(errorMessages).length>0){
                setAsking(false);
                setModalError(true);
            }else if(errorMessages.countAzioni==3){
                setLoader(true);
                
                setAsking(true)
                createPlayer();
            }
        }
        
    },[errorMessages]);

    return (
        <>
        
            <Modal isOpen={props.modalState} onRequestClose={close} className="mymodal" overlayClassName="myoverlay">

                <div className="row">

                    {loader ? 

                    <>
                        <Spinner animation="border" role="status">
                            <span className="visually-hidden">Loading...</span>
                        </Spinner>
                    </>

                    :

                    <>

                    {<BoxPromo skindefaultpromo={SKIN["default_promo"]} skin_id={SKIN["id"]} />}

                        <div className="col-sm-8">

                            {modalError ? <ErrorBox message={ConvertObjectToArray(errorMessages)}/> : ""}

                                <div className="row">
                                    <div className="col-sm-6 pd-r-2">
                                        <label className="color-top" htmlFor="firstname">First name</label>
                                        <input type="text" className="form-control margin-bottom-5" value={inputs.firstname || ""} onChange={handleChange} id="firstname" name="firstname" placeholder="*First name" />
                                    </div>
                                    <div className="col-sm-6 pd-l-2">
                                        <label className="color-top" htmlFor="lastname">Surname</label>
                                        <input type="text" className="form-control margin-bottom-5" id="lastname" name="lastname" value={inputs.lastname || ""} onChange={handleChange} placeholder="*Surname" />
                                    </div>
                                    <div className="col-sm-6 pd-r-2">
                                        <label className="color-top" htmlFor="email">E-mail</label>
                                        <input type="email" className="form-control margin-bottom-5" id="email" name="email" value={inputs.email || ""} onChange={handleChange} placeholder="*E-mail" />
                                    </div>
                                    <div className="col-sm-6 pd-l-2">
                                        <label className="color-top" htmlFor="mobile">Mobile number</label>
                                        <input type="text" className="form-control margin-bottom-5" id="mobile" name="mobile" value={inputs.mobile || ""} onChange={handleChange} placeholder="*Mobile number" />
                                    </div>
                                </div>
                                <div className="row">
                                    <div className="col-sm-12" id="div_country_residence">
                                        <label className="color-top" htmlFor="c">Country of residence</label>
                                        <SelectCountry name={"country_residence"} value={inputs.country_residence || ""} onchange={()=>handleChange}/>
                                    </div>

                                    {
                                    
                                        inputs.country_residence=='IT' ?

                                            <>

                                                <div className="col-sm-6 pd-r-2 geo_residence_italy" id="div_province_residence">
                                                    <label className="color-top" htmlFor="province_residence">Province of residence</label>
                                                    <SelectProvince name={"province_residence"} value={inputs.province_residence || ""} onchange={()=>handleChange}/>
                                                </div>

                                                <div className="col-sm-6 pd-l-2 geo_residence_italy" id="city_residence">
                                                    <label className="color-top" htmlFor="city_residence">City of residence</label>
                                                    <span id="residence_selprovmsg">
                                                        <SelectCity name={"city_residence"} value={inputs.city_residence || ""} onchange={()=>handleChange}/>
                                                    </span>

                                                </div>

                                            </>
                                        :

                                            <></>

                                    }

                                </div>
                                <div className="row">
                                    <div className="col-sm-8 pd-r-2">
                                        <label className="color-top" htmlFor="address_residence">Residence address</label>
                                        <input type="text" className="form-control margin-bottom-5" id="address_residence" value={inputs.address_residence || ""} onChange={handleChange} name="address_residence" placeholder="*Residence address" />
                                    </div>
                                    <div className="col-sm-4 pd-l-2">
                                        <label className="color-top" htmlFor="zip_residence">Postal code of residence</label>
                                        <input type="text" className="form-control margin-bottom-5" id="zip_residence" value={inputs.zip_residence || ""} onChange={handleChange} name="zip_residence" placeholder="*Postal code of residence" />
                                    </div>
                                </div>
                                <div className="row">
                                    <div className="col-sm-12" id="div_cliente_nazione">
                                        <label className="color-top" htmlFor="cliente_nazione">Country of birth</label>
                                        <SelectCountry name={"country_birth"} value={inputs.country_birth || ""} onchange={()=>handleChange}/>
                                    </div>


                                    
                                    
                                    {
                                        inputs.country_birth=='IT' ?

                                            <>

                                                <div className="col-sm-6 pd-r-2 geo_italy" id="div_cliente_provincia">
                                                    <label className="color-top" htmlFor="cliente_provincia">Province of birth</label>
                                                    <SelectProvince name={"province_birth"} value={inputs.province_birth || ""} onchange={()=>handleChange}/>
                                                </div>

                                                <div className="col-sm-6 pd-l-2 geo_italy" id="div_cliente_citta">
                                                    <label className="color-top" htmlFor="citta">City of Birth</label>
                                                    <span id="selprovmsg">
                                                        <SelectCity name={"city_birth"} value={inputs.city_birth || ""} onchange={()=>handleChange}/>                                    
                                                    </span>
                                                </div>
                                            </>

                                        :

                                            <></>

                                    }

                                </div>
                                <div className="birthday_box">
                                    <div className="row">
                                        <div className="col-sm-6 pd-l-2">
                                            <SelectDate value={inputs.birthday || ""} onchange={()=>handleChangeData}/>
                                        </div>
                                        <div className="col-sm-6 pd-l-2">
                                            <label className="color-top" htmlFor="sesso">Sex</label>
                                            <select className="form-control margin-bottom-5" name="sex" id="sex" value={inputs.sex || ""} onChange={handleChange}>
                                                <option value="">--Select--</option>
                                                <option value="m">Male</option>
                                                <option value="f">Female</option>
                                            </select>
                                        </div>
                                    </div>
                                </div>

                                {
                                    
                                    inputs.country_residence=='IT' ?

                                        <>

                                            <div className="row">
                                                <div className="col-sm-12" id="fiscal_code_area">
                                                    <label className="color-top" htmlFor="fiscal_code">Fiscal Code</label>
                                                    <div className="input-group  margin-bottom-5">
                                                        <input type="text" className="form-control" name="fiscal_code" id="fiscal_code" placeholder="*Fiscal Code" aria-label="Fiscal Code" aria-describedby="basic-addon1" value={inputs.fiscal_code || ""} onChange={handleChange} />
                                                        <div className="input-group-append">
                                                            <span className="input-group-text" id="basic-addon1">
                                                                <button href="#" onClick={CalcoloCodiceFiscale}>Calcola</button>
                                                            </span>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>

                                        </>

                                    :
                                        <></>

                                }

                                <div className="row">
                                    <div className="col-sm-6 pd-r-2">
                                        <label className="color-top" htmlFor="document_type">Document type</label>
                                        <select name="document_type" id="document_type" className="form-control margin-bottom-5" value={inputs.document_type || ""} onChange={handleChange}>
                                            <option value="">--Select--</option>
                                            <option value="identity_card">Identity card</option>
                                            <option value="passport">Passport</option>
                                            <option value="drivers_license">Driving license</option>
                                        </select>
                                    </div>
                                    <div className="col-sm-6 pd-l-2">
                                        <label className="color-top" htmlFor="document_number">Document number</label>
                                        <input type="text" className="form-control margin-bottom-5" id="document_number" name="document_number" placeholder="*Document number" value={inputs.document_number || ""} onChange={handleChange}/>
                                    </div>
                                </div>

                                <div className="row margin-regulation2">
                                    <div className="col-sm-12 pd-l-2 pd-r-2">
                                        <label className="color-top" htmlFor="promoter_code">Promoter code</label>
                                        <input type="text" className="form-control margin-bottom-5" id="promoter_code" name="promoter_code" placeholder="Promoter code" value={inputs.promoter_code || ""} onChange={handleChange}/>
                                    </div>
                                </div>

                                <div className="row">
                                    <div className="col-sm-6 pd-r-2">
                                        <label className="color-top" htmlFor="username">Username</label>
                                        <input type="text" className="form-control margin-bottom-5" id="username" name="username" placeholder="*Username" value={inputs.username || ""} onChange={handleChange}/>
                                    </div>
                                    <div className="col-sm-6 pd-l-2">
                                        <label className="color-top" htmlFor="password">Password</label>
                                        <input type="password" className="form-control margin-bottom-5" id="realpass" name="realpass" placeholder="*Password" value={inputs.realpass || ""} onChange={handleChange}/>
                                    </div>
                                </div>
                                <div className="row">
                                    <div className="col-sm-4 pd-r-2">
                                        <input className="form-check-input" type="checkbox" name="terms_conditions" id="terms_conditions" onClick={()=>setMaggiorenne(!maggiorenne)} />
                                        <label className="form-check-label white" htmlFor="terms_conditions" >
                                            * I have more than 18 years </label>
                                    </div>
                                    <div className="col-sm-8 pd-l-2">
                                        <input className="form-check-input" type="checkbox" name="18years" id="18years" onClick={()=>setTermini(!termini)}/>
                                        <label className="form-check-label white" htmlFor="18years">
                                            * <a href="">Terms and conditions</a> and <a href="">Privacy Policy</a> are accepted
                                        </label>
                                    </div>
                                </div>

                                {!asking ? <button type="submit" className="login" onClick={()=>{setAsking(true);handleSubmit();setSubmit(1)}}>Registrati</button> : ""}

                                <p className="white">Do you already have an account? <a href="#" onClick={()=>{props.openModalLogin(); close();}}>Login now</a></p>
                        </div>
                    </>}
                </div >
            </Modal >
        </>
    );
}

export default RegistrationModal;