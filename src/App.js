import React, {useState} from "react";
import {useEffect} from "react";

import {
  BrowserRouter as Router,
  Routes,
  Route,
} from "react-router-dom";

//Loader
import { Loader } from "./components/spinner";

//Logged in or not 

import { NoLogged } from "./components/schermatanolog";

//global

import {api, convertObjectStringToNumbers, logoDirectory } from "./constants/global";

//Rotte

import Home from "./pages/home";
import Sport from "./pages/sport";
import SportLive from "./pages/sport-live";
import Casino from "./pages/casino";
import CasinoLive from "./pages/casino-live";
import Poker from "./pages/poker";
import Virtual from "./pages/virtual";
import Bingo from "./pages/bingo";
import Account from "./pages/account";
import MyProfile from "./components/myprofile";
import Info from "./pages/info";
import Password from "./pages/password";
import Messages from "./pages/messages";

//Components

import LoginModal from "./components/loginmodal";
import RegistrationModal from "./components/registration";
import RegistrationModalPix from "./components/registrationpix";
import {Navbar} from './components/navbar';
import Footer from './components/footer';

//Components per stile globale dopo caricamento informazioni skin

import {createGlobalStyle} from 'styled-components';

//Languages

import { useTranslation } from 'react-i18next';
import { AdminLanguages, LanguagesBrasiliano, LanguagesArabo, LanguagesCinese, LanguagesFrancese, LanguagesInglese, LanguagesPortoghese, LanguagesRumeno, LanguagesSpagnolo, LanguagesTedesco, LanguagesTurco, LanguagesUngherese } from "./components/adminLanguages";


//Cookies

import Cookies from 'universal-cookie';

