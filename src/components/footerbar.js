export const FooterBar = () =>{
    return(
        <div className="bottom-bar">
            <div className="row">
                <div className="col-12 botton-bar-option">
                
                    <div className="b-footer-left">
                        <a className="b-b-footer" href="/">
                            Home
                        </a>
                        
                        <a className="b-b-footer" href="/promotions/">
                            Promozioni                
                        </a>
                    </div>

                    <div className="b-footer-left">
                    
                        <a href="https://wa.me/message/U5NZBWTRYSVHF1" target="_blank">
                            <button className="b-b-footer" type="button" id="whatsappButton">
                                whatsapp
                            </button>
                        </a>
                        
                        <div className="dropdown show">

                            <button className="b-b-footer" type="button" id="dropdownMenuButton1" data-toggle="dropdown" aria-expanded="true">
                                dropdown
                            </button>
                            
                            <div className="dropdown-menu d-d-footer show" aria-labelledby="dropdownMenuButton1" x-placement="top-start">
                            
                                <p><a onclick="openChat()">Chat Live</a></p>
                                <p><a href="mailto:info@gamesolutions.org">Invia email</a></p>
                                <p><a href="mailto:documents@gamesolutions.org">Invia documenti</a></p>
                                
                            </div>
                        </div>                                 
                    </div>
                </div>
            </div>
        </div>
    )
}