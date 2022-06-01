import React, {Component} from "react";

class Footer extends Component{
    render(){
        return(
            <>
            <footer id="footer">

                <div className="container-fluid">

                    <div className="row">

                        <div className="col-md-12">
                            <div className="box-link-footer">
                                <ul>
                  
                                    <li><a href="">Contacts</a></li>
                
                                <li>   <a href="">Become an Affiliate</a></li>

           
                                    {this.props.footerlinks}

                                </ul>
                            </div>
                        </div>
                    </div>

                </div>
                <div className="container-fluid">


                    <div className="row">

                        <div className="col-lg-12 col-md-12">

                            {this.props.logo}
                            <img src="https://media.betzonelab.com/skins/logo/10.png?v=704" className="logo-footer" />


                        </div>

                        <div className="col-lg-12 col-md-12 align-self-center">

                            <div className="row section-footer-play">
                            <div className="col-lg-1 col-md-2 col-3">
                                <img src="https://media.betzonelab.com/providers/img/150.png" className="icon-play provider-x" />
                            </div>
                            <div className="col-lg-1 col-md-2 col-3">
                                <img src="https://media.betzonelab.com/providers/img/150.png" className="icon-play provider-y" />
                            </div>

                                {this.props.imagesfooter}

                            </div>

                        </div>

                    </div>


                </div>

                <div className="container">


                    <div className="row">

                        <div className="col-lg-12 col-md-12 align-self-center">

                            <div className="copyright">
                                
                                RABIT CASINO - SPORT  CASINO        
                                {this.props.footername}
                            </div>

                        </div>
                    </div>
                </div>
            </footer>
            <div className="footer-bottom-bar">
            <div className="container">
                <div className="row">
                <div className="col-lg-4">
                    <img src="https://rabitcasino.com/templates/acqua/assets/img/icon-browser.png" className="multiplatform" />
                </div>
        
                <div className="col-lg-4" >
                    <p className="loghi-pag">                                                          
                        <img src="https://media.gamesolutions.org/pay_methods/1.png?v=10030" />
                        <img src="https://media.gamesolutions.org/pay_methods/1.png?v=10030" />                                                        
                    </p>    
                </div>
                    
                    <div className="col-lg-4">
                        <div className="gioco-18">
                        +18 Play Responsibly
                        </div>
                    </div>     
                </div>
            </div>
        </div>
        </>
        );
    }
}

export default Footer;