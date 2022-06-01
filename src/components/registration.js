import React, { useState } from "react";
import Modal from "react-modal";

Modal.setAppElement("#root");

function RegistrationModal(props) {

    const close = props.closeModal;

    return (
        <>
            <Modal isOpen={true} onRequestClose={close} className="mymodal" overlayClassName="myoverlay">
                <button type="button" className="close new" data-dismiss="modal" aria-label="Close">
                    <span aria-hidden="true" onClick={close}>×</span>
                </button>

                <h3 className="title-modal-1">Log in</h3>

                <form action="/ajax/signin.php" id="signinForm" method="post" className="coolform">
                    <div className="row">
                        <div className="col-12">

                        </div>
                    </div>
                    <div className="form-group">
                        <input type="text" className="form-control form-control-a" id="username" name="username" placeholder="Username" />
                        <input type="password" className="form-control form-control-a" id="password" name="password" placeholder="Password" />
                        <button type="submit" className="login loginButton" onClick={close}>Log in</button>
                        <p ><a href="javascript:void(0)" onClick={close} className="labelforget">Did you forget your password?</a>
                        </p>
                    </div>
                </form>

                <p className="underbox">
                    <img src="https://media.betzonelab.com/skins/logo/10.png" className="logoimglogin" />
                    <br />Do not have an account?</p>
                <a href="javascript:void(0)" onClick={close} className="registration">Sign in</a>
            </Modal>
        </>
    );
}

export default RegistrationModal;