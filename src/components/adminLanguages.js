import React, { useEffect, useState } from "react"

import Card from 'react-bootstrap/Card';
import { useTranslation } from 'react-i18next';

import { api, ConvertObjectToArray, skinUrl } from "../constants/global";

import jsonfilear from '../public/locales/ar/translation.json';
import jsonfilede from '../public/locales/de/translation.json';
import jsonfileen from '../public/locales/en/translation.json';
import jsonfilees from '../public/locales/es/translation.json';
import jsonfilefr from '../public/locales/fr/translation.json';
import jsonfilehu from '../public/locales/hu/translation.json';
import jsonfileit from '../public/locales/it/translation.json';
import jsonfilept from '../public/locales/pt/translation.json';
import jsonfileptbr from '../public/locales/pt-br/translation.json';
import jsonfilero from '../public/locales/ro/translation.json';
import jsonfiletr from '../public/locales/tr/translation.json';
import jsonfilezh from '../public/locales/zh/translation.json';

export const traduzioni = (jsonfile) =>{

    const lingua = ConvertObjectToArray(jsonfile);

    const indici = lingua[0];
    const valori = lingua[1];

    if(indici.length>0){

        var stringaFinale1 = "";

        {indici.map((traduzione,indice)=>{

            stringaFinale1 += '"'+indici[indice]+'":"'+valori[indice]+'",\n';
        })}

        var stringaFinale = stringaFinale1.slice(0,-2);

    }else{

        var stringaFinale="Nessuna traduzione";
    }

    return stringaFinale;
}

export const LanguagesInglese = () =>{

    var stringaFinaleIT = traduzioni(jsonfileit);

    var stringaFinale = traduzioni(jsonfileen);

    const [traduzione, setTraduzione] = useState({});

    const [traduzioneVisual, setTraduzioneVisual] = useState([]);

    const Traduci = async (parola,a,indice) =>{

        parola = parola.replace("?","qmark");
        parola = parola.replace(/%/g, "subperc");

        const data = await api
        .get('/rest/translate/:'+parola+"/:it/:"+a+"/")
        .then(response => {
    
            if(response.data.status=="ok"){
    
                setTraduzione(inputs => ({...inputs, [indice] : response.data.traduzione }));
            }
        })
    }

    const stringaTraduzione = (jsonFile, lingua) =>{

        const linguaEntrata = ConvertObjectToArray(jsonfileit);
    
        const indiciEntrata = linguaEntrata[0];
        const valoriEntrata = linguaEntrata[1];
    
        const lunghezzaEntrata = indiciEntrata.length;
    
        const linguaUscita = ConvertObjectToArray(jsonFile);
    
        const indiciUscita = linguaUscita[0];
    
        const lunghezzaUscita = indiciUscita.length;
    
        const differenza = lunghezzaEntrata-lunghezzaUscita;
    
        var i = lunghezzaUscita;
    
        if(differenza>0){
    
            for(i; i<lunghezzaEntrata; i++){
    
                Traduci(valoriEntrata[i],lingua,indiciEntrata[i]);
            }
        }
    }

    useEffect(() => {

        if(traduzione){

            setTraduzioneVisual(traduzioni(traduzione))
        }
    },[traduzione]);

    return (
        <>
            <h2> File in Inglese</h2>

            <textarea className="textareaElement" value={stringaFinale}></textarea>

            <button onClick={() => {navigator.clipboard.writeText(stringaFinale)}}>Copia testo</button>

            <button onClick={() => setTraduzione(stringaTraduzione(jsonfileen,'en'))}>Traduci da italiano</button>

            <h2> Nuovi elementi tradotti</h2>

            <textarea className="textareaElement" value={traduzioneVisual}></textarea>

            <button onClick={() => {navigator.clipboard.writeText(traduzioneVisual)}}>Copia elementi</button>

            <h2> File in Italiano</h2>

            <textarea className="textareaElement" value={stringaFinaleIT}></textarea>
        </>
    );
}

