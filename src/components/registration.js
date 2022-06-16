import React, { useState, useEffect } from "react";
import Modal from "react-modal";

import { PLAYER_LEVEL, ConvertObjectToArraySettings, getAge, format, generateMd5, generateUniqId, ckeckSkinSett, skinId, SHOP_LEVEL, ConvertObjectToArray, ConvertObjectToStringIndex, ConvertObjectToStringValues } from "../constants/global";

import BoxPromo from './boxpromodefault'
import ErrorBox from "../components/errorBox";

import {SelectCountry} from './selectCountry';
import {SelectProvince} from './selectCountry';
import {SelectCity} from './selectCountry';

import SelectDate from './selectDate'

import axios from "axios";


Modal.setAppElement("#root");

function RegistrationModal(props) {

    const close = props.closeModal;
    const SKIN = props.skin;

    const [inputs, setInputs] = useState({});

    const [modalError, setModalError] = useState(false);
    const [errorMessage, setErrorMessage] = useState([]);

    const [termini, setTermini] = useState(false);
    const [maggiorenne, setMaggiorenne] = useState(false);

    const [skinSettings, setSkinSettings] = useState(["empty"]);

    const [invio, setInvio] = useState(false);
    const [promoter, setPromoter] = useState(["empty"])

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

    const error = (message="Errore") =>{

        if(message.length>0){
            setErrorMessage(message);
            setModalError(true);
        }else{
            setModalError(false);
            setErrorMessage([]);
        }
    }
    
    const Settings = async () =>{
        try{

            const data = await axios
            .post('http://localhost:3001/getskinsettings',{ id : SKIN["id"] })
            .then(response => {

                if(!response.data.error){

                    setSkinSettings(ConvertObjectToArraySettings(response.data));
                }else{
                    alert("Errore tecnico, contattare l'assistenza");
                }
            })

        }catch (e){

            alert("Errore tecnico, contattare l'assistenza");  console.log(e);
        }
    };

    const createPlayer = async () =>{

        const indici = ConvertObjectToStringIndex(inputs);
        const valori = ConvertObjectToStringValues(inputs);

        console.log(indici);
        console.log(valori);

        /*try{

            const data = await axios
            .post('http://localhost:3001/createplayer',{ indici : indici, valori : valori })
            .then(response => {

                if(!response.data.err){

                    console.log(response.data[0]);
                }else{

                    console.log(response.data.err);
                }
            })

        }catch (e){

            alert("Errore tecnico, contattare l'assistenza");  console.log(e);
        }*/
    }

    const getUserid = async () =>{

        /*try{

            const data = await axios
            .post('http://localhost:3001/adduserpath',{ skin_id: SKIN["id"], username : userData.username})
            .then(response => {

                if(!response.data.err){

                    console.log(response.data[0]);
                }else{

                    console.log(response.data.err);
                }
            })

        }catch (e){

            alert("Errore tecnico, contattare l'assistenza");  console.log(e);
        }*/
    }

    const AddUserPath = async () =>{

        //const path = promoter.user_path+"/"+userData.id;

        /*try{

            const data = await axios
            .post('http://localhost:3001/adduserpath',{ user : userData.id , user_path : path })
            .then(response => {

                if(!response.data.err){

                    console.log(response.data[0]);
                }else{

                    console.log(response.data.err);
                }
            })

        }catch (e){

            alert("Errore tecnico, contattare l'assistenza");  console.log(e);
        }*/
    }

    useEffect(() => {
        Settings();
    },[]);

    const GetShop = async () =>{
        try{

            const data = await axios
            .post('http://localhost:3001/getshop',{ id : inputs.promoter_code, skin : skinId, shop_level : SHOP_LEVEL })
            .then(response => {
    
                if(!response.data.message){
    
                    setPromoter(response.data[0]);

                }else{
                    setPromoter(["empty"]);
                }
            })
        }catch (e){

            alert("Errore tecnico, contattare l'assistenza");  console.log(e);
        }
    }

    useEffect(() => {
        GetShop();
    },[inputs.promoter_code]);

    function generateApiKey(){

        var apiKey = generateMd5(generateUniqId());
        return apiKey;
    }  

    const handleSubmit = (event) => {

        event.preventDefault();
        
        var errorMsg= [];

        if(!inputs.firstname){
            errorMsg [0] = "Inserisci il tuo nome";
        }

        if(!inputs.lastname){
            errorMsg [1] = "Inserisci il tuo cognome";
        }

        if(!inputs.email){
            errorMsg [2] = "Inserisci la tua email";
        }

        if(!inputs.mobile){
            errorMsg [3] = "Inserisci il tuo numero di cellulare";
        }

        if(!inputs.country_residence){
            errorMsg [4] = "Inserisci il tuo stato di residenza";
        }

        if(inputs.country_residence=='IT'){

            if(!inputs.province_residence){
                errorMsg [5] = "Inserisci la tua provincia di residenza";
            }

            if(!inputs.city_residence){
                errorMsg [6] = "Inserisci la tua città di residenza";
            }

        }

        if(!inputs.address_residence){
            errorMsg [7] = "Inserisci il tuo indirizzo di residenza";
        }

        if(!inputs.zip_residence){
            errorMsg [8] = "Inserisci il CAP di residenza";
        }

        if(!inputs.country_birth){
            errorMsg [9] = "Inserisci il tuo stato di nascita";
        }

        if(inputs.country_birth=='IT'){

            if(!inputs.province_birth){
                errorMsg [10] = "Inserisci la tua provincia di nascita";
            }

            if(!inputs.city_birth){
                errorMsg [11] = "Inserisci la tua città di nascita";
            }
        }

        if(!inputs.birthday){
            errorMsg [12] = "Inserisci il tuo giorno di nascita";
        }
        
        if(!getAge(inputs.birthday)){
            errorMsg [13] = "La tua età risulta inferiore ai minimi di legge richiesti per poter accedere alla nostra piattaforma";
        }

        if(!inputs.sex){
            errorMsg [15] = "Inserisci il tuo sesso";
        }

        if(inputs.country_residence=='IT'){

            if(!inputs.fiscal_code){
                errorMsg [16] = "Inserisci il tuo codcie fiscale o calcolalo automaticamente";
            }
        }

        if(!inputs.document_type){
            errorMsg [17] = "Inserisci la tua categoria di documento";
        }

        if(!inputs.document_number){
            errorMsg [18] = "Inserisci il tuo numero di documento";
        }

        if(!inputs.promoter_code){

            if(ckeckSkinSett(skinSettings, "reg_free")){

                setInputs(inputs => ({...inputs, "parent_id" : SKIN["online_shop_id"], currency : SKIN["currency"]}))
            }else{

                errorMsg [19] = "Inserisci il codice promotore";
            }
        }else{

            if(promoter != "empty"){
                setInputs(inputs => ({...inputs, "parent_id" : promoter.id , currency : promoter.currency}))
            }else{
                errorMsg [25] = "Impossibile trovare un promotore associato a questo codice";
            }
        }

        if(!inputs.username){
            errorMsg [20] = "Inserisci il tuo username";
        } else if(format.test(inputs.username)){
            errorMsg [24] = "Impossibile creare un nome utente contenente caratteri speciali o spazi";
        }

        if(!inputs.realpass){
            errorMsg [21] = "Inserisci la tua password";
        }else{
        
           setInputs(inputs => ({...inputs,"passhash" : generateMd5(inputs.realpass)}));
        }
        
        if(!termini){
            errorMsg [22] = "E' necessario accetare i nostri termini e le condizioni d'uso";
        }

        if(!maggiorenne){
            errorMsg [23] = "E' necessario confermare di aver raggiunto la maggiore età";
        }

        console.log();

        setInputs(inputs => ({...inputs,"fonte" : 1, "confirm_token" : generateUniqId(), "skin_id" : SKIN["id"], "api_key" : generateApiKey(), "user_level" : PLAYER_LEVEL, "primary_language" : SKIN["language"], "addedTime" : Math.floor(Date.now() / 1000), "last_login" : Math.floor(Date.now() / 1000)}));
        
        error(errorMsg);
        
        setInvio(!invio);
    }

    useEffect(() => {
        if (!modalError) {
            createPlayer();
        }
    }, [invio]);
    

    return (
        <>
            <Modal isOpen={props.modalState} onRequestClose={close} className="mymodal" overlayClassName="myoverlay">
                <div className="row">

                 {<BoxPromo skindefaultpromo={SKIN["default_promo"]} skin_id={SKIN["id"]} />}

                    <div className="col-sm-8">
                        <form onSubmit={handleSubmit} className="form-signUp clearForm">

                        {modalError ? <ErrorBox message={errorMessage}/> : ""}

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
                                                            <a href="#" /*onClick="calcolaCodiceFiscale()"*/><span className="fa fa-calculator"></span></a>
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
                            <input type="submit" className="login" value={"Sign in"} />
                            <p className="white">Do you already have an account? <a href="#" onClick={()=>{props.openModalLogin(); close();}}>Login now</a></p>
                        </form>
                    </div>
                </div >
            </Modal >
        </>
    );
}

export default RegistrationModal;