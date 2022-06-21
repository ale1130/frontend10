import React, {useState, useMemo} from "react";
import {useEffect} from "react";

import {
  BrowserRouter as Router,
  Routes,
  Route,
} from "react-router-dom";

import axios from "axios";

//global

import { ConvertObjectToArray, skinId, logoDirectory } from "./constants/global";

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
import MyProfile from "./components/myprofile";
import Info from "./pages/info";
import Password from "./pages/password";
import Messages from "./pages/messages";

//Components

import LoginModal from "./components/loginmodal";
import RegistrationModal from "./components/registration";
import RegistrationModalPix from "./components/registrationpix";
import {Navbar} from './components/navbar';
import Footer from './components/footer';

import 'bootstrap/dist/css/bootstrap.min.css';
import Spinner from 'react-bootstrap/Spinner';

//Components per stile globale dopo caricamento informazioni skin

import {createGlobalStyle} from 'styled-components';
import {Megastile} from "./components/superStile";

//Languages



function App(){

  //Languages

  

  //Variabile di caricamento

  const [loader, setLoader] = useState(0);
  const [loader2, setLoader2] = useState(0);
  const [loader3, setLoader3] = useState(0);

  //Variabili per settaggio e raccoglimento dati skin

  const [SKIN, setSKIN] = useState(["empty"]);

  //Variabili per informazioni utente

  const [USER, setUser] = useState(["empty"]);

  const [isLogged, setIsLogged] = useState(false);

  //Usestate per componenti

  const [show, setShow] = useState(false);

  const [showReg, setShowReg] = useState(false);

  //Pagina corrente

  const [currentPage, setCurrentPage] = useState(window.location.pathname);

  //Estrazione dati skin

  const GetdataSkin = async () =>{

    try{

      const data = await axios
      .post('http://localhost:3001/getdataskin',{skinid : skinId})
      .then(response => {
        
        setSKIN(response.data[0]);
      })
    }catch (e){

     alert("Errore tecnico, contattare l'assistenza");  console.log(e);
    }
  };

  useEffect(() => {
    GetdataSkin();
  },[]);

  useEffect(() => {

    if(SKIN!="empty"){
      setLoader(loader+1);
    }
  },[SKIN]);

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
          setLoader2(loader2+1);

          localStorage.setItem('username', response.data[0].username);
          localStorage.setItem('passhash', response.data[0].passhash);
        }else{

          localStorage.removeItem('username');
          localStorage.removeItem('passhash');
          setLoader2(loader2+1);
        }
      })

    }catch (e){

     alert("Errore tecnico, contattare l'assistenza");  console.log(e);
    }
  };

  useEffect(() => {

    if(loader>0){
      const loggedInUsername = localStorage.getItem("username");
      const loggedInPasshash = localStorage.getItem("passhash");
      if (loggedInUsername && loggedInPasshash && skinId) {

        VerifyDataUser(loggedInUsername, loggedInPasshash, skinId);
      }else{

        setLoader2(loader2+1);

        localStorage.removeItem('username');
        localStorage.removeItem('passhash');

        setIsLogged(false);
      }
    }
  }, [loader]);

  
  useEffect(()=>{

    /*if(loader2>0){

      const currentLang = localStorage.getItem("language");
      const autoDetected = localStorage.getItem("i18nextLng");

      const arrayLang = ['it','de','en','tr','ro','zh','fr','pt','pt-br','hu','es','ar'];

      if(currentLang && arrayLang.includes(currentLang)){

        i18n.changeLanguage(currentLang);
        setLoader3(loader3+1);

      }else if(arrayLang.includes(autoDetected)){

        i18n.changeLanguage(currentLang);
        setLoader3(loader3+1);
        
      }else{

        switch(SKIN["id"]){

          case 1:
            i18n.changeLanguage('en');
            localStorage.setItem('language', 'en');
            setLoader3(loader3+1);
          break;

          case 2:
            i18n.changeLanguage('en');
            localStorage.setItem('language', 'en');
            setLoader3(loader3+1);
          break;

          case 3:
            i18n.changeLanguage('pt');
            localStorage.setItem('language', 'pt');
            setLoader3(loader3+1);
          break;

          case 4:
            i18n.changeLanguage('en');
            localStorage.setItem('language', 'en');
            setLoader3(loader3+1);
          break;

          case 5:
            i18n.changeLanguage('en');
            localStorage.setItem('language', 'en');
            setLoader3(loader3+1);
          break;

          case 6:
            i18n.changeLanguage('en');
            localStorage.setItem('language', 'en');
            setLoader3(loader3+1);
          break;

          case 7:
            i18n.changeLanguage('en');
            localStorage.setItem('language', 'en');
            setLoader3(loader3+1);
          break;

          default:
            i18n.changeLanguage('en');
            localStorage.setItem('language', 'en');
            setLoader3(loader3+1);
          break;
        }
      }
    }*/

    setLoader3(loader3+1);

  },[loader2]);

  return (
    <>

      {loader3>0 ? 

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

          {
            SKIN["id"] != 3 ?
          
            <RegistrationModal 
              modalState={showReg} 
              closeModal={() => setShowReg(false)}
              skin={SKIN}
              openModalLogin={() => setShow(true)}
              setUserC={setUser}
              setLogin={setIsLogged}
            />
            
            :

            <RegistrationModalPix 
              modalState={showReg} 
              closeModal={() => setShowReg(false)}
              skin={SKIN}
              openModalLogin={() => setShow(true)}
              setUserC={setUser}
              setLogin={setIsLogged}
            />
          }
          <Routes>
            <Route path="/" element={<Home setShowC={()=>setShow(true)} statoLogin={isLogged}/>}/>
            <Route path="/sport" element={<Sport />}/>
            <Route path="/sport-live" element={<SportLive />}/>
            <Route path="/casino" element={<Casino isLogged={isLogged} skin={SKIN}/>}/>
            <Route path="/casino-live" element={<CasinoLive />}/>
            <Route path="/poker" element={<Poker />}/>
            <Route path="/virtual" element={<Virtual />}/>
            <Route path="/bingo" element={<Bingo />}/>
            <Route path="/account" element={<Account isLogged={isLogged} user={USER}/>}/>
            <Route path="/profile" element={<MyProfile datiUtente={USER} />} />
            <Route path="/profile/info" element={<Info datiUtente={USER} />} />
            <Route path="/profile/password" element={<Password datiUtente={USER} />} />
            <Route path="/profile/messages" element={<Messages datiUtente={USER} />} />
          </Routes>
          
        </Router>

        <Footer
          logo={logoDirectory+SKIN["logo_img"]}
          footer_text={SKIN["footer_text"]}
        />
      </>

      :
      
      <>
      <Spinner animation="border" role="status">
        <span className="visually-hidden">Loading...</span>
      </Spinner>
      </>

      }
      
    </>
  );

}

export default App;