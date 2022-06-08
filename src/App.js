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
import {Logo} from './components/logo';
import LoginModal from "./components/loginmodal";
import RegistrationModal from "./components/registration";

import ControlledCarousel from "./components/slider";
import 'bootstrap/dist/css/bootstrap.min.css';

import Spinner from 'react-bootstrap/Spinner'

const skinId = (new URL(window.location.href)).searchParams.get('id');

function App(){

  const logoDirectory = "https://media.betzonelab.com/skins/logo/";

  const [datiSkin, setDatiSkin] = useState([]);

  const [showReg, setShowReg] = useState(false);

  const [show, setShow] = useState(false);

  const [pagina, setPagina]  = useState(
    <>
      <Spinner animation="border" role="status">
        <span className="visually-hidden">Loading...</span>
      </Spinner>
    </>
  );

  const [elements, setElements] = useState([
    {
      valore :0, nome:'infoSkin'
    },
  ]);

  const setValoreNuovoElemento = (index) => {
    let newArr = elements;
    newArr [index].valore = 1;
    setElements(newArr);
  }

  const GetdataSkin = async () =>{

    try{

      const data = await axios
      .post('http://localhost:3001/getdataskin',{skinid : skinId})
      .then(response => {
        
        setDatiSkin(response.data[0]);
        setValoreNuovoElemento(0);
      });
    }catch (e){

      console.log(e);
    }
  };

  useEffect(() => {
    GetdataSkin();
  },[]);

  var approvato = 0;
  const nApprovazioni = elements.length;

  useEffect(() => {

    var downloadTimer = setInterval(function(){

      elements.map(elemento =>
        {
          if(elemento.valore===1){
            approvato++;
          }
        }
      )
    
      if(approvato>=nApprovazioni){

        clearInterval(downloadTimer);

        var oggettoDati = [];

        const objectArray = Object.entries(datiSkin);

        objectArray.forEach(([key, value]) => {
          oggettoDati[key] = value;
        });

        setPagina(
        <>
          
          <Navbar
            logo={logoDirectory+oggettoDati["logo_img"]}
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
            logo={logoDirectory+oggettoDati["logo_img"]}
            footer_text={oggettoDati["footer_text"]}
          />
        </>);
      }

    }, 1000);

  },[datiSkin]);

  return (
    pagina
  );

}

export default App;