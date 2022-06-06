import React, {useState} from "react";

import { GlobalStyle } from "./globalStyles";

import {Navbar} from './components/navbar';
import {GameSection} from './components/navbar';
import Footer from './components/footer';
import {PhoneIcon} from './components/icons';
import {GiftIcon} from './components/icons';
import {SettingsIcon} from './components/icons';
import {SelectLanguages} from './components/languagesselector';
import {Logo} from './components/logo';
import LoginModal from "./components/loginmodal";
import RegistrationModal from "./components/registration";

import ControlledCarousel from "./components/slider";
import 'bootstrap/dist/css/bootstrap.min.css';

import GetdataSkin from "./server/getDatas";

const skinId = (new URL(window.location.href)).searchParams.get('id');

function App(){

  const [datiSkin, setDatiSkin] = useState([]);

  const [show, setShow] = useState(false);

  const [showReg, setShowReg] = useState(false);

  return (
    <>
      <h1>{datiSkin}</h1>

      <Navbar
        
        svggift={<GiftIcon />}
        svgsettings={<SettingsIcon />}
        childLanguage={<SelectLanguages svgphone={<PhoneIcon/>} />}
        childModalButton = {() => setShow(!show)}
        gamesection={<GameSection />}
      />

      <LoginModal 
        modalState={show} 
        closeModal={() => setShow(false)}
        openModalReg={()=>setShowReg(!showReg)}
      />

      <ControlledCarousel 
        openForm={() => setShow(!show)}
      />  

      <RegistrationModal 
        modalState={showReg} 
        closeModal={() => setShowReg(false)}
      />

      <Footer />
    </>
  );
}

export default App;
