import React, {Component,useState} from "react";

import { GlobalStyle } from "./globalStyles";

import {Navbar} from './components/navbar';
import {GameSection} from './components/navbar';
import Footer from './components/footer';
import {PhoneIcon} from './components/icons';
import {GiftIcon} from './components/icons';
import {SettingsIcon} from './components/icons';
import {SelectLanguages} from './components/languagesselector';
import {Logo} from './components/logo';
import {ImageSlider} from "./components/contentPage";
import {SliderData} from "./components/contentPage";
import LoginModal from "./components/loginmodal";

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

      <ImageSlider 
        slides={SliderData}
      />

      <Footer />
    </>
  );
}

export default App;