export const LanguagesTedesco = () =>{
    
    var stringaFinaleIT = traduzioni(jsonfileit);

    var stringaFinale = traduzioni(jsonfilede);

    const [traduzione, setTraduzione] = useState({});

    const [traduzioneVisual, setTraduzioneVisual] = useState([]);

    const Traduci = async (parola,a,indice) =>{

        parola = parola.replace("?","qmark");
        parola = parola.replace(/%/g, "subperc");

        const data = await api
        .get('/rest/translate/:'+parola+"/:it/:"+a+"/")
        .then(response => {
    
            if(response.data.status=="ok"){
    
                setTraduzione(inputs => ({...inputs, [indice] : response.data.traduzione }));
            }
        })
    }

    const stringaTraduzione = (jsonFile, lingua) =>{

        const linguaEntrata = ConvertObjectToArray(jsonfileit);
    
        const indiciEntrata = linguaEntrata[0];
        const valoriEntrata = linguaEntrata[1];
    
        const lunghezzaEntrata = indiciEntrata.length;
    
        const linguaUscita = ConvertObjectToArray(jsonFile);
    
        const indiciUscita = linguaUscita[0];
    
        const lunghezzaUscita = indiciUscita.length;
    
        const differenza = lunghezzaEntrata-lunghezzaUscita;
    
        var i = lunghezzaUscita;
    
        if(differenza>0){
    
            for(i; i<lunghezzaEntrata; i++){
    
                Traduci(valoriEntrata[i],lingua,indiciEntrata[i]);
            }
        }
    }

    useEffect(() => {

        if(traduzione){

            setTraduzioneVisual(traduzioni(traduzione))
        }
    },[traduzione]);

    return (
        <>
            <h2> File in Tedesco</h2>

            <textarea className="textareaElement" value={stringaFinale}></textarea>

            <button onClick={() => {navigator.clipboard.writeText(stringaFinale)}}>Copia testo</button>

            <button onClick={() => setTraduzione(stringaTraduzione(jsonfilede,'de'))}>Traduci da italiano</button>

            <h2> Nuovi elementi tradotti</h2>

            <textarea className="textareaElement" value={traduzioneVisual}></textarea>

            <button onClick={() => {navigator.clipboard.writeText(traduzioneVisual)}}>Copia elementi</button>

            <h2> File in Italiano</h2>

            <textarea className="textareaElement" value={stringaFinaleIT}></textarea>
        </>
    );
}

export const LanguagesTurco = () =>{
    
    var stringaFinaleIT = traduzioni(jsonfileit);

    var stringaFinale = traduzioni(jsonfiletr);

    const [traduzione, setTraduzione] = useState({});

    const [traduzioneVisual, setTraduzioneVisual] = useState([]);

    const Traduci = async (parola,a,indice) =>{

        parola = parola.replace("?","qmark");
        parola = parola.replace(/%/g, "subperc");

        const data = await api
        .get('/rest/translate/:'+parola+"/:it/:"+a+"/")
        .then(response => {
    
            if(response.data.status=="ok"){
    
                setTraduzione(inputs => ({...inputs, [indice] : response.data.traduzione }));
            }
        })
    }

    const stringaTraduzione = (jsonFile, lingua) =>{

        const linguaEntrata = ConvertObjectToArray(jsonfileit);
    
        const indiciEntrata = linguaEntrata[0];
        const valoriEntrata = linguaEntrata[1];
    
        const lunghezzaEntrata = indiciEntrata.length;
    
        const linguaUscita = ConvertObjectToArray(jsonFile);
    
        const indiciUscita = linguaUscita[0];
    
        const lunghezzaUscita = indiciUscita.length;
    
        const differenza = lunghezzaEntrata-lunghezzaUscita;
    
        var i = lunghezzaUscita;
    
        if(differenza>0){
    
            for(i; i<lunghezzaEntrata; i++){
    
                Traduci(valoriEntrata[i],lingua,indiciEntrata[i]);
            }
        }
    }

    useEffect(() => {

        if(traduzione){

            setTraduzioneVisual(traduzioni(traduzione))
        }
    },[traduzione]);

    return (
        <>
            <h2> File in turco</h2>

            <textarea className="textareaElement" value={stringaFinale}></textarea>

            <button onClick={() => {navigator.clipboard.writeText(stringaFinale)}}>Copia testo</button>

            <button onClick={() => setTraduzione(stringaTraduzione(jsonfiletr,'tr'))}>Traduci da italiano</button>

            <h2> Nuovi elementi tradotti</h2>

            <textarea className="textareaElement" value={traduzioneVisual}></textarea>

            <button onClick={() => {navigator.clipboard.writeText(traduzioneVisual)}}>Copia elementi</button>

            <h2> File in Italiano</h2>

            <textarea className="textareaElement" value={stringaFinaleIT}></textarea>
        </>
    );
}

