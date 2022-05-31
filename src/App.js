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
import {LoginModal} from "./components/loginmodal";



function App(){

  const [openModal, setOpenModal] = useState(false);

  return (
    <>
      <Navbar
          svggift={<GiftIcon />}
          svgsettings={<SettingsIcon />}
          childLanguage={<SelectLanguages svgphone={<PhoneIcon/>} />}
          childModalButton = {() => setOpenModal(!openModal)}
          childModal={<LoginModal modalState={openModal} closeModal={() => setOpenModal(!openModal)}/>}
          gamesection={<GameSection />}
      />

      <ImageSlider 
        slides={SliderData}
      />

      <Footer />
    </>
  );
}

export default App;
