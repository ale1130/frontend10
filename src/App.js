import React, {useState} from "react";
import {useEffect} from "react";
import axios from "axios";

import { GlobalStyle } from "./globalStyles";

import {Navbar} from './components/navbar';
import {GameSection} from './components/navbar';
import Footer from './components/footer';
import {PhoneIcon} from './components/icons';
import {GiftIcon} from './components/icons';
import {SettingsIcon} from './components/icons';
import {SelectLanguages} from './components/languagesselector';

import LoginModal from "./components/loginmodal";
import RegistrationModal from "./components/registration";

import ControlledCarousel from "./components/slider";
import 'bootstrap/dist/css/bootstrap.min.css';

import Spinner from 'react-bootstrap/Spinner'

const skinId = (new URL(window.location.href)).searchParams.get('id');
const logoDirectory = "https://media.betzonelab.com/skins/logo/";

function App(){

  const [datiSkin, setDatiSkin] = useState([]);

  const [SKIN, setSKIN] = useState([]);

  const [showReg, setShowReg] = useState(false);

  const [show, setShow] = useState(false);

  const [loader, setLoader] = useState(true);

  const GetdataSkin = async () =>{

    try{

      const data = await axios
      .post('http://localhost:3001/getdataskin',{skinid : skinId})
      .then(response => {
        
        setDatiSkin(response.data[0]);
      }).then(function(){
        setLoader(false);
      });
    }catch (e){

      console.log(e);
    }
  };

  useEffect(() => {
    GetdataSkin();
  },[]);

  useEffect(() => {

    var skinUtilizzo = [];

    const objectArray = Object.entries(datiSkin);

    objectArray.forEach(([key, value]) => {
      skinUtilizzo[key] = value;
      setSKIN(skinUtilizzo);
    });

  },[datiSkin]);

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
          openModalReg={() => setShowReg(!showReg)}
        />

        <ControlledCarousel 
          openForm={() => setShow(true)}
        />  

        <RegistrationModal 
          modalState={showReg} 
          closeModal={() => setShowReg(false)}
        />

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