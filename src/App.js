import React, {Component} from "react";

import {Navbar} from './components/navbar';
import {GameSection} from './components/navbar';
import Footer from './components/footer';
import BodyContent from './components/body';
import {PhoneIcon} from './components/icons';
import {GiftIcon} from './components/icons';
import {SettingsIcon} from './components/icons';
import {SelectLanguages} from './components/languagesselector';
import {LabelLanguage} from './components/languagesselector';
import {Logo} from './components/logo';

class App extends Component{
    render(){
      return (
        <>
          <Navbar
              svggift={<GiftIcon />}
              svgsettings={<SettingsIcon />}
              gamesection={<GameSection />}
          />
            <BodyContent />
            <Footer />
        </>
      );
    }
}

export default App;
