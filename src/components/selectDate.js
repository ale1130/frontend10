import React, {useState} from "react";
import DatePicker from "react-datepicker";

import "react-datepicker/dist/react-datepicker.css";

function SelectDate (props) {

    const [startDate, setStartDate] = useState(new Date());

    return(
        <>
            <DatePicker selected={startDate} onSelect={(data) => setStartDate(data)} onChange={props.onchange(startDate)} dateFormat="dd/MM/yyyy"/>
        </>
    );
    
}

export default SelectDate;