import { isMobile, browserName } from "react-device-detect";

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

export const skinId = (new URL(window.location.href)).searchParams.get('id');

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
        localStorage.clear();
        window.location.href = '/?id=3';
    }
};

export const ConvertObjectToArraySettings = (object) =>{

    var arrUtilizzo = [];

    object.map(setting =>
        {arrUtilizzo[setting.setting]=1;}
    )

    return arrUtilizzo;
}

export const ckeckSkinSett = (arraySettings, setting) =>{

    if(arraySettings[setting] !== undefined){
        return true;
    }else{
        return false;
    }
}