export const LanguagesArabo = () =>{
    
    var stringaFinaleIT = traduzioni(jsonfileit);

    var stringaFinale = traduzioni(jsonfilear);

    const [traduzione, setTraduzione] = useState({});

    const [traduzioneVisual, setTraduzioneVisual] = useState([]);

    const Traduci = async (parola,a,indice) =>{

        parola = parola.replace("?","qmark");
        parola = parola.replace(/%/g, "subperc");

        const data = await api
        .get('/rest/translate/:'+parola+"/:it/:"+a+"/")
        .then(response => {
    
            if(response.data.status=="ok"){
    
                setTraduzione(inputs => ({...inputs, [indice] : response.data.traduzione }));
            }
        })
    }

    const stringaTraduzione = (jsonFile, lingua) =>{

        const linguaEntrata = ConvertObjectToArray(jsonfileit);
    
        const indiciEntrata = linguaEntrata[0];
        const valoriEntrata = linguaEntrata[1];
    
        const lunghezzaEntrata = indiciEntrata.length;
    
        const linguaUscita = ConvertObjectToArray(jsonFile);
    
        const indiciUscita = linguaUscita[0];
    
        const lunghezzaUscita = indiciUscita.length;
    
        const differenza = lunghezzaEntrata-lunghezzaUscita;
    
        var i = lunghezzaUscita;
    
        if(differenza>0){
    
            for(i; i<lunghezzaEntrata; i++){
    
                Traduci(valoriEntrata[i],lingua,indiciEntrata[i]);
            }
        }
    }

    useEffect(() => {

        if(traduzione){

            setTraduzioneVisual(traduzioni(traduzione))
        }
    },[traduzione]);

    return (
        <>
            <h2> File in arabo</h2>

            <textarea className="textareaElement" value={stringaFinale}></textarea>

            <button onClick={() => {navigator.clipboard.writeText(stringaFinale)}}>Copia testo</button>

            <button onClick={() => setTraduzione(stringaTraduzione(jsonfilear,'ar'))}>Traduci da italiano</button>

            <h2> Nuovi elementi tradotti</h2>

            <textarea className="textareaElement" value={traduzioneVisual}></textarea>

            <button onClick={() => {navigator.clipboard.writeText(traduzioneVisual)}}>Copia elementi</button>

            <h2> File in Italiano</h2>

            <textarea className="textareaElement" value={stringaFinaleIT}></textarea>
        </>
    );
}

