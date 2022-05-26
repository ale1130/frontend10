import React, {Component} from "react";

import Navbar from './components/navbar';
import Footer from './components/footer';
import BodyContent from './components/body';
import {PhoneIcon} from './components/icons';
import {GiftIcon} from './components/icons';
import {SettingsIcon} from './components/icons';

class App extends Component{
    render(){
      return (
        <>
          <Navbar
              svggift={<GiftIcon />}
              svgsettings={<SettingsIcon />}
          /><Navbar
              svggift={<GiftIcon />}
              svgsettings={<SettingsIcon />}
          />
            <BodyContent />
            <Footer />
        </>
      );
    }
}

export default App;
