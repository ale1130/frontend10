import Axios from "axios";

async function GetdataSkin (id){

    Axios.post('http://localhost:3001/getdataskin',{skinid : id}).then(response => {

        return "ciao";
    });
};

export default GetdataSkin;