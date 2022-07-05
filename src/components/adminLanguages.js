import React, { useState } from "react"

import Card from 'react-bootstrap/Card';
import { useTranslation } from 'react-i18next';

import { ConvertObjectToArray, skinUrl } from "../constants/global";

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

export const LanguagesInglese = () =>{

    const lingua = ConvertObjectToArray(jsonfileen);

    const indici = lingua[0];
    const valori = lingua[1];

    var stringaFinale = "";

    {indici.map((traduzione,indice)=>{

        stringaFinale+= 'define("'+indici[indice]+'","'+valori[indice]+'");\n';
    })}

    return (
        <>
            <h2> File in Inglese</h2>

            <button onClick={() => {navigator.clipboard.writeText(stringaFinale)}}>Copia testo</button>
            
            <textarea>{stringaFinale}</textarea>
        </>
    );
}

export const LanguagesTedesco = () =>{
    const lingua = ConvertObjectToArray(jsonfilede);

    const indici = lingua[0];
    const valori = lingua[1];

    var stringaFinale = "";

    {indici.map((traduzione,indice)=>{

        stringaFinale+= 'define("'+indici[indice]+'","'+valori[indice]+'");\n';
    })}

    return (
        <>
            <h2> File in Tedesco</h2>

            <button onClick={() => {navigator.clipboard.writeText(stringaFinale)}}>Copia testo</button>
            
            <textarea>{stringaFinale}</textarea>
        </>
    );
}

export const LanguagesTurco = () =>{
    const lingua = ConvertObjectToArray(jsonfiletr);

    const indici = lingua[0];
    const valori = lingua[1];

    var stringaFinale = "";

    {indici.map((traduzione,indice)=>{

        stringaFinale+= 'define("'+indici[indice]+'","'+valori[indice]+'");\n';
    })}

    return (
        <>
            <h2> File in Turco</h2>

            <button onClick={() => {navigator.clipboard.writeText(stringaFinale)}}>Copia testo</button>
            
            <textarea>{stringaFinale}</textarea>
        </>
    );
}

export const LanguagesArabo = () =>{
    const lingua = ConvertObjectToArray(jsonfilear);

    const indici = lingua[0];
    const valori = lingua[1];

    var stringaFinale = "";

    {indici.map((traduzione,indice)=>{

        stringaFinale+= 'define("'+indici[indice]+'","'+valori[indice]+'");\n';
    })}

    return (
        <>
            <h2> File in Arabo</h2>

            <button onClick={() => {navigator.clipboard.writeText(stringaFinale)}}>Copia testo</button>
            
            <textarea>{stringaFinale}</textarea>
        </>
    );
}

export const LanguagesRumeno = () =>{
    const lingua = ConvertObjectToArray(jsonfilero);

    const indici = lingua[0];
    const valori = lingua[1];

    var stringaFinale = "";

    {indici.map((traduzione,indice)=>{

        stringaFinale+= 'define("'+indici[indice]+'","'+valori[indice]+'");\n';
    })}

    return (
        <>
            <h2> File in Rumeno</h2>

            <button onClick={() => {navigator.clipboard.writeText(stringaFinale)}}>Copia testo</button>
            
            <textarea>{stringaFinale}</textarea>
        </>
    );
}

export const LanguagesCinese = () =>{
    const lingua = ConvertObjectToArray(jsonfilezh);

    const indici = lingua[0];
    const valori = lingua[1];

    var stringaFinale = "";

    {indici.map((traduzione,indice)=>{

        stringaFinale+= 'define("'+indici[indice]+'","'+valori[indice]+'");\n';
    })}

    return (
        <>
            <h2> File in Cinese</h2>

            <button onClick={() => {navigator.clipboard.writeText(stringaFinale)}}>Copia testo</button>
            
            <textarea>{stringaFinale}</textarea>
        </>
    );
}

export const LanguagesSpagnolo = () =>{
    const lingua = ConvertObjectToArray(jsonfilees);

    const indici = lingua[0];
    const valori = lingua[1];

    var stringaFinale = "";

    {indici.map((traduzione,indice)=>{

        stringaFinale+= 'define("'+indici[indice]+'","'+valori[indice]+'");\n';
    })}

    return (
        <>
            <h2> File in Spagnolo</h2>

            <button onClick={() => {navigator.clipboard.writeText(stringaFinale)}}>Copia testo</button>
            
            <textarea>{stringaFinale}</textarea>
        </>
    );
}

export const LanguagesFrancese = () =>{
    const lingua = ConvertObjectToArray(jsonfilefr);

    const indici = lingua[0];
    const valori = lingua[1];

    var stringaFinale = "";

    {indici.map((traduzione,indice)=>{

        stringaFinale+= 'define("'+indici[indice]+'","'+valori[indice]+'");\n';
    })}

    return (
        <>
            <h2> File in Francese</h2>

            <button onClick={() => {navigator.clipboard.writeText(stringaFinale)}}>Copia testo</button>
            
            <textarea>{stringaFinale}</textarea>
        </>
    );
}

export const LanguagesPortoghese = () =>{
    const lingua = ConvertObjectToArray(jsonfilept);

    const indici = lingua[0];
    const valori = lingua[1];

    var stringaFinale = "";

    {indici.map((traduzione,indice)=>{

        stringaFinale+= 'define("'+indici[indice]+'","'+valori[indice]+'");\n';
    })}

    return (
        <>
            <h2> File in Portoghese</h2>

            <button onClick={() => {navigator.clipboard.writeText(stringaFinale)}}>Copia testo</button>
            
            <textarea>{stringaFinale}</textarea>
        </>
    );
}

export const LanguagesBrasiliano = () =>{
    const lingua = ConvertObjectToArray(jsonfileptbr);

    const indici = lingua[0];
    const valori = lingua[1];

    var stringaFinale = "";

    {indici.map((traduzione,indice)=>{

        stringaFinale+= 'define("'+indici[indice]+'","'+valori[indice]+'");\n';
    })}

    return (
        <>
            <h2> File in Brasiliano</h2>

            <button onClick={() => {navigator.clipboard.writeText(stringaFinale)}}>Copia testo</button>
            
            <textarea>{stringaFinale}</textarea>
        </>
    );
}

export const LanguagesUngherese = () =>{
    const lingua = ConvertObjectToArray(jsonfilehu);

    const indici = lingua[0];
    const valori = lingua[1];

    var stringaFinale = "";

    {indici.map((traduzione,indice)=>{

        stringaFinale+= 'define("'+indici[indice]+'","'+valori[indice]+'");\n';
    })}

    return (
        <>
            <h2> File in Ungherese</h2>

            <button onClick={() => {navigator.clipboard.writeText(stringaFinale)}}>Copia testo</button>
            
            <textarea>{stringaFinale}</textarea>
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

    const linguaIT = ConvertObjectToArray(jsonfileit);

    const indici = linguaIT[0];
    const valori = linguaIT[1];

    var stringaFinale = "";

    {indici.map((traduzione,indice)=>{

        stringaFinale+= 'define("'+indici[indice]+'","'+valori[indice]+'");\n';
    })}

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

            <button onClick={() => {navigator.clipboard.writeText(stringaFinale)}}>Copia testo</button>
            
            <textarea>{stringaFinale}</textarea>
        </>
    );
}