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

import {api, checkSkinSett, convertObjectStringToNumbers, ConvertObjectToArraySlideshow, logoDirectory, MINUTE_MS } from "./constants/global";

//Rotte

import Home from "./pages/home";
import Sport from "./pages/sport";
import SportLive from "./pages/sport-live";
import Casino from "./pages/casino";
import CasinoLive from "./pages/casino-live";
import Poker from "./pages/poker";
import Virtual from "./pages/virtual";
import Bingo from "./pages/bingo";
import MyProfile from "./components/myprofile";
import Info from "./pages/info";
import Password from "./pages/password";
import Messages from "./pages/messages";

import Page404 from "./pages/page404";

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
import Deposit from "./pages/deposit";
import Withdrawals from "./pages/withdrawals";
import Voucher from "./pages/voucher";
import Transactions from "./pages/transactions";
import Coupons from "./pages/coupons";
import Bonus from "./pages/bonus";
import WithdrawalsRequests from "./pages/withdrawals_requests";
import Affiliate from "./footerpages/affiliate";
import MultiBonus from "./footerpages/multiplebonus";
import Promotions from "./pages/promotions";
import DepositMethod from "./components/depositmethod";
import WithdrawMethod from "./components/withdrawmethod";

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

  //Conteggio ciclico messaggi (ogni minuto)

  const [countMessages, setCountMessages]= useState(111111111);

  //Costante immagini slideshow

  const [slideShowImages, setSlideShowImages] = useState(["empty"])

  //Providers footer

  const [providers, setProviders] = useState(["empty"])

  //Count methods

  const [countMethods, setCountMethods] = useState(["empty"]);

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
  
  useEffect(() => {

    if(SKIN!="empty" && loader==0){
      setLoader(loader+1);
    }
  },[SKIN]);

  //Stile globale skin

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

        if(response.data.status=="ok"){

          setSkinSettings(response.data.dati);
        }else if(response.data.status=="nosettingsfound"){

          setSkinSettings([]);
        }else{

          alert(t('erroregenerico'));
        }
      })

    }catch (e){

      alert(t('erroregenerico'));  console.log(e);
    }
  };

  useEffect(()=>{

    if(loader == 2){
      Settings();
    }
    
  },[loader])

  useEffect(() => {

    if(skinSettings!="empty"){
      setLoader(loader+1);
    }
  },[skinSettings]);

  //Verifico dati utente nei cookies

  const VerifyDataUser = async (user, pass) => {

    try{

      const data = await api
      .get('rest/usercookie/:'+user+"/:"+pass+"/")
      .then(response => {

        if(response.data.status=="ok"){

          if(response.data.dati["blocked"]!=1){

            setUser(convertObjectStringToNumbers(response.data.dati));

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

        VerifyDataUser(loggedInUsername, loggedInPasshash);
      }else{

        setLoader(loader+1);

        cookies.remove('gio_uid', { path: '/' });
        cookies.remove('gio_pass', { path: '/' });

        setIsLogged(false);
      }
    }
  }, [loader]);

  useEffect(() => {

    if(USER!="empty"){

      setIsLogged(true);
      setLoader(loader+1);
    }
  },[USER]);

  //Count messages

  const GetCountMessages = async (userid) => {

    try{

      const data = await api
      .get('rest/getcountmessages/:'+userid+"/")
      .then(response => {

        if(response.data.status=="ok"){

          setCountMessages(response.data.count.totale);
        }else{

          setCountMessages(36606);
        }
      })

    }catch (e){

     alert(t('erroregenerico'));  console.log(e);
    }
  };

  useEffect(() => {

    if(loader==4 && USER!="empty"){

      GetCountMessages(USER["id"]);
    }else if(loader==4){

      setLoader(loader+1);
    }
  },[loader]);

  useEffect(() => {

    if(countMessages!=111111111){
      setLoader(loader+1);
    }
  },[countMessages]);
  
  //Imposto la lingua

  useEffect(()=>{

    if(loader==5){
 
      const currentLang = cookies.get("la");

      const arrayLang = ['it','de','en','tr','ro','zh','fr','pt','ptbr','hu','es','ar'];

      if(!checkSkinSett(skinSettings,'disable_language_select')){
        if(currentLang && arrayLang.includes(currentLang)){

          i18n.changeLanguage(currentLang);
          setLoader(loader+1);

        }else if(USER["primary_language"] && arrayLang.includes(USER["primary_language"])){

          i18n.changeLanguage(USER["primary_language"]);
          cookies.set('la',USER["primary_language"], { path: '/', sameSite:"none", secure:true });
          setLoader(loader+1);
        }else{

          i18n.changeLanguage(SKIN["language"]);
          cookies.set('la', SKIN["language"], { path: '/', sameSite:"none", secure:true });
          setLoader(loader+1);
        }

      }else{
        i18n.changeLanguage(SKIN["language"]);
        cookies.set('la', SKIN["language"], { path: '/', sameSite:"none", secure:true });
        setLoader(loader+1);
      }
    }

  },[loader]);

  //Immagini per lo slideshow iniziale

  const GetSlideshowImages = async (page, logged) => {

    const loggato = logged ? 1 : 0;

    try{

      const data = await api
      .get('/rest/getslideshow/:'+page+"/:"+loggato+"/")
      .then(response => {

        if(response.data.status=="ok"){

          setSlideShowImages(ConvertObjectToArraySlideshow(response.data.dati[0]));
          
        }else{

          alert(t('erroregenerico'));
        }
      })

    }catch (e){

     alert(t('erroregenerico'));  console.log(e);
    }
  };

  useEffect(() => {

    if(loader==6){

      GetSlideshowImages('home', isLogged);
    }
  }, [loader]);

  useEffect(() => {

    if(slideShowImages!="empty"){

      setLoader(loader+1);
    }
  },[slideShowImages]);

  //Providers per il footer

  const GetProviders = async () => {

    const loggato = isLogged ? 1 : 0;

    try {

      const data = await api
      .get('rest/getproviders/:'+loggato+'/')
      .then(response => {

        if(response.data.status=="ok"){

          setProviders(response.data.dati);

        }else if(response.data.status=="error"){
            
          setProviders(["noproviders"])
        }else{

          alert(t('erroregenerico'));
        }
      })

    } catch (e) {

      alert(t('erroregenerico'));  
      console.log(e);
    }
  }

  useEffect(() => {

    if(loader==7){

      GetProviders();
    }
  }, [loader]);

  useEffect(() => {

    if(providers!="empty"){

      setLoader(loader+1);
    }
  },[providers]);

  //Count depositi e prelievi

  const GetCountMethods = async () => {

    try {

      const data = await api
      .get('rest/countMethods/:'+USER["id"]+'/')
      .then(response => {

        if(response.data.status=="ok"){

          setCountMethods(response.data.dati);

        }else if(response.data.status=="error"){
            
          setCountMethods(["nomethods"])
        }else{

          alert(t('erroregenerico'));
        }
      })

    } catch (e) {

      alert(t('erroregenerico'));  
      console.log(e);
    }
  }

  useEffect(() => {

    if(loader==8){

      GetCountMethods();
    }
  }, [loader]);

  useEffect(() => {

    if(countMethods!="empty"){

      setLoader(loader+1);
    }
  },[countMethods]);

  //Funzione in background per count messaggi e aggiornamento dati utente

  useEffect(() => {

    if(loader>=9){

      const interval = setInterval(() => {

        const loggedInUsername = cookies.get("gio_uid");
        const loggedInPasshash = cookies.get("gio_pass");

        if (loggedInUsername && loggedInPasshash && SKIN["id"]) {

          VerifyDataUser(loggedInUsername, loggedInPasshash);
        }

        GetCountMessages(USER["id"]);

      }, MINUTE_MS);

      return () => clearInterval(interval);
    }

  }, [loader])

  return (
    <>

      {loader>=9 ? 

      <>

        <Stile />

        <Router>

          <Navbar
            currentPage={currentPage}
            childModalButton = {() => setShow(true)}
            statoLogin={isLogged}
            setLogin={setIsLogged}
            datiUtente={USER}
            skin={SKIN}
            countMessages={countMessages}
            selectLanguageOK={checkSkinSett(skinSettings,'disable_language_select')}
          />

          <LoginModal 
            modalState={show} 
            closeModal={() => setShow(false)}
            openModalReg={() => setShowReg(true)}
            setUserC={setUser}
            setLogin={setIsLogged}
            setCountMessages={setCountMessages}
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
            <Route path="/" element={<Home setShowC={()=>setShow(true)} statoLogin={isLogged} immagini={slideShowImages} skin={SKIN} />}/>
            <Route path="/sport" element={<Sport />}/>
            <Route path="/sport-live" element={<SportLive />}/>
            <Route path="/casino" element={<Casino isLogged={isLogged} skin={SKIN} childModalButton={() => setShow(true)} user={USER}/> }/>
            <Route path="/casino-live" element={<CasinoLive />}/>
            <Route path="/poker" element={<Poker />}/>
            <Route path="/virtual" element={<Virtual />}/>
            <Route path="/bingo" element={<Bingo />}/>

            <Route path="/promotions" element={<Promotions />}/>

            {countMethods["countDep"] >0 && countMethods != "nomethods" ? <Route path="/account/deposit" element={ isLogged ? <Deposit countMethods={countMethods} user={USER} skin={SKIN} /> : <NoLogged /> } /> : <></>}
            {countMethods["countWith"]>0 && countMethods != "nomethods" ? <Route path="/account/withdrawals" element={ isLogged ? <Withdrawals countMethods={countMethods} user={USER} skin={SKIN} /> : <NoLogged /> } /> : <></>}
            <Route path="/account/vouchers" element={ isLogged ? <Voucher countMethods={countMethods} user={USER} skin={SKIN}/> : <NoLogged /> } />
            <Route path="/account/transactions" element={ isLogged ? <Transactions countMethods={countMethods} user={USER}/> : <NoLogged /> } />
            <Route path="/account/coupons" element={ isLogged ? <Coupons countMethods={countMethods} user={USER}/> : <NoLogged /> } />
            <Route path="/account/bonus" element={ isLogged ? <Bonus countMethods={countMethods} user={USER}/> : <NoLogged /> } />
            <Route path="/account/withdrawals_requests" element={ isLogged ? <WithdrawalsRequests countMethods={countMethods} user={USER}/> : <NoLogged /> } />

            <Route path="/profile" element={ isLogged ? <MyProfile datiUtente={USER} countMessages={countMessages} /> : <NoLogged />  } />
            <Route path="/profile/info" element={ isLogged ? <Info datiUtente={USER} countMessages={countMessages} disableLang={checkSkinSett(skinSettings,'disable_language_select')} /> : <NoLogged /> } />
            <Route path="/profile/password" element={ isLogged ? <Password datiUtente={USER} countMessages={countMessages} /> : <NoLogged /> } />
            <Route path="/profile/messages" element={ isLogged ? <Messages datiUtente={USER} countMessages={countMessages} /> : <NoLogged /> } />

            <Route path="/affiliate" element={<Affiliate />}/>
            <Route path="/multiplebonus" element={<MultiBonus />}/>

            {countMethods.depositMethods.map(metodo=>{
              return (
                <>
                  <Route key={metodo.method_code} path={"/account/deposit/"+metodo.method_code} element={ isLogged ? <DepositMethod countMethods={countMethods} skin={SKIN} user={USER} method={metodo.method_code} /> : <NoLogged /> } />
                </>
              )
            })}

            {countMethods.withdrawMethods.map(metodo=>{
              return (
                <>
                  <Route key={metodo.method_code} path={"/account/withdrawals/"+metodo.method_code} element={ isLogged ? <WithdrawMethod countMethods={countMethods} skin={SKIN} user={USER} method={metodo.method_code} /> : <NoLogged /> } />
                </>
              )
            })}

            { USER["username"]=="ale1" ?

              <>
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
              </>
              :
              <></>
            }

            <Route path="*" element={<Page404 />} />
          </Routes>
          
        </Router>

        <Footer
          skin={SKIN}
          providers={providers}
          methods={countMethods}
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