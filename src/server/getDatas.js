
import axios from "axios";

const GetdataSkin = async (id,setDatiSkin2,setLoader2) =>{

    try{

        const data = await axios
        .post('http://localhost:3001/getdataskin',{skinid : id})
        .then(response => {
        
        setDatiSkin2(response.data[0]);
        }).then(function(){
        setLoader2(false);
        });
    }catch (e){

        console.log(e);
    }
};

export {GetdataSkin};