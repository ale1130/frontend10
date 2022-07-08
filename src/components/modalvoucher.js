import React from "react";
import Modal from "react-modal";

import { useTranslation } from "react-i18next";
import { convertDate } from "../constants/global";

Modal.setAppElement("#root");

function ModalVoucher(props) {

  const { t, i18n } = useTranslation();

  const close = props.closeModal;

  const voucherinfo = props.voucher;

  const info_skin = props.skin;

  return (
    <>
      <Modal isOpen={props.modalState} onRequestClose={close} className="mymodal" overlayClassName="myoverlay">
        <div>
            <div>
                <img src={'https://media.gamesolutions.org/skins/logo/' + info_skin["logo_black"]} /><br />
                <p><strong>{info_skin["name"]}</strong></p>
            </div>
            
            <div>
            
                <div>
                
                    <div>
                        <p>Data:</p>
                    </div>
                    
                    <div>
                        <p><strong>{convertDate(voucherinfo.addedTime)}</strong></p>
                    </div>
                </div>
                
            </div>
        </div>

        <div>
            <div >
                <p>Valore:</p>
            </div>
            <div >
                <p><strong>{voucherinfo.amount}<span>{info_skin["currency"]}</span></strong></p>
            </div>
        </div>

        <div>
        
            <p>Codice:</p>

            <p><strong>{voucherinfo.voucher_code}</strong></p>
        
        </div>

        <div> 
        
            <p><strong>QR Code:</strong></p>

            <div></div>

            <div> 
                <p>Zona:</p>
                <p>{info_skin["timezone"]}</p>
            </div>

            <div> 
                <p>{info_skin["meta_title"]}</p>
            </div>

            <div> 
                <p>{info_skin["footer_text"]}</p>
            </div>

            <div> 
                <p>Info:</p>
                <p>{info_skin["info_email"]}</p>
            </div>

            <div> 
                <p>Documenti:</p>
                <p>{info_skin["documents_email"]}</p>
            </div> 
        </div>
      </Modal>
    </>
  );
}

export {ModalVoucher};