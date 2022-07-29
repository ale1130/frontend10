import { isMobile, browserName } from "react-device-detect";

import axios from "axios";

import Cookies from 'universal-cookie';

const cookies = new Cookies();

export const PLAYER_LEVEL = 30;
export const SHOP_LEVEL = 20;

export const CURR_DEVICE = isMobile ? "MOBILE" : "DESKTOP";

export const SkinName = "BetPlay360";

export const ConvertObjectToArray = (object) =>{

    var objectArray = Object.entries(object);

    var arrUtilizzo1 = [];

    var arrUtilizzo2 = [];

    objectArray.forEach(([key, value]) => {

        arrUtilizzo1.push(key);
    });

    arrUtilizzo1.map(indice => {

        arrUtilizzo2.push(object[indice]);
    })

    var ArrTotale = [];

    ArrTotale.push(arrUtilizzo1,arrUtilizzo2);

    return ArrTotale;
}

export const CorrectMethodsArray = (object) =>{

    const deposito = object.depositMethods;
    const prelievo = object.withdrawMethods;

    var arrUtilizzo = [];
    var arrUtilizzo2 = [];

    var objectArray = Object.entries(deposito);

    objectArray.forEach(([key, value]) => {

        if(!arrUtilizzo[value.method_code]){

            arrUtilizzo2.push(value);
        }

        arrUtilizzo[value.method_code] = value;
    });

    var objectArray = Object.entries(prelievo);

    objectArray.forEach(([key, value]) => {

        if(!arrUtilizzo[value.method_code]){
            
            arrUtilizzo2.push(value);
        }

        arrUtilizzo[value.method_code] = value;
    });

    return arrUtilizzo2;
}

export const ConvertToAssociativeArray = (object) =>{

    var arrUtilizzo = [];

    var objectArray = Object.entries(object);

    objectArray.forEach(([key, value]) => {

        arrUtilizzo[value.method_code] = value;
    });

    return arrUtilizzo;
}

export const ConvertObjectToArraySlideshow = (object) =>{

    var arrUtilizzo = [];
    var arrUtilizzo2 = [];
    var i=0;

    for(i=1; i<=6; i++){
        if(object["img_"+i]){
            arrUtilizzo = [];
            arrUtilizzo["url"]=(object["img_"+i]);
            arrUtilizzo2.push(arrUtilizzo);
        }
    }

    return arrUtilizzo2;
}

export const ConvertObjectToArrayErrors = (object) =>{

    var objectArray = Object.entries(object);

    var arrUtilizzo = [];

    objectArray.forEach(([key, value]) => {

      arrUtilizzo.push(value);
    });

    return arrUtilizzo;
}

export const ConvertObjectToStringIndex = (object) =>{

    var objectArray = Object.entries(object);

    var arrUtilizzo = "(";

    objectArray.forEach(([key , value]) => {
        if(value!='' && value!="empty"){
            arrUtilizzo += key+", ";
        }
    });

    arrUtilizzo = arrUtilizzo.slice(0, arrUtilizzo.length - 1);
    arrUtilizzo = arrUtilizzo.slice(0, arrUtilizzo.length - 1);

    arrUtilizzo += ")";

    return arrUtilizzo;
}

export const ConvertObjectToStringValues = (object) =>{

    var objectArray = Object.entries(object);

    var arrUtilizzo = "(";

    objectArray.forEach(([key , value]) => {

        if(value!='' && value!="empty"){
            if(isNaN(value)){
                arrUtilizzo += "'"+value+"', ";
            }else{
                arrUtilizzo += value+", ";
            }
        }
    });

    arrUtilizzo = arrUtilizzo.slice(0, arrUtilizzo.length - 1);
    arrUtilizzo = arrUtilizzo.slice(0, arrUtilizzo.length - 1);

    arrUtilizzo += ")";

    return arrUtilizzo;
}

export const getAge = (dateString) => {

    var today = new Date();
    var birthDate = new Date(dateString);
    var age = today.getFullYear() - birthDate.getFullYear();
    var m = today.getMonth() - birthDate.getMonth();

    if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
        age--;
    }

    if(age>=18){
        return true;
    }else{
        return false;
    }
}

export const skinUrl = /*new URL(document.location.origin)*/ "https://betplay360.com/";

export const api = axios.create({baseURL: skinUrl});

export const skinId = 3;

export const logoDirectory = "https://media.betzonelab.com/skins/logo/";

