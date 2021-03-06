import React, { useRef, useState } from "react"

import Dropdown from 'react-bootstrap/Dropdown';

import TawkMessengerReact from '@tawk.to/tawk-messenger-react';

import { useTranslation } from "react-i18next";
import { LanguagesButton, SelectLanguagesFooter } from "./languagesselector";
import { ChatIcon, HomeIcon, PhoneIcon, StarIcon, WhatsAppIcon } from "./icons";

export function FooterBar(props) {

    const SKIN = props.skin;

    const [chat, setChat] = useState(false);

    const { t, i18n } = useTranslation();

    const openChat = () => {
        setChat(true);
    }

    const tawkMessengerRef = useRef();

    const handleMinimize = () => {
        tawkMessengerRef.current.minimize();
    };

    return (
        <>

            {chat ? <><TawkMessengerReact propertyId="62065c2fb9e4e21181be9eff" widgetId="1frkdg6qe" ref={tawkMessengerRef}/> <button onClick={()=>handleMinimize}>close chat</button></> : <></>}

            <div className="bottom-bar">
                <div className="row">
                    <div className="col-12 botton-bar-option">

                        <div className="b-footer-left">
                            <a className="b-b-footer" href="/">
                                {<HomeIcon />}
                            </a>

                            <a className="b-b-footer" href="/promotions/">
                                <StarIcon /> {t('promozioni')}
                            </a>
                        </div>

                        <div className="b-footer-left">

                            <a href="https://wa.me/message/U5NZBWTRYSVHF1" target="_blank">
                                <button className="b-b-footer svgwhatsapp" type="button" id="whatsappButton">
                                    <WhatsAppIcon />
                                </button>
                            </a>

                            <Dropdown>
                                <Dropdown.Toggle>
                                    <ChatIcon />
                                </Dropdown.Toggle>

                                <Dropdown.Menu>
                                    <div className="d-d-footer" aria-labelledby="dropdownMenuButton1" x-placement="top-start">
                                        <p><a onClick={() => openChat()}>Chat {t('dalvivo')}</a></p>
                                        <p><a href="mailto:info@gamesolutions.org">{t('invia')} Email</a></p>
                                        <p><a href="mailto:documents@gamesolutions.org">{t('invia')} {t('documenti')}</a></p>
                                    </div>
                                </Dropdown.Menu>
                            </Dropdown>

                            <Dropdown>
                                <Dropdown.Toggle>
                                    <LanguagesButton />
                                </Dropdown.Toggle>

                                <Dropdown.Menu>
                                    <SelectLanguagesFooter skin={SKIN} />
                                </Dropdown.Menu>
                            </Dropdown>

                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}