import React, {useState} from "react";
import {useEffect} from "react";

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

import GetdataSkin from "./server/getdatas";
import Spinner from 'react-bootstrap/Spinner'

const skinId = (new URL(window.location.href)).searchParams.get('id');

function App(){

  const [datiSkin, setDatiSkin] = useState();

  const elements = [];

  elements [0] = false;

  GetdataSkin(skinId).then(skinDatas=>{
    elements[0]=true;
    setDatiSkin(skinDatas);
  })

  var total = elements.length;
  var completed = 0;

  var downloadTimer = setInterval(function(){

    console.log(total);

    for (let index = 0; index < elements.length; ++index) {

      const element = elements[index];

      if(element==true){
        completed++;
      }
      
    }

    if(completed>=total){
      console.log("Caricato")
      console.log(datiSkin);
      clearInterval(downloadTimer);
      /*return(
        <>
          <Navbar
            svggift={<GiftIcon />}
            svgsettings={<SettingsIcon />}
            childLanguage={<SelectLanguages svgphone={<PhoneIcon/>} />}
            childModalButton = {() => setShow(true)}
            gamesection={<GameSection />}
          />

          <LoginModal 
            modalState={show} 
            closeModal={() => setShow(false)}
            openModalReg={() => setShowReg(!showReg)}
          />

          <ControlledCarousel 
            openForm={() => setShow(true)}
          />  

          <RegistrationModal 
            modalState={showReg} 
            closeModal={() => setShowReg(false)}
          />

          <Footer />
        </>
      );*/
    
    }else{
      console.log("caricamento...")
      /*return(
        <>       
          <Spinner animation="border" role="status">
            <span className="visually-hidden">Loading...</span>
          </Spinner>
        </>
      );*/
    }
  
  }, 1);

  const [showReg, setShowReg] = useState(false);

  const [show, setShow] = useState(false);

  return (
    <>

      <Navbar
        svggift={<GiftIcon />}
        svgsettings={<SettingsIcon />}
        childLanguage={<SelectLanguages svgphone={<PhoneIcon/>} />}
        childModalButton = {() => setShow(true)}
        gamesection={<GameSection />}
      />

      <LoginModal 
        modalState={show} 
        closeModal={() => setShow(false)}
        openModalReg={() => setShowReg(!showReg)}
      />

      <ControlledCarousel 
        openForm={() => setShow(true)}
      />  

      <RegistrationModal 
        modalState={showReg} 
        closeModal={() => setShowReg(false)}
      />

      <Footer />
    </>
  );

}

/*function ReturnContent(){

  const [show, setShow] = useState(false);

  const [showReg, setShowReg] = useState(false);

  return (
    <>

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
}*/

export default App;