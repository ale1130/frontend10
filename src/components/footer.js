import React, {Component} from "react";

class Footer extends Component{
    render(){
        return(
            <footer id="footer">

                <div className="container-fluid">

                    <div className="row">

                        <div className="col-md-12">
                            <div className="box-link-footer">
                                <ul>

                                    {this.props.footerlinks}

                                </ul>
                            </div>
                        </div>
                    </div>

                </div>
                <div className="container-fluid">


                    <div className="row column-reverse-mobile">

                        <div className="col-lg-12 col-md-12 align-self-center">

                            {this.props.logo}<br />
                            <img src="https://media.betzonelab.com/skins/logo/10.png?v=704" />


                        </div>

                        <div className="col-lg-12 col-md-12 align-self-center">

                            <div className="row section-footer-play">

                                {this.props.imagesfooter}

                            </div>

                        </div>

                    </div>


                </div>

                <div className="container">


                    <div className="row">

                        <div className="col-lg-12 col-md-12 align-self-center">

                            <div className="copyright">
                                {this.props.footername}
                            </div>

                        </div>
                    </div>
                </div>
            </footer>
        );
    }
}

export default Footer;