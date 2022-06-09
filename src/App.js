import React, {useState} from "react";
import {useEffect} from "react";

import {
  BrowserRouter as Router,
  Routes,
  Route,
  Link
} from "react-router-dom";

import axios from "axios";

import Home from "./pages/home";
import Sport from "./pages/sport";
import SportLive from "./pages/sport-live";
import Casino from "./pages/casino";
import CasinoLive from "./pages/casino-live";
import Poker from "./pages/poker";
import Virtual from "./pages/virtual";
import Bingo from "./pages/bingo";

import LoginModal from "./components/loginmodal";
import RegistrationModal from "./components/registration";
import {Navbar} from './components/navbar';
import {GameSection} from './components/navbar';
import {PhoneIcon} from './components/icons';
import {GiftIcon} from './components/icons';
import {SettingsIcon} from './components/icons';
import {SelectLanguages} from './components/languagesselector';
import Footer from './components/footer';

import 'bootstrap/dist/css/bootstrap.min.css';
import Spinner from 'react-bootstrap/Spinner';

import {createGlobalStyle} from 'styled-components';
import {Megastile} from "./components/superStile";

const skinId = (new URL(window.location.href)).searchParams.get('id');

const logoDirectory = "https://media.betzonelab.com/skins/logo/";

function App(){

  const [datiSkin, setDatiSkin] = useState(["empty"]); 

  const [SKIN, setSKIN] = useState(["empty"]);

  const [loader, setLoader] = useState(true);

  const [show, setShow] = useState(false);

  const [showReg, setShowReg] = useState(false);

  const [USER, setUser] = useState();

  const ConvertObjectToArray = (object) =>{

    var objectArray = Object.entries(object);

    var arrUtilizzo = [];

    objectArray.forEach(([key, value]) => {

      arrUtilizzo[key] = value;
    });

    return arrUtilizzo;
  }

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

  const Stile = createGlobalStyle`
  ${Megastile(SKIN)}
  `;

  
  const VerifyDataUser = async (user, pass, idS) => {

    try{

    const data = await axios
    .post('http://localhost:3001/getuserdatacookie',{ username : user, passhash : pass, skin : idS })
    .then(response => {
        
      setUser(ConvertObjectToArray(response.data[0]));

      localStorage.setItem('username', response.data[0].username);
      localStorage.setItem('passhash', response.data[0].passhash);
    })
    }catch (e){

      console.log(e);
    }
  };

  useEffect(() => {

    if(!loader){

      const loggedInUsername = localStorage.getItem("username");
      const loggedInPasshash = localStorage.getItem("passhash");
      if (loggedInUsername && loggedInPasshash && skinId) {

        VerifyDataUser(loggedInUsername, loggedInPasshash, skinId);
      }
    }
  }, [loader]);

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
            svggift={<GiftIcon />}
            svgsettings={<SettingsIcon />}
            childLanguage={<SelectLanguages svgphone={<PhoneIcon/>} />}
            childModalButton = {() => setShow(true)}
            gamesection={<GameSection />}
          />

          <LoginModal 
            modalState={show} 
            closeModal={() => setShow(false)}
            openModalReg={() => setShowReg(true)}
            setUserC={() => setUser}
            skin={SKIN["id"]}
          />

          {USER ? <div>{USER["username"]} is loggged in</div> : <div>no logged in</div>}

          <RegistrationModal 
            modalState={showReg} 
            closeModal={() => setShowReg(false)}
          />

          <Routes>
            <Route path="/" element={<Home setShowC={()=>setShow(true)}/>}/>
            <Route path="/sport" element={<Sport />}/>
            <Route path="/sport-live" element={<SportLive />}/>
            <Route path="/casino" element={<Casino />}/>
            <Route path="/casino-live" element={<CasinoLive />}/>
            <Route path="/poker" element={<Poker />}/>
            <Route path="/virtual" element={<Virtual />}/>
            <Route path="/bingo" element={<Bingo />}/>
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