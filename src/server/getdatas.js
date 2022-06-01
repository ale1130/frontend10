import Axios from "axios";

function GetdataSkin(){
    Axios.post('http://localhost:3001/getdataskin').then((response) => {
        console.log(response.data);
    })
}

export default GetdataSkin;