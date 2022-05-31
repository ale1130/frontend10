import React, {useState} from "react";
import styled from 'styled-components';
import Modal from "react-modal";
import ModalBody from "react-bootstrap/ModalBody";
import ModalHeader from "react-bootstrap/ModalHeader";
import ModalFooter from "react-bootstrap/ModalFooter";
import ModalTitle from "react-bootstrap/ModalTitle";
import { Button } from "bootstrap";

Modal.setAppElement("#root");

/*const Container = styled.div`
    padding: 20px;
    background: var(--color5);
    border-radius: 10px;
    box-shadow: 0px 0px 8px 1px rgb(17 17 17);
    border: 1px solid rgb(51 51 51 / 50%);
`*/

function LoginModal(props) {

    const close = props.closeModal;

    return (
    <>
        {/*<Modal show={props.modalState} onHide={close} dialogClassName=''>

            <Modal.Header closeButton>

                <Modal.Title>Modal heading</Modal.Title>

            </Modal.Header>

            <Modal.Body>Woohoo, you're reading this text in a modal!</Modal.Body>

            <Modal.Footer>

                <button variant="secondary" onClick={close}>
                    Close
                </button>

                <button variant="primary" onClick={close}>
                    Save Changes
                </button>

            </Modal.Footer>

        </Modal>*/}

        <Modal isOpen={props.modalState} onRequestClose={close} className="mymodal" overlayClassName="myoverlay">
            
            

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
                    <img src="https://media.betzonelab.com/skins/logo/10.png" className="logoimglogin"/>
                    <br />Do not have an account?</p>
                <a href="javascript:void(0)" onClick={close} className="registration">Sign in</a>
                
            
        </Modal>

    </>
    );
}
  
export default LoginModal;