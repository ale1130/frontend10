import React from "react";
import Modal from "react-modal";

import { useTranslation } from "react-i18next";
import { CURR_DEVICE } from "../constants/global";

Modal.setAppElement("#root");

function ModalCoupon(props) {

  const { t, i18n } = useTranslation();

  const urlSee = props.urls.url;
  const urlPrint = props.urls.urlPrint;

  const close = props.closeModal;

  return (
    <>
      <Modal isOpen={props.modalState} onRequestClose={close} className="mymodal" overlayClassName="myoverlay">

        <div className="modal  fade" id="modalCoupon" data-id="" tabindex="-1" role="dialog" aria-labelledby="modalCouponLabel">
            <div className="modal-dialog">
                <div className="modal-content">
                
                    <div className="modal-header">
                    
                        <h4 className="modal-title" id="modalCouponLabel">Coupon<span id="couponid"></span></h4>
                        
                        <button type="button" className="close" data-dismiss="modal" aria-label="Close" onClick={close}>
                            <span className="fa fa-close"></span>
                        </button>
                    </div>


                    {CURR_DEVICE == "mobile" ? 

                        <>
                            <div className='modal-body'>
                                <iframe width='100%' height='100%' frameborder='0' allowtransparency='true' > </iframe>
                            </div>
                        </>
                    :
                        <>
                            <div className='modal-body'>
                                <iframe width='100%' height='100%' frameborder='0' allowtransparency='true' ></iframe>
                            </div>
                        </>
                    }

                    <div className="modal-footer">
                        <button type="button" className="btn btn-secondary" data-dismiss="modal" onClick={close}>chiudi</button>
                        
                        <a type="button" id="printCouponLink" className="btn btn-primary" href={urlPrint}>stampa</a>
                    </div>
                    
                </div>
            </div>
        </div>

      </Modal>
    </>
  );
}

export {ModalCoupon};