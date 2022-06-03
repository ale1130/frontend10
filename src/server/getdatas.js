import Axios from "axios";

function GetdataSkin(props){

    Axios.post('http://localhost:3001/getdataskin',{skinid : props.id}).then((response) => {
        return (response.data[0]);
    });
};

export default GetdataSkin;