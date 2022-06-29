import React, {useState} from "react";
import Modal from "react-modal";

import { useTranslation } from "react-i18next";

import ErrorBox from '../components/errorBox.js';

import {api, convertObjectStringToNumbers, skinUrl} from '../constants/global';

import Cookies from 'universal-cookie';

Modal.setAppElement("#root");

function LoginModal(props) {

    const cookies = new Cookies();

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
            errorMsg [0] = t('errorilogin.tuttidati');
        }
        
        if(errorMsg.length>0){
            error(errorMsg);
        }else{
            GetDataUser();
        }
    }
        
    const GetDataUser = async () => {

        try{

            const data = await api
            .get('rest/login/:'+inputs.username+"/:"+inputs.password+"/")
            .then(response => {

                if(response.data.status=="ok"){

                    if(response.data.dati["blocked"]==1){
                    
                        var errorMsg = [];
                
                        errorMsg [0] = t('errorilogin.bloccato');
    
                        error(errorMsg);
    
                    }else{

                        props.setUserC(convertObjectStringToNumbers(response.data.dati));
                        props.setLogin(true);

                        cookies.set('gio_uid', response.data.dati.id, { path: '/' });
                        cookies.set('gio_pass', response.data.dati.passhash, { path: '/' });
                        
                        close();
                    }

                }else if(response.data.status=="nouser"){

                    var errorMsg = [];
            
                    errorMsg [0] = t('errorilogin.credenziali');

                    error(errorMsg);
                }else{
                    var errorMsg = [];
            
                    errorMsg [0] = t('erroregenerico');

                    error(errorMsg);
                }
            })
        }catch (e){

           alert(t('erroregenerico'));
            console.log(e);
        }
    };

    return (
        <>
            <Modal isOpen={props.modalState} onRequestClose={close} className="mymodal" overlayClassName="myoverlay">

                <button type="button" className="close new" data-dismiss="modal" aria-label="Close">
                    <span aria-hidden="true" onClick={close}>×</span>
                </button>

                <h3 className="title-modal-1">{t('accedi')}</h3>

                <form id="signinForm" onSubmit={handleSubmit} className="coolform">

                    {modalError ? <ErrorBox message={errorMessage}/> : ""}

                    <div className="row">
                        <div className="col-12">

                        </div>
                    </div>

                    <div className="form-group">

                        <input type="text" className="form-control form-control-a" id="username" name="username" placeholder={t('nutente')} value={inputs.username || ""} onChange={handleChange}/>
                        <input type="password" className="form-control form-control-a" id="password" name="password" placeholder={t('password')} value={inputs.password || ""} onChange={handleChange}/>

                        <input type="submit" className="login loginButton" value={t('accedi')} />

                        <p className="text-center"><a href="#" onClick={close} className="labelforget rec-pass">{t('dimenticatop')}</a>

                        </p>
                    </div>

                </form>

                <p className="underbox">

                    <img src="https://media.betzonelab.com/skins/logo/10.png" className="logoimglogin" />
                    <br />{t('noaccount')}
                </p>

                <a href="#" onClick={()=> {props.openModalReg(); close();}} className="registration">{t('registrati')}</a>
            </Modal>
        </>
    );
}

export default LoginModal;