export const LanguagesRumeno = () =>{
    
    var stringaFinaleIT = traduzioni(jsonfileit);

    var stringaFinale = traduzioni(jsonfilero);

    const [traduzione, setTraduzione] = useState({});

    const [traduzioneVisual, setTraduzioneVisual] = useState([]);

    const Traduci = async (parola,a,indice) =>{

        parola = parola.replace("?","qmark");
        parola = parola.replace(/%/g, "subperc");

        const data = await api
        .get('/rest/translate/:'+parola+"/:it/:"+a+"/")
        .then(response => {
    
            if(response.data.status=="ok"){
    
                setTraduzione(inputs => ({...inputs, [indice] : response.data.traduzione }));
            }
        })
    }

    const stringaTraduzione = (jsonFile, lingua) =>{

        const linguaEntrata = ConvertObjectToArray(jsonfileit);
    
        const indiciEntrata = linguaEntrata[0];
        const valoriEntrata = linguaEntrata[1];
    
        const lunghezzaEntrata = indiciEntrata.length;
    
        const linguaUscita = ConvertObjectToArray(jsonFile);
    
        const indiciUscita = linguaUscita[0];
    
        const lunghezzaUscita = indiciUscita.length;
    
        const differenza = lunghezzaEntrata-lunghezzaUscita;
    
        var i = lunghezzaUscita;
    
        if(differenza>0){
    
            for(i; i<lunghezzaEntrata; i++){
    
                Traduci(valoriEntrata[i],lingua,indiciEntrata[i]);
            }
        }
    }

    useEffect(() => {

        if(traduzione){

            setTraduzioneVisual(traduzioni(traduzione))
        }
    },[traduzione]);

    return (
        <>
            <h2> File in rumeno</h2>

            <textarea className="textareaElement" value={stringaFinale}></textarea>

            <button onClick={() => {navigator.clipboard.writeText(stringaFinale)}}>Copia testo</button>

            <button onClick={() => setTraduzione(stringaTraduzione(jsonfilero,'ro'))}>Traduci da italiano</button>

            <h2> Nuovi elementi tradotti</h2>

            <textarea className="textareaElement" value={traduzioneVisual}></textarea>

            <button onClick={() => {navigator.clipboard.writeText(traduzioneVisual)}}>Copia elementi</button>

            <h2> File in Italiano</h2>

            <textarea className="textareaElement" value={stringaFinaleIT}></textarea>
        </>
    );
}

export const LanguagesCinese = () =>{
    
    var stringaFinaleIT = traduzioni(jsonfileit);

    var stringaFinale = traduzioni(jsonfilezh);

    const [traduzione, setTraduzione] = useState({});

    const [traduzioneVisual, setTraduzioneVisual] = useState([]);

    const Traduci = async (parola,a,indice) =>{

        parola = parola.replace("?","qmark");
        parola = parola.replace(/%/g, "subperc");

        const data = await api
        .get('/rest/translate/:'+parola+"/:it/:"+a+"/")
        .then(response => {
    
            if(response.data.status=="ok"){
    
                setTraduzione(inputs => ({...inputs, [indice] : response.data.traduzione }));
            }
        })
    }

    const stringaTraduzione = (jsonFile, lingua) =>{

        const linguaEntrata = ConvertObjectToArray(jsonfileit);
    
        const indiciEntrata = linguaEntrata[0];
        const valoriEntrata = linguaEntrata[1];
    
        const lunghezzaEntrata = indiciEntrata.length;
    
        const linguaUscita = ConvertObjectToArray(jsonFile);
    
        const indiciUscita = linguaUscita[0];
    
        const lunghezzaUscita = indiciUscita.length;
    
        const differenza = lunghezzaEntrata-lunghezzaUscita;
    
        var i = lunghezzaUscita;
    
        if(differenza>0){
    
            for(i; i<lunghezzaEntrata; i++){
    
                Traduci(valoriEntrata[i],lingua,indiciEntrata[i]);
            }
        }
    }

    useEffect(() => {

        if(traduzione){

            setTraduzioneVisual(traduzioni(traduzione))
        }
    },[traduzione]);

    return (
        <>
            <h2> File in cinese</h2>

            <textarea className="textareaElement" value={stringaFinale}></textarea>

            <button onClick={() => {navigator.clipboard.writeText(stringaFinale)}}>Copia testo</button>

            <button onClick={() => setTraduzione(stringaTraduzione(jsonfilezh,'zh'))}>Traduci da italiano</button>

            <h2> Nuovi elementi tradotti</h2>

            <textarea className="textareaElement" value={traduzioneVisual}></textarea>

            <button onClick={() => {navigator.clipboard.writeText(traduzioneVisual)}}>Copia elementi</button>

            <h2> File in Italiano</h2>

            <textarea className="textareaElement" value={stringaFinaleIT}></textarea>
        </>
    );
}

