import Modal from "react-modal";
import 'bootstrap/dist/css/bootstrap.min.css';

import React, { useState } from "react"

import { closeFullscreen, openFullscreen } from "../constants/global";
import '../styles/iziModal.css';

Modal.setAppElement("#root");

export const CasinoFrame = (props) => {

    const statoModal = props.statoGame;

    const game = props.game;

    const close = props.close;

    const [currentView, setCurrentView] = useState('screen');

    return (
        <>

            {statoModal

                ?

                <Modal isOpen={true} onRequestClose={close} className={currentView == "screen" ? "schermo-normale" : "schermo-intero"} overlayClassName="myoverlay" backdrop="static">
                    <div style={{ width: "100%", height: "100vh" }} id="modal-iframe" aria-labelledby="modal-iframe" role="dialog" className="iziModal hasScroll hasShadow isAttached">

                        <div className="iziModal-header iziModal-noSubtitle">

                            <i className="iziModal-header-icon icon-settings_system_daydream"></i>

                            <h2 className="iziModal-header-title"><span id="iziTitle"><strong></strong>{game.provider_name} - {game.game_name}</span></h2>

                            <p className="iziModal-header-subtitle"></p>

                            <div className="iziModal-header-buttons">

                                <a href="#" className="iziModal-button iziModal-button-close" data-izimodal-close="" onClick={close}>X</a>
                                <a href="#" className="iziModal-button iziModal-button-fullscreen" data-izimodal-fullscreen="" onClick={() => openFullscreen()}>A</a>
                                <a href="#" className="iziModal-button" id="togglePageFullscreen" onClick={() => closeFullscreen()}>B</a>
                            </div>
                        </div>

                        <div className="iziModal-wrap">
                            <div className="iziModal-content">
                                <iframe className="iziModal-iframe" src={game.url} style={{ width: "100%", height: "100vh" }}>
                                </iframe>
                            </div>
                        </div>
                    </div>
                </Modal>

                :

                <></>
            }
        </>
    )
}