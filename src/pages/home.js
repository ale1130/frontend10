import React from "react";

import ControlledCarousel from "../components/slider.js";

function Home (props){

    return (
        <>
            <ControlledCarousel 
                openForm={() => props.setShowC()}
                isLogged={props.statoLogin}
                immagini={props.immagini}
                skin={props.skin}
            />  
        </>
    )
}

export default Home;


        