export const LanguagesSpagnolo = () =>{
    
    var stringaFinaleIT = traduzioni(jsonfileit);

    var stringaFinale = traduzioni(jsonfilees);

    const [traduzione, setTraduzione] = useState({});

    const [traduzioneVisual, setTraduzioneVisual] = useState([]);

    const Traduci = async (parola,a,indice) =>{

        parola = parola.replace("?","qmark");
        parola = parola.replace(/%/g, "subperc");

        const data = await api
        .get('/rest/translate/:'+parola+"/:it/:"+a+"/")
        .then(response => {
    
            if(response.data.status=="ok"){
    
                setTraduzione(inputs => ({...inputs, [indice] : response.data.traduzione }));
            }
        })
    }

    const stringaTraduzione = (jsonFile, lingua) =>{

        const linguaEntrata = ConvertObjectToArray(jsonfileit);
    
        const indiciEntrata = linguaEntrata[0];
        const valoriEntrata = linguaEntrata[1];
    
        const lunghezzaEntrata = indiciEntrata.length;
    
        const linguaUscita = ConvertObjectToArray(jsonFile);
    
        const indiciUscita = linguaUscita[0];
    
        const lunghezzaUscita = indiciUscita.length;
    
        const differenza = lunghezzaEntrata-lunghezzaUscita;
    
        var i = lunghezzaUscita;
    
        if(differenza>0){
    
            for(i; i<lunghezzaEntrata; i++){
    
                Traduci(valoriEntrata[i],lingua,indiciEntrata[i]);
            }
        }
    }

    useEffect(() => {

        if(traduzione){

            setTraduzioneVisual(traduzioni(traduzione))
        }
    },[traduzione]);

    return (
        <>
            <h2> File in spagnolo</h2>

            <textarea className="textareaElement" value={stringaFinale}></textarea>

            <button onClick={() => {navigator.clipboard.writeText(stringaFinale)}}>Copia testo</button>

            <button onClick={() => setTraduzione(stringaTraduzione(jsonfilees,'es'))}>Traduci da italiano</button>

            <h2> Nuovi elementi tradotti</h2>

            <textarea className="textareaElement" value={traduzioneVisual}></textarea>

            <button onClick={() => {navigator.clipboard.writeText(traduzioneVisual)}}>Copia elementi</button>

            <h2> File in Italiano</h2>

            <textarea className="textareaElement" value={stringaFinaleIT}></textarea>
        </>
    );
}

