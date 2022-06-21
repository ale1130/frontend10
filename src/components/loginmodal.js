import React, {useState, useEffect} from "react";
import Modal from "react-modal";
import axios from "axios";

import { useTranslation } from "react-i18next";

import ErrorBox from '../components/errorBox.js'

import {ConvertObjectToArray} from '../constants/global'

Modal.setAppElement("#root");

function LoginModal(props) {

    const { t, i18n } = useTranslation();

    const close = props.closeModal;

    const [inputs, setInputs] = useState({});

    const [modalError, setModalError] = useState(false);
    const [errorMessage, setErrorMessage] = useState([]);

    const skin_id = props.skin;

    const handleChange = (event) => {
      const name = event.target.name;
      const value = event.target.value;
      setInputs(values => ({...values,[name]: value}))
    }

    const error = (errors) =>{
        
        setErrorMessage(errors);
        setModalError(true);
    }

    const handleSubmit = (event) => {

        var errorMsg = [];

        event.preventDefault();

        if(!inputs.password || !inputs.username){
            errorMsg [0] = "Immettere tutti i dati";
        }
        
        if(errorMsg.length>0){
            error(errorMsg);
        }else{
            GetDataUser();
        }
    }
        
    const GetDataUser = async () => {

        try{

            const data = await axios
            .post('http://localhost:3001/getuserdata',{ username : inputs.username, password : inputs.password, skin : skin_id })
            .then(response => {

                if(!response.data.message){

                    props.setUserC(ConvertObjectToArray(response.data[0]));
                    props.setLogin(true);
                    localStorage.setItem('username', response.data[0].username);
                    localStorage.setItem('passhash', response.data[0].passhash);

                    close();
                }else{
                    
                    var errorMsg = [];
            
                    errorMsg [0] = response.data.message;

                    error(errorMsg);
                }
            })
        }catch (e){

           alert("Errore tecnico, contattare l'assistenza");
            console.log(e);
        }
    };

    return (
        <>
            <Modal isOpen={props.modalState} onRequestClose={close} className="mymodal" overlayClassName="myoverlay">

                <button type="button" className="close new" data-dismiss="modal" aria-label="Close">
                    <span aria-hidden="true" onClick={close}>×</span>
                </button>

                <h3 className="title-modal-1">Log in</h3>

                <form id="signinForm" onSubmit={handleSubmit} className="coolform">

                    {modalError ? <ErrorBox message={errorMessage}/> : ""}

                    <div className="row">
                        <div className="col-12">

                        </div>
                    </div>

                    <div className="form-group">

                        <input type="text" className="form-control form-control-a" id="username" name="username" placeholder="Username" value={inputs.username || ""} onChange={handleChange}/>
                        <input type="password" className="form-control form-control-a" id="password" name="password" placeholder="Password" value={inputs.password || ""} onChange={handleChange}/>

                        <input type="submit" className="login loginButton" value={"Log in"} />

                        <p className="text-center"><a href="#" onClick={close} className="labelforget rec-pass">Did you forget your password?</a>

                        </p>
                    </div>

                </form>

                <p className="underbox">

                    <img src="https://media.betzonelab.com/skins/logo/10.png" className="logoimglogin" />
                    <br />Do not have an account?
                </p>

                <a href="#" onClick={()=> {props.openModalReg(); close();}} className="registration">Sign in</a>
            </Modal>
        </>
    );
}

export default LoginModal;