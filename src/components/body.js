import React, {Component} from "react";

class BodyContent extends Component{
    render(){
        return(
            <div className="container-fluid body-content slider-height">

                <div className="row">
                    <div id="slideshow" className="carousel slide slider-home" data-ride="carousel">

                        <ul className="carousel-indicators">
                            <li data-target="#slideshow" data-slide-to="0" className=""></li>
                            <li data-target="#slideshow" data-slide-to="1" className=""></li>
                            <li data-target="#slideshow" data-slide-to="2" className=""></li>
                            <li data-target="#slideshow" data-slide-to="3" className="active"></li>
                            <li data-target="#slideshow" data-slide-to="4" className=""></li>
                            <li data-target="#slideshow" data-slide-to="5" className=""></li>
                        </ul>
                        <div className="carousel-inner">
                            <div className="carousel-item block">
                                <img src="https://media.betzonelab.com/slideshow/img1_6239edd791841.jpeg" alt="" />

                                    <div className="carousel-caption d-md-block  slide-adv">
                                        <div className="content-adv">
                                            <div className="button-adv">
                                                <a href="javascript:void(0)" onClick="openSignIn()"
                                                   className="botton-adv-1">Log in</a>
                                            </div>
                                        </div>
                                    </div>
                            </div>
                            <div className="carousel-item block">
                                <img src="https://media.betzonelab.com/slideshow/img2_6239ffec6c6ba.jpeg" alt="" />

                                    <div className="carousel-caption d-md-block  slide-adv">
                                        <div className="content-adv">
                                            <div className="button-adv">
                                                <a href="javascript:void(0)" onClick="openSignIn()"
                                                   className="botton-adv-1">Log in</a>
                                            </div>
                                        </div>
                                    </div>
                            </div>
                            <div className="carousel-item block">
                                <img src="https://media.betzonelab.com/slideshow/img3_623a02ea891fd.jpeg" alt="" />

                                    <div className="carousel-caption d-md-block  slide-adv">
                                        <div className="content-adv">
                                            <div className="button-adv">
                                                <a href="javascript:void(0)" onClick="openSignIn()"
                                                   className="botton-adv-1">Log in</a>
                                            </div>
                                        </div>
                                    </div>
                            </div>
                            <div className="carousel-item block active">
                                <img src="https://media.betzonelab.com/slideshow/img4_623aa7e6a51a7.jpeg" alt="" />

                                    <div className="carousel-caption d-md-block  slide-adv">
                                        <div className="content-adv">
                                            <div className="button-adv">
                                                <a href="javascript:void(0)" onClick="openSignIn()"
                                                   className="botton-adv-1">Log in</a>
                                            </div>
                                        </div>
                                    </div>
                            </div>
                            <div className="carousel-item block">
                                <img src="https://media.betzonelab.com/slideshow/img5_623c441b1bec9.jpeg" alt="" />

                                    <div className="carousel-caption d-md-block  slide-adv">
                                        <div className="content-adv">
                                            <div className="button-adv">
                                                <a href="javascript:void(0)" onClick="openSignIn()"
                                                   className="botton-adv-1">Log in</a>
                                            </div>
                                        </div>
                                    </div>
                            </div>
                            <div className="carousel-item block">
                                <img src="https://media.betzonelab.com/slideshow/img6_623c487160578.jpeg" alt="" />

                                    <div className="carousel-caption d-md-block  slide-adv">
                                        <div className="content-adv">
                                            <div className="button-adv">
                                                <a href="javascript:void(0)" onClick="openSignIn()"
                                                   className="botton-adv-1">Log in</a>
                                            </div>
                                        </div>
                                    </div>
                            </div>
                        </div>

                        <a className="carousel-control-prev" href="#slideshow" data-slide="prev">
                            <span className="carousel-control-prev-icon"></span>
                        </a>
                        <a className="carousel-control-next" href="#slideshow" data-slide="next">
                            <span className="carousel-control-next-icon"></span>
                        </a>
                    </div>
                </div>

            </div>
        );
    }
}

export default BodyContent;