export const LanguagesFrancese = () =>{
    
    var stringaFinaleIT = traduzioni(jsonfileit);

    var stringaFinale = traduzioni(jsonfilefr);

    const [traduzione, setTraduzione] = useState({});

    const [traduzioneVisual, setTraduzioneVisual] = useState([]);

    const Traduci = async (parola,a,indice) =>{

        parola = parola.replace("?","qmark");
        parola = parola.replace(/%/g, "subperc");

        const data = await api
        .get('/rest/translate/:'+parola+"/:it/:"+a+"/")
        .then(response => {
    
            if(response.data.status=="ok"){
    
                setTraduzione(inputs => ({...inputs, [indice] : response.data.traduzione }));
            }
        })
    }

    const stringaTraduzione = (jsonFile, lingua) =>{

        const linguaEntrata = ConvertObjectToArray(jsonfileit);
    
        const indiciEntrata = linguaEntrata[0];
        const valoriEntrata = linguaEntrata[1];
    
        const lunghezzaEntrata = indiciEntrata.length;
    
        const linguaUscita = ConvertObjectToArray(jsonFile);
    
        const indiciUscita = linguaUscita[0];
    
        const lunghezzaUscita = indiciUscita.length;
    
        const differenza = lunghezzaEntrata-lunghezzaUscita;
    
        var i = lunghezzaUscita;
    
        if(differenza>0){
    
            for(i; i<lunghezzaEntrata; i++){
    
                Traduci(valoriEntrata[i],lingua,indiciEntrata[i]);
            }
        }
    }

    useEffect(() => {

        if(traduzione){

            setTraduzioneVisual(traduzioni(traduzione))
        }
    },[traduzione]);

    return (
        <>
            <h2> File in francese</h2>

            <textarea className="textareaElement" value={stringaFinale}></textarea>

            <button onClick={() => {navigator.clipboard.writeText(stringaFinale)}}>Copia testo</button>

            <button onClick={() => setTraduzione(stringaTraduzione(jsonfilefr,'fr'))}>Traduci da italiano</button>

            <h2> Nuovi elementi tradotti</h2>

            <textarea className="textareaElement" value={traduzioneVisual}></textarea>

            <button onClick={() => {navigator.clipboard.writeText(traduzioneVisual)}}>Copia elementi</button>

            <h2> File in Italiano</h2>

            <textarea className="textareaElement" value={stringaFinaleIT}></textarea>
        </>
    );
}

export const LanguagesPortoghese = () =>{
    
    var stringaFinaleIT = traduzioni(jsonfileit);

    var stringaFinale = traduzioni(jsonfilept);

    const [traduzione, setTraduzione] = useState({});

    const [traduzioneVisual, setTraduzioneVisual] = useState([]);

    const Traduci = async (parola,a,indice) =>{

        parola = parola.replace("?","qmark");
        parola = parola.replace(/%/g, "subperc");

        const data = await api
        .get('/rest/translate/:'+parola+"/:it/:"+a+"/")
        .then(response => {
    
            if(response.data.status=="ok"){
    
                setTraduzione(inputs => ({...inputs, [indice] : response.data.traduzione }));
            }
        })
    }

    const stringaTraduzione = (jsonFile, lingua) =>{

        const linguaEntrata = ConvertObjectToArray(jsonfileit);
    
        const indiciEntrata = linguaEntrata[0];
        const valoriEntrata = linguaEntrata[1];
    
        const lunghezzaEntrata = indiciEntrata.length;
    
        const linguaUscita = ConvertObjectToArray(jsonFile);
    
        const indiciUscita = linguaUscita[0];
    
        const lunghezzaUscita = indiciUscita.length;
    
        const differenza = lunghezzaEntrata-lunghezzaUscita;
    
        var i = lunghezzaUscita;
    
        if(differenza>0){
    
            for(i; i<lunghezzaEntrata; i++){
    
                Traduci(valoriEntrata[i],lingua,indiciEntrata[i]);
            }
        }
    }

    useEffect(() => {

        if(traduzione){

            setTraduzioneVisual(traduzioni(traduzione))
        }
    },[traduzione]);

    return (
        <>
            <h2> File in portoghese</h2>

            <textarea className="textareaElement" value={stringaFinale}></textarea>

            <button onClick={() => {navigator.clipboard.writeText(stringaFinale)}}>Copia testo</button>

            <button onClick={() => setTraduzione(stringaTraduzione(jsonfilept,'pt'))}>Traduci da italiano</button>

            <h2> Nuovi elementi tradotti</h2>

            <textarea className="textareaElement" value={traduzioneVisual}></textarea>

            <button onClick={() => {navigator.clipboard.writeText(traduzioneVisual)}}>Copia elementi</button>

            <h2> File in Italiano</h2>

            <textarea className="textareaElement" value={stringaFinaleIT}></textarea>
        </>
    );
}

