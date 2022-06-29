import React from "react";
import Modal from "react-modal";

import { useTranslation } from "react-i18next";

Modal.setAppElement("#root");

function ModalMessage(props) {

  const { t, i18n } = useTranslation();

  const close = props.closeModal;

  const messageinfo = props.message;

  return (
    <>
      <Modal isOpen={props.modalState} onRequestClose={close} className="mymodal" overlayClassName="myoverlay">

        <div className='modal-body' id="modalContent">

          <small style={{color:"white"}}> Inviato da: {messageinfo.submit_fromV} <strong id="submitFrom"></strong></small>

          <hr />
            
          <h2 style={{color:"white"}}>Oggetto: {messageinfo.objectV}<br /><strong id="object"></strong></h2>

          {messageinfo.bonus_value ? 

          <div id="contenitoreBonus">

            <h2 style={{color:"white"}}>Valore bonus<br />

            <strong id="bonus_value"></strong></h2>

          </div>
          
          :
          <></>}

          <small style={{color:"white"}}>Testo messaggio:</small><br />
          <strong id="text" name="text" style={{color:"white"}}>{messageinfo.textV}</strong>
          <hr />
          
          {messageinfo.allegatoV ?

          <div id="contenitoreAllegato">
            <img id="allegato" src={messageinfo.allegatoV}/>
            <a id="downloadImg" href={messageinfo.allegatoV} download target="_blank">
              DOWNLOAD Immagine
            </a>
          </div>
          
          :
          <></>}

        </div>

        <button type="button" className="login button-account-m-p" data-dismiss="modal" onClick={close}>Chiudi</button>

      </Modal>
    </>
  );
}

export {ModalMessage};