import axios from "axios";

const GetdataSkin = async (id, setDatiSkin, setValoreControllo) =>{

    try{

        const data = await axios
        .post('http://localhost:3001/getdataskin',{skinid : id})
        .then(response => {
            setDatiSkin({datiskin : response.data[0]});

            setValoreControllo(0);

            return response;
        });
    }catch (e){

        console.log(e);
    }
    
};

export default GetdataSkin;