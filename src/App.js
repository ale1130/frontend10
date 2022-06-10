import React, {useState} from "react";
import {useEffect} from "react";

import {
  BrowserRouter as Router,
  Routes,
  Route,
  Link
} from "react-router-dom";

import axios from "axios";

//Rotte

import Home from "./pages/home";
import Sport from "./pages/sport";
import SportLive from "./pages/sport-live";
import Casino from "./pages/casino";
import CasinoLive from "./pages/casino-live";
import Poker from "./pages/poker";
import Virtual from "./pages/virtual";
import Bingo from "./pages/bingo";
import Account from "./pages/account";
import Profile from "./pages/profile";

//Components

import LoginModal from "./components/loginmodal";
import RegistrationModal from "./components/registration";
import {Navbar} from './components/navbar';
import Footer from './components/footer';


import 'bootstrap/dist/css/bootstrap.min.css';
import Spinner from 'react-bootstrap/Spinner';

//Components per stile globale dopo caricamento informazioni skin

import {createGlobalStyle} from 'styled-components';
import {Megastile} from "./components/superStile";

const skinId = (new URL(window.location.href)).searchParams.get('id');

const logoDirectory = "https://media.betzonelab.com/skins/logo/";

function App(){

  //Variabili per settaggio e raccoglimento dati skin

  const [datiSkin, setDatiSkin] = useState(["empty"]); 

  const [SKIN, setSKIN] = useState(["empty"]);

  //Variabile di caricamento

  const [loader, setLoader] = useState(true);

  //Usestate per componenti

  const [show, setShow] = useState(false);

  const [showReg, setShowReg] = useState(false);

  //Variabili per informazioni utente

  const [USER, setUser] = useState([]);

  const [isLogged, setIsLogged] = useState(false);

  //Pagina corrente

  const [currentPage, setCurrentPage] = useState(window.location.pathname);

  //Coneverte oggetti in array

  const ConvertObjectToArray = (object) =>{

    var objectArray = Object.entries(object);

    var arrUtilizzo = [];

    objectArray.forEach(([key, value]) => {

      arrUtilizzo[key] = value;
    });

    return arrUtilizzo;
  }

  //Estrazione dati skin

  const GetdataSkin = async () =>{

    try{

      const data = await axios
      .post('http://localhost:3001/getdataskin',{skinid : skinId})
      .then(response => {
        
        setDatiSkin(response.data[0]);
      })
    }catch (e){

      console.log(e);
    }
  };

  useEffect(() => {
    GetdataSkin();
  },[]);

  useEffect(() => {

    if(datiSkin!="empty"){

      setSKIN(ConvertObjectToArray(datiSkin));
      setLoader(false);
    }
  },[datiSkin]);

  //Stile globale skin

  const Stile = createGlobalStyle`
  ${Megastile(SKIN)}
  `;
  
  //Verifica dati utente nel localStorage

  const VerifyDataUser = async (user, pass, idS) => {

    try{

    const data = await axios
    .post('http://localhost:3001/getuserdatacookie',{ username : user, passhash : pass, skin : idS })
    .then(response => {

      if(!response.data.message){

        setUser(ConvertObjectToArray(response.data[0]));
        setIsLogged(true);
        localStorage.setItem('username', response.data[0].username);
        localStorage.setItem('passhash', response.data[0].passhash);
      }else{

        localStorage.clear();
        setIsLogged(false);
      }
 
    })
    }catch (e){

      console.log(e);
    }
  };

  /*const AggiornamentoDatiUtente = setInterval(function () {
    if(!loader){

      const loggedInUsername = localStorage.getItem("username");
      const loggedInPasshash = localStorage.getItem("passhash");
      if (loggedInUsername && loggedInPasshash && skinId) {

        VerifyDataUser(loggedInUsername, loggedInPasshash, skinId);
      }else{

        localStorage.clear();
        setIsLogged(false);
      }
    }
  }, 5000);*/

  useEffect(() => {

    //if(!loader){ E' necessario implementare una funzione che lo richiamo ogni tot secondi

      const loggedInUsername = localStorage.getItem("username");
      const loggedInPasshash = localStorage.getItem("passhash");
      if (loggedInUsername && loggedInPasshash && skinId) {

        VerifyDataUser(loggedInUsername, loggedInPasshash, skinId);
      }else{

        localStorage.clear();
        setIsLogged(false);
      }
    //}
  }, []);

  return (
    <>

      {loader ? 

      <>
        <Spinner animation="border" role="status">
          <span className="visually-hidden">Loading...</span>
        </Spinner>
      </>
      :
      <>
        <Stile />

        <Router>

          <Navbar
            logo={logoDirectory+SKIN["logo_img"]}
            currentPage={currentPage}
            childModalButton = {() => setShow(true)}
            statoLogin={isLogged}
            setLogin={setIsLogged}
            datiUtente={USER}
          />

          <LoginModal 
            modalState={show} 
            closeModal={() => setShow(false)}
            openModalReg={() => setShowReg(true)}
            setUserC={setUser}
            setLogin={setIsLogged}
            skin={SKIN["id"]}
          />

          <RegistrationModal 
            modalState={showReg} 
            closeModal={() => setShowReg(false)}
          />

          <Routes>
            <Route path="/" element={<Home setShowC={()=>setShow(true)} statoLogin={isLogged}/>}/>
            <Route path="/sport" element={<Sport />}/>
            <Route path="/sport-live" element={<SportLive />}/>
            <Route path="/casino" element={<Casino />}/>
            <Route path="/casino-live" element={<CasinoLive />}/>
            <Route path="/poker" element={<Poker />}/>
            <Route path="/virtual" element={<Virtual />}/>
            <Route path="/bingo" element={<Bingo />}/>
            <Route path="/profile" element={<Profile />}/>
            <Route path="/account" element={<Account isLogged={isLogged} user={USER}/>}/>
          </Routes>

        </Router>

        <Footer
          logo={logoDirectory+SKIN["logo_img"]}
          footer_text={SKIN["footer_text"]}
        />
      </>
      }
      
    </>
  );

}

export default App;