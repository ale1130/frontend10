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
                                    {this.props.gamesection}
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

class GameSection extends Component{

    state = {
        gamecategory:[
            {id:0, nome:"Sport", immagine:""},
            {id:1, nome:"Sport-Live", immagine:""},
            {id:2, nome:"Casino", immagine:""},
            {id:3, nome:"Casino-Live", immagine:""},
            {id:4, nome:"Poker", immagine:""},
            {id:5, nome:"Virtual", immagine:""},
            {id:6, nome:"Bingo", immagine:""}
        ],
    }

    render(){
        return(
            this.state.gamecategory.map(category =>
                <li className="" key={category.id}>
                    <a href="">
                        <span>{category.nome}</span>
                    </a>
                </li>
            )
        );
    }
}

export { Navbar };

export { GameSection };