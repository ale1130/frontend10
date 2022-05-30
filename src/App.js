import React, {Component,useState} from "react";

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

function App(){
  return (
    <>
      <Navbar
          svggift={<GiftIcon />}
          svgsettings={<SettingsIcon>  </SettingsIcon>}
          children={<SelectLanguages svgphone={<PhoneIcon/>} />}
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
