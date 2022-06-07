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

//import GetdataSkin from "./server/getdatas";

/*GetdataSkin(skinId,setValoreNuovoElemento).then(response => {
  console.log(response)
  
});*/

import Spinner from 'react-bootstrap/Spinner'

const skinId = (new URL(window.location.href)).searchParams.get('id');

function App(){

  const [datiSkin, setDatiSkin] = useState([]);

  const [showReg, setShowReg] = useState(false);

  const [show, setShow] = useState(false);

  const [pagina, setPagina]  = useState(<>

      {datiSkin}

      <Spinner animation="border" role="status">
        <span className="visually-hidden">Loading...</span>
      </Spinner>
    </>);

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
          setValoreNuovoElemento(0)

          setDatiSkin({datiskin : response.data[0]});
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

        console.log("Tutto pronto");
        console.log(datiSkin);
        clearInterval(downloadTimer);

        setPagina(
        <>
          {datiSkin.map(elemento =>
            <div>{elemento}</div>
          )}

          <Navbar
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

          <Footer />
        </>);

      }else{

        console.log("Continua caricamento");
      }

    }, 1000);

  },[]);

  return (
    pagina
  );

}

export default App;