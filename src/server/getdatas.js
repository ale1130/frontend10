import Axios from "axios";

async function GetdataSkin (id){

    Axios.post('http://localhost:3001/getdataskin',{skinid : id}).then(response => {
        //return response.data[0];
        const datiRicevuti = await response.data[0];
        return "ciao";
    });
};

export default GetdataSkin;