function App(){

  //Cookies

  const cookies = new Cookies();

  //Variabile di caricamento

  const [loader, setLoader] = useState(0);

  //Variabili per settaggio e raccoglimento dati skin

  const [SKIN, setSKIN] = useState(["empty"]);
  const [Stile, setStile] = useState();
  const [skinSettings, setSkinSettings] = useState(["empty"]);

  //Variabili per informazioni utente

  const [USER, setUser] = useState(["empty"]);

  const [isLogged, setIsLogged] = useState(false);

  //Languages

  const {t, i18n } = useTranslation();

  //Usestate per componenti

  const [show, setShow] = useState(false);

  const [showReg, setShowReg] = useState(false);

  //Pagina corrente

  const [currentPage, setCurrentPage] = useState(window.location.pathname);

  //Estrazione dati skin

  const GetdataSkin = async () =>{

    try{

      const data = await api
      .get('rest/datiskin')
      .then(response => {

        if(response.data.status="ok"){
          setSKIN(convertObjectStringToNumbers(response.data.dati));
        }else{
          alert(t('erroregenerico'));
        }

      })
    }catch (e){

     alert(t('erroregenerico'));  console.log(e);
    }
  };

  useEffect(() => {
    GetdataSkin();
  },[]);

  //Stile globale skin

  useEffect(() => {

    if(SKIN!="empty"){
      setLoader(loader+1);
    }
  },[SKIN]);

  useEffect(()=>{

    if(loader==1){

      setStile(createGlobalStyle`
        :root {
          --color1: ${SKIN["colore1"]};
          --color2: ${SKIN["colore2"]};
          --color3: ${SKIN["colore3"]};
          --color4: ${SKIN["colore4"]};
          --color5: ${SKIN["colore5"]};
          --color6: ${SKIN["colore6"]};
          --color7: ${SKIN["colore7"]};
          --color8: ${SKIN["colore8"]};
          --color9: ${SKIN["colore9"]};
          --color10: ${SKIN["colore10"]};
          --color11: ${SKIN["colore11"]};
          --color12: ${SKIN["colore12"]};
          --color13: ${SKIN["colore13"]};
          --color14: ${SKIN["colore14"]};
          --color15: ${SKIN["colore15"]};
          --color16: ${SKIN["colore16"]};
          --color17: ${SKIN["colore17"]};
          --color18: ${SKIN["colore18"]};
          --color19: ${SKIN["colore19"]};
          --color20: ${SKIN["colore20"]};
        }
      `);

      setLoader(loader+1);
    }
    
  },[loader])

  //Impostazioni della skin
      
  const Settings = async () =>{
    try{

      const data = await api
      .get('rest/skinsett')
      .then(response => {

        if(response.data.status="ok"){
          setSkinSettings(response.data.dati);
        }else{
          alert(t('erroregenerico'));
        }
      })

    }catch (e){

      alert(t('erroregenerico'));  console.log(e);
    }
  };

  useEffect(()=>{

    if(loader == 3){
      Settings();
    }
    
  },[loader])

  //Verifica dati utente nel localStorage

  const VerifyDataUser = async (user, pass) => {

    try{

      const data = await api
      .get('rest/usercookie/:'+user+"/:"+pass+"/")
      .then(response => {

        if(response.data.status=="ok"){

          if(response.data.dati["blocked"]!=1){
            setUser(convertObjectStringToNumbers(response.data.dati));

            setIsLogged(true);
            setLoader(loader+1);

            cookies.set('gio_uid', response.data.dati.id, { path: '/' });
            cookies.set('gio_pass', response.data.dati.passhash, { path: '/' });

          }else{
            cookies.remove('gio_uid', { path: '/' });
            cookies.remove('gio_pass', { path: '/' });
            setLoader(loader+1);
          }
          
        }else{

          cookies.remove('gio_uid', { path: '/' });
          cookies.remove('gio_pass', { path: '/' });
          setLoader(loader+1);
        }
      })

    }catch (e){

     alert(t('erroregenerico'));  console.log(e);
    }
  };

  useEffect(() => {

    if(loader==3){

      const loggedInUsername = cookies.get("gio_uid");
      const loggedInPasshash = cookies.get("gio_pass");
      if (loggedInUsername && loggedInPasshash && SKIN["id"]) {

        VerifyDataUser(loggedInUsername, loggedInPasshash, SKIN["id"]);
      }else{

        setLoader(loader+1);

        cookies.remove('gio_uid', { path: '/' });
        cookies.remove('gio_pass', { path: '/' });

        setIsLogged(false);
      }
    }
  }, [loader]);

  
  useEffect(()=>{

    if(loader==4){

      const currentLang = cookies.get("la");

      const arrayLang = ['it','de','en','tr','ro','zh','fr','pt','pt-br','hu','es','ar'];

      if(currentLang && arrayLang.includes(currentLang)){

        i18n.changeLanguage(currentLang);
        setLoader(loader+1);

      }else if(USER["primary_language"] && arrayLang.includes(USER["primary_language"])){

        i18n.changeLanguage(USER["primary_language"]);
        cookies.set('la',USER["primary_language"], { path: '/' });
        setLoader(loader+1);
      }else{

        i18n.changeLanguage(SKIN["language"]);
        cookies.set('la', SKIN["language"], { path: '/' });
        setLoader(loader+1);
      }
    }

  },[loader]);

  return (
    <>

      {loader>=5 ? 

      <>

        <Stile />

        <Router>

          <Navbar
            logo={logoDirectory+SKIN["logo_img"]}
            currentPage={currentPage}
            childModalButton = {() => setShow(true)}
            statoLogin={isLogged}
            setLogin={setIsLogged}
            datiUtente={USER}
            skin={SKIN}
          />

          <LoginModal 
            modalState={show} 
            closeModal={() => setShow(false)}
            openModalReg={() => setShowReg(true)}
            setUserC={setUser}
            setLogin={setIsLogged}
            skin={SKIN["id"]}
          />

          {
            SKIN["id"] != 4 ?
          
            <RegistrationModal 
              modalState={showReg} 
              closeModal={() => setShowReg(false)}
              skin={SKIN}
              openModalLogin={() => setShow(true)}
              setUserC={setUser}
              setLogin={setIsLogged}
              skinSettings={skinSettings}
            />
            
            :

            <RegistrationModalPix />
          }
          <Routes>
            <Route path="/" element={<Home setShowC={()=>setShow(true)} statoLogin={isLogged}/>}/>
            <Route path="/sport" element={<Sport />}/>
            <Route path="/sport-live" element={<SportLive />}/>
            <Route path="/casino" element={<Casino isLogged={isLogged} skin={SKIN}/>}/>
            <Route path="/casino-live" element={<CasinoLive />}/>
            <Route path="/poker" element={<Poker />}/>
            <Route path="/virtual" element={<Virtual />}/>
            <Route path="/bingo" element={<Bingo />}/>
            <Route path="/account" element={ isLogged ? <Account isLogged={isLogged} user={USER}/> : <NoLogged /> } />
            <Route path="/profile" element={ isLogged ? <MyProfile datiUtente={USER}/> : <NoLogged />  } />
            <Route path="/profile/info" element={ isLogged ? <Info datiUtente={USER} /> : <NoLogged /> } />
            <Route path="/profile/password" element={ isLogged ? <Password datiUtente={USER} /> : <NoLogged /> } />
            <Route path="/profile/messages" element={ isLogged ? <Messages datiUtente={USER} /> : <NoLogged /> } />

            <Route path="/languages" element={<AdminLanguages />} />
            <Route path="/languages/inglese" element={<LanguagesInglese />} />
            <Route path="/languages/tedesco" element={<LanguagesTedesco />} />
            <Route path="/languages/turco" element={<LanguagesTurco />} />
            <Route path="/languages/arabo" element={<LanguagesArabo />} />
            <Route path="/languages/rumeno" element={<LanguagesRumeno />} />
            <Route path="/languages/cinese" element={<LanguagesCinese />} />
            <Route path="/languages/spagnolo" element={<LanguagesSpagnolo />} />
            <Route path="/languages/francese" element={<LanguagesFrancese />} />
            <Route path="/languages/portoghese" element={<LanguagesPortoghese />} />
            <Route path="/languages/brasiliano" element={<LanguagesBrasiliano />} />
            <Route path="/languages/ungherese" element={<LanguagesUngherese />} />
          </Routes>
          
        </Router>

        <Footer
          logo={logoDirectory+SKIN["logo_img"]}
          footer_text={SKIN["footer_text"]}
        />
      </>

      :
      
      <>
        <Loader />
      </>

      }
      
    </>
  );

}

export default App;