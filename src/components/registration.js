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

import { useTranslation } from "react-i18next";

Modal.setAppElement("#root");

function generateApiKey(){

    var apiKey = generateMd5(generateUniqId());
    return apiKey;
}  

function RegistrationModal(props) {

    const { t, i18n } = useTranslation();

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


                //var erroreLuogoCod = t('erroregenerico');

                alert(t('codicefiscaleerroreluogo'));

                CodiceFiscale = "";
            }
            
            setInputs(inputs => ({...inputs,"fiscal_code": CodiceFiscale}));

        }else{

            alert(t('errorecodicefiscale'));
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

            alert(t('erroregenerico'));  console.log(e);
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

            alert(t('erroregenerico'));  console.log(e);
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

            alert(t('erroregenerico'));  console.log(e);
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

            alert(t('erroregenerico'));  console.log(e);
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

           alert(t('erroregenerico'));
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

            alert(t('erroregenerico'));  console.log(e);
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

            alert(t('erroregenerico'));  console.log(e);
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

            alert(t('erroregenerico'));  console.log(e);
        }
    }

    const handleSubmit = () => {

        setErrorMessages([]);

        setErrorMessages(errore => ({...errore, "countAzioni" : 0}));

        if(!inputs.firstname){
            setErrorMessages(errore => ({...errore, 1 : t('erroresignin.nome')}));
        }

        if(!inputs.lastname){
            setErrorMessages(errore => ({...errore, 2 : t('erroresignin.cognome')}));
        }

        if(!inputs.email){
            setErrorMessages(errore => ({...errore, 3 : t('erroresignin.email')}));
        }else{
            CheckIfUserExistEmail();
        }

        if(!inputs.mobile){
            setErrorMessages(errore => ({...errore, 4 : t('erroresignin.cellulare')}));
        }

        if(!inputs.country_residence){
            setErrorMessages(errore => ({...errore, 5 : t('erroresignin.statoresidenza')}));
        }

        if(inputs.country_residence=='IT'){

            if(!inputs.province_residence){
                setErrorMessages(errore => ({...errore, 6 : t('erroresignin.provinciaresidenza')}));
            }

            if(!inputs.city_residence){
                setErrorMessages(errore => ({...errore, 7 : t('erroresignin.cittaresidenza')}));
            }
        }else{
            setInputs(inputs => ({...inputs,"province_residence": "", "city_residence" : ""}));
        }

        if(!inputs.address_residence){
            setErrorMessages(errore => ({...errore, 8 : t('erroresignin.indirizzoresidenza')}));
        }

        if(!inputs.zip_residence){
            setErrorMessages(errore => ({...errore, 9 : t('erroresignin.capresidenza')}));
        }

        if(!inputs.country_birth){
            setErrorMessages(errore => ({...errore, 10 : t('erroresignin.statonascita')}));
        }

        if(inputs.country_birth=='IT'){

            if(!inputs.province_birth){
                setErrorMessages(errore => ({...errore, 11 : t('erroresignin.provincianascita')}));
            }

            if(!inputs.city_birth){
                setErrorMessages(errore => ({...errore, 12 : t('erroresignin.cittanascita')}));
            }
        }else{
            setInputs(inputs => ({...inputs,"province_birth": "", "city_birth" : ""}));
        }

        if(!inputs.birthday){
            setErrorMessages(errore => ({...errore, 13 : t('erroresignin.giornonascita')}));
        }
        
        if(!getAge(inputs.birthday)){
            setErrorMessages(errore => ({...errore, 14 : t('erroresignin.minorenne')}));
        }

        if(!inputs.sex){
            setErrorMessages(errore => ({...errore, 15 : t('erroresignin.sesso')}));
        }

        if(inputs.country_residence=='IT'){

            if(!inputs.fiscal_code){
                setErrorMessages(errore => ({...errore, 16 : t('erroresignin.fiscale')}));
            }
        }

        if(!inputs.document_type){
            setErrorMessages(errore => ({...errore, 17 : t('erroresignin.vatdoc')}));
        }

        if(!inputs.document_number){
            setErrorMessages(errore => ({...errore, 18 : t('erroresignin.numerodoc')}));
        }

        if(format.test(inputs.username)){
            setErrorMessages(errore => ({...errore, 21 : t('erroresignin.usernamespec')}));
        }

        if(!inputs.realpass){
            setErrorMessages(errore => ({...errore, 22 : t('erroresignin.password')}));
        }else{
           setInputs(inputs => ({...inputs,"passhash" : generateMd5(inputs.realpass)}));
        }
        
        if(!termini){
            setErrorMessages(errore => ({...errore, 23 : t('erroresignin.termini')}));
        }

        if(!maggiorenne){
            setErrorMessages(errore => ({...errore, 24 : t('erroresignin.maggiorenne')}));
        }

        if(!inputs.promoter_code){

            if(ckeckSkinSett(skinSettings, "reg_free")){

                setInputs(inputs => ({...inputs, "parent_id" : SKIN["online_shop_id"], currency : SKIN["currency"]}))
            }else{

                setErrorMessages(errore => ({...errore, 19 : t('erroresignin.codpromotore')}));
            }
        }else{
            GetShop();
        }

        if(!inputs.username){
            setErrorMessages(errore => ({...errore, 20 : t('erroresignin.username')}));

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
                setErrorMessages(errore => ({...errore, 25 : t('erroresignin.promotoreinesi'), "countAzioni" : errore.countAzioni+1}));
            }
        }
    }, [promoter]);

    useEffect(()=>{

        if(submit==1){
                    
            if(errorDupUsername=="changedfound"){
                setErrorMessages(errore => ({...errore, 26 : t('erroresignin.usernamedup'), "countAzioni" : errore.countAzioni+1}));
            }else{
                setErrorMessages(errore => ({...errore, "countAzioni" : errore.countAzioni+1}));
            }
        }
    },[errorDupUsername]);

    useEffect(()=>{

        if(submit==1){
                    
            if(errorDupEmail=="changedfound"){
                setErrorMessages(errore => ({...errore, 27 : t('erroresignin.dupemail'), "countAzioni" : errore.countAzioni+1}));
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

                    {<BoxPromo skin={SKIN} skindefaultpromo={SKIN["default_promo"]} skin_id={SKIN["id"]} />}

                        <div className="col-sm-8">

                            {modalError ? <ErrorBox message={ConvertObjectToArray(errorMessages)}/> : ""}

                                <div className="row">
                                    <div className="col-sm-6 pd-r-2">
                                        <label className="color-top" htmlFor="firstname">{t('nome')}</label>
                                        <input type="text" className="form-control margin-bottom-5" value={inputs.firstname || ""} onChange={handleChange} id="firstname" name="firstname" placeholder={"*"+t('nome')} />
                                    </div>
                                    <div className="col-sm-6 pd-l-2">
                                        <label className="color-top" htmlFor="lastname">{t('cognome')}</label>
                                        <input type="text" className="form-control margin-bottom-5" id="lastname" name="lastname" value={inputs.lastname || ""} onChange={handleChange} placeholder={"*"+t('cognome')} />
                                    </div>
                                    <div className="col-sm-6 pd-r-2">
                                        <label className="color-top" htmlFor="email">E-mail</label>
                                        <input type="email" className="form-control margin-bottom-5" id="email" name="email" value={inputs.email || ""} onChange={handleChange} placeholder="*E-mail" />
                                    </div>
                                    <div className="col-sm-6 pd-l-2">
                                        <label className="color-top" htmlFor="mobile">{t('cellulare')}</label>
                                        <input type="text" className="form-control margin-bottom-5" id="mobile" name="mobile" value={inputs.mobile || ""} onChange={handleChange} placeholder={"*"+t('cellulare')} />
                                    </div>
                                </div>
                                <div className="row">
                                    <div className="col-sm-12" id="div_country_residence">
                                        <label className="color-top" htmlFor="c">{t('statoresidenza')}</label>
                                        <SelectCountry name={"country_residence"} value={inputs.country_residence || ""} onchange={()=>handleChange}/>
                                    </div>

                                    {
                                    
                                        inputs.country_residence=='IT' ?

                                            <>

                                                <div className="col-sm-6 pd-r-2 geo_residence_italy" id="div_province_residence">
                                                    <label className="color-top" htmlFor="province_residence">{t('provinciaresidenza')}</label>
                                                    <SelectProvince name={"province_residence"} value={inputs.province_residence || ""} onchange={()=>handleChange}/>
                                                </div>

                                                <div className="col-sm-6 pd-l-2 geo_residence_italy" id="city_residence">
                                                    <label className="color-top" htmlFor="city_residence">{t('cittaresidenza')}</label>
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
                                        <label className="color-top" htmlFor="address_residence">{t('indirizzoresidenza')}</label>
                                        <input type="text" className="form-control margin-bottom-5" id="address_residence" value={inputs.address_residence || ""} onChange={handleChange} name="address_residence" placeholder={"*"+t('indirizzoresidenza')} />
                                    </div>
                                    <div className="col-sm-4 pd-l-2">
                                        <label className="color-top" htmlFor="zip_residence">{t('capresidenza')}</label>
                                        <input type="text" className="form-control margin-bottom-5" id="zip_residence" value={inputs.zip_residence || ""} onChange={handleChange} name="zip_residence" placeholder={"*"+t('capresidenza')} />
                                    </div>
                                </div>
                                <div className="row">
                                    <div className="col-sm-12" id="div_cliente_nazione">
                                        <label className="color-top" htmlFor="cliente_nazione">{t('statonascita')}</label>
                                        <SelectCountry name={"country_birth"} value={inputs.country_birth || ""} onchange={()=>handleChange}/>
                                    </div>


                                    
                                    
                                    {
                                        inputs.country_birth=='IT' ?

                                            <>

                                                <div className="col-sm-6 pd-r-2 geo_italy" id="div_cliente_provincia">
                                                    <label className="color-top" htmlFor="cliente_provincia">{t('provincianascita')}</label>
                                                    <SelectProvince name={"province_birth"} value={inputs.province_birth || ""} onchange={()=>handleChange}/>
                                                </div>

                                                <div className="col-sm-6 pd-l-2 geo_italy" id="div_cliente_citta">
                                                    <label className="color-top" htmlFor="citta">{t('cittanascita')}</label>
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
                                        <label className="color-top" htmlFor="citta">{t('datanascita')}</label>
                                            <SelectDate value={inputs.birthday || ""} onchange={()=>handleChangeData}/>
                                        </div>
                                        <div className="col-sm-6 pd-l-2">
                                            <label className="color-top" htmlFor="sesso">{t('sesso')}</label>
                                            <select className="form-control margin-bottom-5" name="sex" id="sex" value={inputs.sex || ""} onChange={handleChange}>
                                                <option value="">{"--"+t('seleziona')+"--"}</option>
                                                <option value="m">{t('uomo')}</option>
                                                <option value="f">{t('donna')}</option>
                                            </select>
                                        </div>
                                    </div>
                                </div>

                                {
                                    
                                    inputs.country_residence=='IT' ?

                                        <>

                                            <div className="row">
                                                <div className="col-sm-12" id="fiscal_code_area">
                                                    <label className="color-top" htmlFor="fiscal_code">{t('codicefiscale')}</label>
                                                    <div className="input-group  margin-bottom-5">
                                                        <input type="text" className="form-control" name="fiscal_code" id="fiscal_code" placeholder={"*"+t('codicefiscale')} aria-label="Fiscal Code" aria-describedby="basic-addon1" value={inputs.fiscal_code || ""} onChange={handleChange} />
                                                        <div className="input-group-append">
                                                            <span className="input-group-text" id="basic-addon1">
                                                                <button href="#" onClick={CalcoloCodiceFiscale}>{t('calcola')}</button>
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
                                        <label className="color-top" htmlFor="document_type">{t('tipodocumento')}</label>
                                        <select name="document_type" id="document_type" className="form-control margin-bottom-5" value={inputs.document_type || ""} onChange={handleChange}>
                                            <option value="">{"--"+t('seleziona')+"--"}</option>
                                            <option value="identity_card">{t('cartaid')}</option>
                                            <option value="passport">{t('passaporto')}</option>
                                            <option value="drivers_license">{t('patente')}</option>
                                        </select>
                                    </div>
                                    <div className="col-sm-6 pd-l-2">
                                        <label className="color-top" htmlFor="document_number">{t('numerodoc')}</label>
                                        <input type="text" className="form-control margin-bottom-5" id="document_number" name="document_number" placeholder={"*"+t('numerodoc')} value={inputs.document_number || ""} onChange={handleChange}/>
                                    </div>
                                </div>

                                <div className="row margin-regulation2">
                                    <div className="col-sm-12 pd-l-2 pd-r-2">
                                        <label className="color-top" htmlFor="promoter_code">{t('codicepromotore')}</label>
                                        <input type="text" className="form-control margin-bottom-5" id="promoter_code" name="promoter_code" placeholder={"*"+t('codicepromotore')} value={inputs.promoter_code || ""} onChange={handleChange}/>
                                    </div>
                                </div>

                                <div className="row">
                                    <div className="col-sm-6 pd-r-2">
                                        <label className="color-top" htmlFor="username">{t('nomeutente')}</label>
                                        <input type="text" className="form-control margin-bottom-5" id="username" name="username" placeholder={"*"+t('nomeutente')} value={inputs.username || ""} onChange={handleChange}/>
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
                                            * {t('ho18anni')} </label>
                                    </div>
                                    <div className="col-sm-8 pd-l-2">
                                        <input className="form-check-input" type="checkbox" name="18years" id="18years" onClick={()=>setTermini(!termini)}/>
                                        <label className="form-check-label white" htmlFor="18years">
                                            * <a href="">{t('termini')}</a> {t('e')} <a href="">{t('politicariservatezza')}</a> {t('sonoaccettate')}
                                        </label>
                                    </div>
                                </div>

                                {!asking ? <button type="submit" className="login" onClick={()=>{setAsking(true);handleSubmit();setSubmit(1)}}>{t('registrati')}</button> : ""}

                                <p className="white">{t('haigaccount')}? <a href="#" onClick={()=>{props.openModalLogin(); close();}}>{t('accediora')}</a></p>
                        </div>
                    </>}
                </div >
            </Modal >
        </>
    );
}

export default RegistrationModal;