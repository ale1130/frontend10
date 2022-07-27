import React from 'react';

import 'bootstrap/dist/css/bootstrap.min.css';
import Spinner from 'react-bootstrap/Spinner';

export const Loader = () =>{
    return (
        <Spinner animation="border" role="status">
            <span className="visually-hidden">Loading...</span>
        </Spinner>
    );
}

export const LoaderFetch = (div) =>{
    return (<div name="divCaricmamento"
        style={{
            width: "100%",
            height: "100%",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            position: "fixed",
            top:"0px",
            left:"0px",
            background:"#333",
            zIndex:"1000"
        }}
    >
     
    </div>);
}