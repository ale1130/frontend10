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

import ControlledCarousel from "./components/slider";
import 'bootstrap/dist/css/bootstrap.min.css';

function App(){

  const [show, setShow] = useState(false);

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
      />

      <ControlledCarousel 
        openForm={() => setShow(!show)}
      />  

      <Footer />
    </>
  );
}

export default App;
