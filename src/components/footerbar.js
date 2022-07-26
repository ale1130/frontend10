import { useEffect, useState } from "react"

import Dropdown from 'react-bootstrap/Dropdown';

import TawkTo from "tawkto-react";

import { useTranslation } from "react-i18next";

export const FooterBar = () => {

    const [chat, setChat] = useState(false);

    const { t, i18n } = useTranslation();

    const openChat = () => {
        setChat(true);
    }

    useEffect(() => {

        if (chat) {
            var tawk = new TawkTo('62065c2fb9e4e21181be9eff', '1frkdg6qe')

            tawk.onStatusChange((status) => {
                console.log(status)
            })
        }
    }, [chat])

    return (
        <div className="bottom-bar">
            <div className="row">
                <div className="col-12 botton-bar-option">

                    <div className="b-footer-left">
                        <a className="b-b-footer" href="/">
                            Home
                        </a>

                        <a className="b-b-footer" href="/promotions/">
                            {t('promozioni')}
                        </a>
                    </div>

                    <div className="b-footer-left">

                        <a href="https://wa.me/message/U5NZBWTRYSVHF1" target="_blank">
                            <button className="b-b-footer" type="button" id="whatsappButton">
                                WhatsApp
                            </button>
                        </a>

                        <div className="dropdown show">

                            <button className="b-b-footer" type="button" id="dropdownMenuButton1" data-toggle="dropdown" aria-expanded="true">
                                dropdown
                            </button>

                            <Dropdown>
                                <Dropdown.Toggle variant="success" id="dropdown-basic">

                                </Dropdown.Toggle>

                                <Dropdown.Menu>

                                </Dropdown.Menu>
                            </Dropdown>

                            <div className="dropdown-menu d-d-footer show" aria-labelledby="dropdownMenuButton1" x-placement="top-start">

                                <p><a onClick={() => openChat()}>Chat {t('dalvivo')}</a></p>
                                <p><a href="mailto:info@gamesolutions.org">{t('invia')} Email</a></p>
                                <p><a href="mailto:documents@gamesolutions.org">{t('invia')} {t('documenti')}</a></p>

                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}