export const LanguagesBrasiliano = () =>{
    
    var stringaFinaleIT = traduzioni(jsonfileit);

    var stringaFinale = traduzioni(jsonfileptbr);

    const [traduzione, setTraduzione] = useState({});

    const [traduzioneVisual, setTraduzioneVisual] = useState([]);

    const Traduci = async (parola,a,indice) =>{

        parola = parola.replace("?","qmark");
        parola = parola.replace(/%/g, "subperc");

        const data = await api
        .get('/rest/translate/:'+parola+"/:it/:"+a+"/")
        .then(response => {
    
            if(response.data.status=="ok"){
    
                setTraduzione(inputs => ({...inputs, [indice] : response.data.traduzione }));
            }
        })
    }

    const stringaTraduzione = (jsonFile, lingua) =>{

        const linguaEntrata = ConvertObjectToArray(jsonfileit);
    
        const indiciEntrata = linguaEntrata[0];
        const valoriEntrata = linguaEntrata[1];
    
        const lunghezzaEntrata = indiciEntrata.length;
    
        const linguaUscita = ConvertObjectToArray(jsonFile);
    
        const indiciUscita = linguaUscita[0];
    
        const lunghezzaUscita = indiciUscita.length;
    
        const differenza = lunghezzaEntrata-lunghezzaUscita;
    
        var i = lunghezzaUscita;
    
        if(differenza>0){
    
            for(i; i<lunghezzaEntrata; i++){
    
                Traduci(valoriEntrata[i],lingua,indiciEntrata[i]);
            }
        }
    }

    useEffect(() => {

        if(traduzione){

            setTraduzioneVisual(traduzioni(traduzione))
        }
    },[traduzione]);

    return (
        <>
            <h2> File in brasiliano</h2>

            <textarea className="textareaElement" value={stringaFinale}></textarea>

            <button onClick={() => {navigator.clipboard.writeText(stringaFinale)}}>Copia testo</button>

            <button onClick={() => setTraduzione(stringaTraduzione(jsonfileptbr,'pt-br'))}>Traduci da italiano</button>

            <h2> Nuovi elementi tradotti</h2>

            <textarea className="textareaElement" value={traduzioneVisual}></textarea>

            <button onClick={() => {navigator.clipboard.writeText(traduzioneVisual)}}>Copia elementi</button>

            <h2> File in Italiano</h2>

            <textarea className="textareaElement" value={stringaFinaleIT}></textarea>
        </>
    );
}

export const LanguagesUngherese = () =>{

    var stringaFinaleIT = traduzioni(jsonfileit);

    var stringaFinale = traduzioni(jsonfilehu);

    const [traduzione, setTraduzione] = useState({});

    const [traduzioneVisual, setTraduzioneVisual] = useState([]);

    const Traduci = async (parola,a,indice) =>{

        parola = parola.replace("?","qmark");
        parola = parola.replace(/%/g, "subperc");

        const data = await api
        .get('/rest/translate/:'+parola+"/:it/:"+a+"/")
        .then(response => {
    
            if(response.data.status=="ok"){
    
                setTraduzione(inputs => ({...inputs, [indice] : response.data.traduzione }));
            }
        })
    }

    const stringaTraduzione = (jsonFile, lingua) =>{

        const linguaEntrata = ConvertObjectToArray(jsonfileit);
    
        const indiciEntrata = linguaEntrata[0];
        const valoriEntrata = linguaEntrata[1];
    
        const lunghezzaEntrata = indiciEntrata.length;
    
        const linguaUscita = ConvertObjectToArray(jsonFile);
    
        const indiciUscita = linguaUscita[0];
    
        const lunghezzaUscita = indiciUscita.length;
    
        const differenza = lunghezzaEntrata-lunghezzaUscita;
    
        var i = lunghezzaUscita;
    
        if(differenza>0){
    
            for(i; i<lunghezzaEntrata; i++){
    
                Traduci(valoriEntrata[i],lingua,indiciEntrata[i]);
            }
        }
    }

    useEffect(() => {

        if(traduzione){

            setTraduzioneVisual(traduzioni(traduzione))
        }
    },[traduzione]);

    return (
        <>
            <h2> File in ungherese</h2>

            <textarea className="textareaElement" value={stringaFinale}></textarea>

            <button onClick={() => {navigator.clipboard.writeText(stringaFinale)}}>Copia testo</button>

            <button onClick={() => setTraduzione(stringaTraduzione(jsonfilehu,'hu'))}>Traduci da italiano</button>

            <h2> Nuovi elementi tradotti</h2>

            <textarea className="textareaElement" value={traduzioneVisual}></textarea>

            <button onClick={() => {navigator.clipboard.writeText(traduzioneVisual)}}>Copia elementi</button>

            <h2> File in Italiano</h2>

            <textarea className="textareaElement" value={stringaFinaleIT}></textarea>
        </>
    );
}

