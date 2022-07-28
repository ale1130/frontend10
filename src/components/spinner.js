import React from 'react';

import 'bootstrap/dist/css/bootstrap.min.css';
import Spinner from 'react-bootstrap/Spinner';
import { SkinName } from '../constants/global';

export const Loader = () =>{
    return (
        <Spinner animation="border" role="status">
            <span>{SkinName}</span>
        </Spinner>
    );
}
