import React, {useState, useEffect} from "react";
import Modal from "react-modal";
import axios from "axios";

Modal.setAppElement("#root");

function LoginModal(props) {

    const close = props.closeModal;

    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

    const skin_id = props.skin;

    const ConvertObjectToArray = (object) =>{

        var objectArray = Object.entries(object);
    
        var arrUtilizzo = [];
    
        objectArray.forEach(([key, value]) => {
    
          arrUtilizzo[key] = value;
        });
    
        return arrUtilizzo;
    }
        
    const GetDataUser = async () => {

        try{

            const data = await axios
            .post('http://localhost:3001/getuserdata',{ username : username, password : password, skin : skin_id })
            .then(response => {

                if(!response.data.message){

                    props.setUserC(ConvertObjectToArray(response.data[0]));
                    props.setLogin(true);
                    localStorage.setItem('username', response.data[0].username);
                    localStorage.setItem('passhash', response.data[0].passhash);
                }else{
        
                    localStorage.clear();
                    props.setLogin(false);
                }
            })
        }catch (e){

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

                    <div className="row">
                        <div className="col-12">

                        </div>
                    </div>

                    <div className="form-group">

                        <input type="text" className="form-control form-control-a" id="username" name="username" placeholder="Username" value={username} onChange={({ target }) => setUsername(target.value)}/>
                        <input type="password" className="form-control form-control-a" id="password" name="password" placeholder="Password" value={password} onChange={({ target }) => setPassword(target.value)}/>

                        <button onClick={() => {GetDataUser(); close();}} className="login loginButton">Log in</button>

                        <p className="text-center"><a href="#" onClick={close} className="labelforget rec-pass">Did you forget your password?</a>

                        </p>
                    </div>

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