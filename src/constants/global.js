export const PLAYER_LEVEL = 30;
export const SHOP_LEVEL = 20;

export const ConvertObjectToArray = (object) =>{

    var objectArray = Object.entries(object);

    var arrUtilizzo = [];

    objectArray.forEach(([key, value]) => {

      arrUtilizzo[key] = value;
    });

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

export const calcolaCodiceFiscale = () => {/*

    var firstname = $('#firstname').val();
    if($.trim(firstname) == ''){
        alert("Inserisci il nome");
        $('#firstname').focus();
        return false;
    }

    var lastname = $('#lastname').val();

    if($.trim(lastname) == ''){
        alert("Inserisci il cognome");
        $('#lastname').focus();
        return false;
    }

    var cliente_provincia = $('#cliente_provincia option:selected').val();

    if($.trim(cliente_provincia) == ''){
        alert("Seleziona la provincia di nascita");
        $('#cliente_provincia').focus();
        return false;
    }

    var cliente_citta = $('#cliente_citta option:selected').val();
    if($.trim(cliente_citta) == ''){
        alert("Seleziona la citta' di nascita");
        $('#cliente_citta').focus();
        return false;
    }

    var birthday_giorno = $('#birthday_giorno option:selected').val();

    if($.trim(birthday_giorno) == ''){
        alert("Inserisci il giorno di nascita.");
        $('#birthday_giorno').focus();
        return false;
    }


    var birthday_mese = $('#birthday_mese option:selected').val();
    if($.trim(birthday_mese) == ''){
        alert("Inserisci il mese di nascita");
        $('#birthday_mese').focus();
        return false;
    }


    var birthday_anno = $('#birthday_anno option:selected').val();
    if($.trim(birthday_anno) == ''){
        alert("Inserisci l\'anno di nascita'");
        $('#birthday_anno').focus();
        return false;
    }

    var sesso = $('#sesso option:selected').val();
    if($.trim(sesso) == ''){
        alert("Seleziona il sesso");
        return false;
    }

    $.get("/ajax/codiceFiscale.php?nome=" +firstname+ "&cognome=" +lastname+ "&comune=" +cliente_citta+ "&dataNascita=" +birthday_giorno+ "&meseNascita=" +birthday_mese+ "&annoNascita=" +birthday_anno+ "&sesso=" +sesso+ "",  {},
        function(data){
            // $('#cf').val(data);

            if(data.stato == "ok"){


                $("#fiscal_code").val(data.codiceFiscale);

            } else {

                alert("C'e' stato un errore al calcolo del codice fiscale... inseriscilo manualmente");

            }

        }, "json");
*/
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
    if(arraySettings.indexOf(setting)>0){
        return true;
    }else{
        return false;
    }
}