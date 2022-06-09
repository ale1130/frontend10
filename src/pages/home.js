import React from 'react';

import {Navbar} from '././components/navbar';
import {GameSection} from './components/navbar';
import Footer from './components/footer';
import {PhoneIcon} from './components/icons';
import {GiftIcon} from './components/icons';
import {SettingsIcon} from './components/icons';
import {SelectLanguages} from './components/languagesselector';
import LoginModal from "./components/loginmodal";
import RegistrationModal from "./components/registration";
import ControlledCarousel from "./components/slider";

function Home (){
    return (
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
    )
}

export default Home;


        