export const AdminLanguages = () =>{

    const { t, i18n } = useTranslation();

    const state = {
        languages:[
            {id:1, sigla:"en", nome:t('inglese'), link:'/languages/inglese', immagine:skinUrl+"/static-media/flags/United-States.png"},
            {id:2, sigla:"de", nome:t('tedesco'), link:'/languages/tedesco', immagine:skinUrl+"/static-media/flags/Germany.png"},
            {id:3, sigla:"tr", nome:t('turco'), link:'/languages/turco', immagine:skinUrl+"/static-media/flags/Turkey.png"},
            {id:4, sigla:"ar", nome:t('arabo'), link:'/languages/arabo', immagine:skinUrl+"/static-media/flags/United-Arab-Emirates.png"},
            {id:5, sigla:"ro", nome:t('rumeno'), link:'/languages/rumeno', immagine:skinUrl+"/static-media/flags/Romania.png"},
            {id:6, sigla:"zh", nome:t('cinese'), link:'/languages/cinese', immagine:skinUrl+"/static-media/flags/China.png"},
            {id:7, sigla:"es", nome:t('spagnolo'), link:'/languages/spagnolo', immagine:skinUrl+"/static-media/flags/Spain.png"},
            {id:8, sigla:"fr", nome:t('francese'), link:'/languages/francese', immagine:skinUrl+"/static-media/flags/France.png"},
            {id:9, sigla:"pt", nome:t('portoghese'), link:'/languages/portoghese', immagine:skinUrl+"/static-media/flags/Portugal.png"},
            {id:10, sigla:"pt-br", nome:t('portoghesebrasiliano'), link:'/languages/brasiliano', immagine:skinUrl+"/static-media/flags/Brasil.png"},
            {id:11, sigla:"hu", nome:t('ungherese'), link:'/languages/ungherese', immagine:skinUrl+"/static-media/flags/Hungary.png"}
        ],
    };

    var stringaFinaleIT = traduzioni(jsonfileit);

    return (
        <>
            <div className="lingua"> 
                {state.languages.map(lingua => (
                    
                    <Card key={lingua.id} style={{ width: '18rem' }}>
                        <Card.Img src={lingua.immagine} />
                        <Card.Body>
                            <Card.Title>{lingua.nome}</Card.Title>
                            <a href={lingua.link} style={{color:"white"}}><button className="sback">Translate</button></a>
                        </Card.Body>
                    </Card>
                
                ))}
            </div>

            <h2> File in italiano </h2>

            <button onClick={() => {navigator.clipboard.writeText(stringaFinaleIT)}}>Copia testo</button>
            
            <textarea>{stringaFinaleIT}</textarea>
        </>
    );
}