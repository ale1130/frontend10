import React, { Component } from "react";

import '../styles/headerv1.css';

class Navbar extends Component {
    render() {
        return (
            <>
                <header className="header-top">
                    <div className="container-fluid d-flex justify-content-between align-items-center">
                        <div className="navigation-bar">
                            <a href="" className="menu-mobile-pul hide-desktop" data-toggle="modal" data-target="#ModalMenu"><i className="fa fa-bars"></i></a>
                            <h1 className="logo">
                                <a href="">
                                    {this.props.logo}
                                    <img src="https://media.betzonelab.com/skins/logo/10.png?v=704" />
                                </a>
                            </h1>
                            <nav className="nav-menu">
                                <ul>
                                    {this.props.gamessection}

                                    <li class="">
                                        <a href="/sport/prematch/">
                                            <span>Sport</span>
                                        </a>
                                    </li>
                                    <li class="">
                                        <a href="/sport/live/">
                                            <span>Sport Live</span>
                                        </a>
                                    </li>
                                    <li class="">
                                        <a href="/casino/">
                                            <span>Casino</span>
                                        </a>
                                    </li>

                                    <li class="">
                                        <a href="/turbogames/">
                                            <span>Aviator</span>
                                        </a>
                                    </li>
                                    <li class="">
                                        <a href="/casino-live/">
                                            <span>Live Casino</span>
                                        </a>
                                    </li>
                                    <li class="">
                                        <a href="/virtual/">
                                            <span>Virtual</span>
                                        </a>
                                    </li>
                                </ul>
                            </nav>
                        </div>
                        <div className="login-links">
                            <a href="" className="button-header hide-mobile">
                                {this.props.svggift}
                            </a>

                            <a href="" onClick="" className="button-header login-pul">Log in</a>


                            <div className="btn-group">
                                <a href="#" className="button-header hide-mobile" id="info2" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                    {this.props.svgsettings}
                                </a>
                            </div>
                        </div>
                    </div>

                </header>
            </>
        );
    }
}

class GameSection extends Component {
    render() {
        return (
            <li className="">
                <a href="">
                    <span>{this.props.gamename}</span>
                </a>
            </li>
        );
    }
}

export { Navbar };

export { GameSection };