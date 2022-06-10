import React, {useState} from "react";

import ControlledCarousel from "../components/slider.js";

function Home (props){

    return (
        <>
            <ControlledCarousel 
                openForm={() => props.setShowC()}
                isLogged={props.statoLogin}
            />  
        </>
    )
}

export default Home;


        