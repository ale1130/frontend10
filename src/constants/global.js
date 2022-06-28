import { isMobile, browserName } from "react-device-detect";

import axios from "axios";

import Cookies from 'universal-cookie';

const cookies = new Cookies();

export const PLAYER_LEVEL = 30;
export const SHOP_LEVEL = 20;

export const CURR_DEVICE = isMobile ? "MOBILE" : "DESKTOP";

export const ConvertObjectToArray = (object) =>{

    var objectArray = Object.entries(object);

    var arrUtilizzo = [];

    objectArray.forEach(([key, value]) => {

      arrUtilizzo[key] = value;
    });

    return arrUtilizzo;
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

export const ckeckSkinSett = (arraySettings, setting) =>{

    if(arraySettings.includes(setting)){
        return true;
    }else{
        return false;
    }
}

export const GetLanguages = async () =>{

    const stringa = "SELECT * FROM languages ORDER BY id";

    try{

      const data = await axios
      .post('http://localhost:3001/getlanguages',{query : stringa})
      .then(response => {
        
        return response.data;
      })
    }catch (e){

        console.log(e);
    }
};

export const PROVIDERS_LOGO_WEB_PATH = (SKIN) =>{
    return SKIN["cdn_url"]+"/providers/img/";
}

export const MEDIA_PROMO_WEB_PATH = (SKIN) =>{
    return SKIN["cdn_url"]+"/promotions/";
}

export const convertObjectStringToNumbers = (array) =>{

    var objectArray = Object.entries(array);

    var arrUtilizzo = [];

    objectArray.forEach(([key, value]) => {

        if(value && value!= "" && value != ''){
            if(isNaN(value)){
                arrUtilizzo[key] = value;
            }else{
                arrUtilizzo[key] = parseFloat(value);
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