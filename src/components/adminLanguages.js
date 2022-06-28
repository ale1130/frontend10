import React, { useState } from "react"

import Card from 'react-bootstrap/Card';
import { useTranslation } from 'react-i18next';

import { ConvertObjectToArray } from "../constants/global";

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
    const [linguaIT, setLinguaIT] = useState(ConvertObjectToArray(jsonfileit));
    console.log(linguaIT)
    return(
        linguaIT.map(traduzione =>(
            <Card style={{ width: '18rem' }}>
                <Card.Body>
                    {traduzione}
                </Card.Body>
            </Card>
        ))
    );
}

export const LanguagesTedesco = () =>{
    return(console.log(jsonfileit));
}

export const LanguagesTurco = () =>{
    return(console.log(jsonfileit));
}

export const LanguagesArabo = () =>{
    return(console.log(jsonfileit));
}

export const LanguagesRumeno = () =>{
    return(console.log(jsonfileit));
}

export const LanguagesCinese = () =>{
    return(console.log(jsonfileit));
}

export const LanguagesSpagnolo = () =>{
    return(console.log(jsonfileit));
}

export const LanguagesFrancese = () =>{
    return(console.log(jsonfileit));
}

export const LanguagesPortoghese = () =>{
    return(console.log(jsonfileit));
}

export const LanguagesBrasiliano = () =>{
    return(console.log(jsonfileit));
}

export const LanguagesUngherese = () =>{
    return(console.log(jsonfileit));
}

export const AdminLanguages = () =>{

    const { t, i18n } = useTranslation();

    const state = {
        languages:[
            {id:1, sigla:"en", nome:t('languages.inglese'), link:'/languages/inglese', immagine:"https://betplay360.com/static-media/flags/United-States.png"},
            {id:2, sigla:"de", nome:t('languages.tedesco'), link:'/languages/tedesco', immagine:"https://betplay360.com/static-media/flags/Germany.png"},
            {id:3, sigla:"tr", nome:t('languages.turco'), link:'/languages/turco', immagine:"https://betplay360.com/static-media/flags/Turkey.png"},
            {id:4, sigla:"ar", nome:t('languages.arabo'), link:'/languages/arabo', immagine:"https://betplay360.com/static-media/flags/United-Arab-Emirates.png"},
            {id:5, sigla:"ro", nome:t('languages.rumeno'), link:'/languages/rumeno', immagine:"https://betplay360.com/static-media/flags/Romania.png"},
            {id:6, sigla:"zh", nome:t('languages.cinese'), link:'/languages/cinese', immagine:"https://betplay360.com/static-media/flags/China.png"},
            {id:7, sigla:"es", nome:t('languages.spagnolo'), link:'/languages/spagnolo', immagine:"https://betplay360.com/static-media/flags/Spain.png"},
            {id:8, sigla:"fr", nome:t('languages.francese'), link:'/languages/francese', immagine:"https://betplay360.com/static-media/flags/France.png"},
            {id:9, sigla:"pt", nome:t('languages.portoghese'), link:'/languages/portoghese', immagine:"https://betplay360.com/static-media/flags/Portugal.png"},
            {id:10, sigla:"pt-br", nome:t('languages.portoghesebrasiliano'), link:'/languages/brasiliano', immagine:"https://betplay360.com/static-media/flags/Brasil.png"},
            {id:11, sigla:"hu", nome:t('languages.ungherese'), link:'/languages/ungherese', immagine:"https://betplay360.com/static-media/flags/Hungary.png"}
        ],
    };

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
        </>
    );
}