export const format = /[ `!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?~]/;

export const generateMd5 = (string) =>{

    var md5 = require('md5');

    var risposta = md5(string);

    return risposta;
}

export const generateUniqId = () =>{

    return Date.now().toString(36) + Math.random().toString(36).substr(2);
}

export const convertDate = (timeStamp) =>{
    var data = timeStamp*1000;
    var a = new Date(data);
    var year = a.getFullYear();
    var month = a.getMonth();
    var date = a.getDate();
    var hour = a.getHours();
    var min = a.getMinutes();
    var sec = a.getSeconds();
    var result = date + '/' + month + '/' + year + ' ' + hour + ':' + min;

    return result;
}

export const LogOut = () => {

    if (window.confirm('Sicuro?')){
        cookies.remove('gio_uid', { path: '/' });
        cookies.remove('gio_pass', { path: '/' });
        window.location.href="/";
    }
};

export const checkSkinSett = (arraySettings, setting) =>{

    if(arraySettings.indexOf(setting)> -1){
        return true;
    }else{
        return false;
    }
}

export const PROVIDERS_LOGO_WEB_PATH = (SKIN) =>{
    return SKIN["cdn_url"]+"/providers/img/";
}

export const MEDIA_PROMO_WEB_PATH = (SKIN) =>{
    return SKIN["cdn_url"]+"/promotions/";
}

export const MEDIA_SLIDESHOWS_WEB_PATH = (SKIN) =>{
    return SKIN["cdn_url"]+"/slideshow/";
}

export const SKIN_LOGO_WEB_PATH = (SKIN) =>{
    return SKIN["cdn_url"]+"/skins/logo/";
}

export const SKIN_FOOTER_IMG_WEB_PATH = (SKIN) =>{
    return SKIN["cdn_url"]+"/skins/footer/";
}

export const DEPOSIT_IMG_WEB_PATH = () =>{
    return "https://stagemedia.gamesolutions.org/deposit/";
}

export const LOBBIES_LOGO_WEB_PATH = (SKIN) =>{
    return SKIN["cdn_url"]+"/lobbies/img/";
}

export const SKIN_FAVICON_WEB_PATH = (SKIN) =>{
    return SKIN["cdn_url"]+"/skins/favicon/";
}

export const TEMPLATE_WEBDIR = (SKIN) =>{

    var CURRENT_THEME = "";
        
    if (CURR_DEVICE == "DESKTOP") {
        CURRENT_THEME = "/templates/"+SKIN["theme"];
    } else {
        CURRENT_THEME = "/templates/"+SKIN["mobile_theme"];
    }

    return CURRENT_THEME;
}


export const convertObjectStringToNumbers = (array) =>{

    var objectArray = Object.entries(array);

    var arrUtilizzo = [];

    objectArray.forEach(([key, value]) => {

        if(value && value!= "" && value != ''){
            if(isNaN(value)){
                arrUtilizzo[key] = value;
            }else{
                var datoParziale1 = parseFloat(value);
                var datoParziale2 = datoParziale1.toFixed(2)
                arrUtilizzo[key] = parseFloat(datoParziale2);
            }
        }else{
            arrUtilizzo[key] = value;
        }
    });

    return arrUtilizzo;
}

export const convertToFormdata = (object) =>{

    var formData = new FormData();

    for (var key in object) {
        formData.append(key, object[key])
    }

    return formData
}

export const MINUTE_MS = 60000;

export const getRichiestaPrelievoClass = (stato) => {

    var result = "";

    switch (stato){
        case "0":
            result="pending-stats";
        break;
        case "2":
            result="rejected-stats";
        break;
        case "3":
            result="error-w";
        break;
        case "4":
            result="annulled-w";
        break;
        default:
            result="error"
        break;
    }

    return result;
}

export const getRichiestaPrelievoStato = (stato) =>{

    var result = "";

    switch (stato){
        case "0":
            result="sospeso";
        break;
        case "2":
            result="negata";
        break;
        case "3":
            result="errore";
        break;
        case "4":
            result="annullata";
        break;
        default:
            result="error"
        break;
    }
    return result;
}

export const differenceDate = (dateString1, dateString2) => {

    var date1 = new Date(dateString1);
    var date2 = new Date(dateString2);

    var age = date1.get - date2.getFullYear();
    var m = date1.getMonth() - date2.getMonth();
    var day = date1.getDay() - date2.getDay();

    var hour = date1.getHours() - date2.getHours();
    var minutes = date1.getMinutes() - date2.getMinutes();
    var getSeconds = date1.getSeconds() - date2.getSeconds();

    const difference = {"years":age, "months":m, "days":day, "hour":hour, "minutes":minutes, "seconds":getSeconds};

    return difference;
}

export const differenceHour = (dateString1, dateString2) => {

    var differenzaOre = (dateString1-dateString2)/60/60;

    return differenzaOre;
}

export const playlogiqTicketStatus = (id) =>{

    var statusAs = [];
    statusAs['N'] = 'coupon.status.1'; //"Ticket is running";
    statusAs[2] = 'coupon.status.2'; //"Ticket is in pending because of risk management and wait for confirmatin";
    statusAs[3] = 'coupon.status.3'; //"Ticket canceled by player";
    statusAs['C'] = 'coupon.status.4'; //"Ticket rejected by system";
    statusAs[5] = 'coupon.status.5'; //"Ticket waiting for counter offer";
    statusAs['V'] = 'coupon.status.6'; //"Ticket is void";
    statusAs['W'] = 'coupon.status.7'; //"Ticket is won";
    statusAs['L'] = 'coupon.status.8'; //"Ticket is lost";
    statusAs[11] = 'coupon.status.11'; //"Ticket is won and waiting for payment";
    statusAs[12] = 'coupon.status.12'; //"Open win ticket is played";
    statusAs[13] = 'coupon.status.13'; //"Ticket cashout";

    return statusAs[id];
}

export const openFullscreen = () => {

    document.body.requestFullscreen();
}

export const closeFullscreen = () => {

    window.document.exitFullscreen();
}

export const getNamesCategory = (name) =>{

    switch(name){

        case 'Popular games':
            return "giochipopolari"
        break;

        case 'New games':
            return "nuovigiochi"
        break;

        case 'Table games':
            return "giochitavolo"
        break;

        default :
            return "undefined"
        break;
    }
}

export const currentLanguage = () =>{
    const currlang = cookies.get("la");
    return  currlang;
}