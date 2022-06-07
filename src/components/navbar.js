import React, {Component, useState} from "react";

import '../styles/headerv1.css';

function CallBackSetShow(value){
    
const [show, setShow] = useState(false);
setShow(value);
}

function Navbar(props){

    const [open, setOpen] = useState(false);

    return (
        <>
            <header className="header-top">
                <div className="container-fluid d-flex justify-content-between align-items-center">
                    <div className="navigation-bar">
                        <a href="" className="menu-mobile-pul hide-desktop" data-toggle="modal" data-target="#ModalMenu"><i className="fa fa-bars"></i></a>
                        <h1 className="logo">
                            <a href="">

                                <img src="https://media.betzonelab.com/skins/logo/10.png?v=704" />
                            </a>
                        </h1>
                        <nav className="nav-menu">
                            <ul>
                                {props.gamesection}
                            </ul>
                        </nav>
                    </div>
                    <div className="login-links">
                        <a href="" className="button-header hide-mobile">
                            {props.svggift}
                        </a>

                        <a href="#" onClick={props.childModalButton} className="button-header login-pul">Log in</a>

                            {props.childModal}

                        <div className="btn-group">
                            <a href="#" className="button-header" onClick={() => setOpen(!open)}>
                                {props.svgsettings}
                            </a>

                            {open && props.childLanguage}
                        </div>
                    </div>
                </div>

            </header>
        </>
    );

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