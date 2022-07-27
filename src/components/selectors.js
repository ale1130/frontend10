import React, { useState } from "react";


import '../styles/headerv1.css';

import { useTranslation } from 'react-i18next';

import DatePicker from "react-datepicker";

import "react-datepicker/dist/react-datepicker.css";

function SelectPeriod (props){

    const { t, i18n } = useTranslation();

    const [startDate, setStartDate] = useState(new Date());
    const [endDate, setEndDate] = useState(new Date());

    const start = "start";
    const end = "end";

    return(
        <>
            <div className="input-group ">
                <div className="input-group-prepend">
                    <span className="input-group-text" id="basic-addon1">{t('da')}</span>
                </div>

                <DatePicker selected={startDate} onSelect={(data) => setStartDate(data)} onChange={event => props.onchange(event,startDate,start)} dateFormat="dd/MM/yyyy"/>

                <div className="input-group-prepend">
                    <span className="input-group-text" id="basic-addon1">{t('a')}</span>
                </div>

                <DatePicker selected={endDate} onSelect={(data) => setEndDate(data)} onChange={event => props.onchange(event,endDate,end)} dateFormat="dd/MM/yyyy"/>
            </div>
        </>
    );
}

export const SelectCatMex = (props) =>{

    const { t, i18n } = useTranslation();

    return(
        <select id={props.name} name={props.name} className="form-control"  value={props.value || ""} onChange={props.onchange()}>
            <option value="">{"--"+t('seleziona')+"--"}</option>
            <option value="info">{t('info')}</option>
            <option value="promo">{t('promo')}</option>
            <option value="bonus">{t('bonus')}</option>
        </select>
    )
}

export const SelectMexStato = (props) =>{

    const { t, i18n } = useTranslation();

    return(
        <select id={props.name} name={props.name} className="form-control"  value={props.value || ""} onChange={props.onchange()}>
            <option value="">{"--"+t('seleziona')+"--"}</option>
            <option value="1">{t('visualizzato')}</option>
            <option value="3">{t('nonvisualizzato')}</option>
        </select>
    )
}

export const SelectPage = (props) =>{

    const { t, i18n } = useTranslation();
    const pageNumbers = props.pages;

    var options = [];

    for(let i=1; i<=pageNumbers; i++){
        options.push(<option key={i} value={i}>{i}</option>); 
    }

    return(
        <>
            <select id="page" name="page" className="form-control"  value={props.value || ""} onChange={props.onchange()}>
                {options}
            </select>
        </>
    )
}

export {SelectPeriod};

