import React, { useState } from "react";
import Modal from "react-modal";

Modal.setAppElement("#root");

function RegistrationModal(props) {

    const close = props.closeModal;

    return (
        <>
            <Modal isOpen={true} onRequestClose={close} className="mymodal" overlayClassName="myoverlay">
                <div className="row">
                    <div className="col-sm-4">
                        <h1 className="title-sport">
                            Promotion</h1>
                        <div className="card style-card">
                            <img className="card-img-top" src="https://media.betzonelab.com/promotions/welcome-50_6218f82ca1eaa.jpeg" alt="WELCOME 50">
                                <div className="card-body">
                                    <h5>WELCOME 50</h5>
                                    <p>Bonus di benvenuto 50% sul tuo primo deposito online fino a €200</p>
                                </div>
                        </div>
                    </div>
                    <div className="col-sm-8">
                        <form id="signupForm" method="post" className="form-signUp clearForm">


                            <div className="row">
                                <div className="col-sm-6 pd-r-2">
                                    <label className="color-top" for="firstname">First name</label>
                                    <input type="text" className="form-control margin-bottom-5" id="firstname" name="firstname" placeholder="*First name">
                                </div>
                                <div className="col-sm-6 pd-l-2">
                                    <label className="color-top" for="lastname">Surname</label>
                                    <input type="text" className="form-control margin-bottom-5" id="lastname" name="lastname" placeholder="*Surname">
                                </div>
                                <div className="col-sm-6 pd-r-2">
                                    <label className="color-top" for="email">E-mail</label>
                                    <input type="email" className="form-control margin-bottom-5" id="email" name="email" placeholder="*E-mail">
                                </div>
                                <div className="col-sm-6 pd-l-2">
                                    <label className="color-top" for="mobile">Mobile number</label>
                                    <input type="text" value="" className="form-control margin-bottom-5" id="mobile" name="mobile" placeholder="*Mobile number">
                                </div>
                            </div>
                            <div className="row">
                                <div className="col-sm-12" id="div_country_residence">
                                    <label className="color-top" for="country_residence">Country of residence</label>
                                    <select id="country_residence" name="country_residence" className="form-control margin-bottom-5">
                                        <option value="AF">Afghanistan</option>

                                    </select>
                                </div>

                                <div className="col-sm-6 pd-r-2 geo_residence_italy" id="div_province_residence">
                                    <label className="color-top" for="province_residence">Province of residence</label>
                                    <select id="province_residence" name="province_residence" className="form-control margin-bottom-5">
                                        <option value="">Province of residence</option>
                                        <option value="84">Agrigento</option>
                                        <option value="6">Alessandria</option>
                                        <option value="42">Ancona</option>

                                    </select>
                                </div>
                                <div className="col-sm-6 pd-l-2 geo_residence_italy" id="city_residence">
                                    <label className="color-top" for="city_residence">City of residence</label>
                                    <span id="residence_selprovmsg">
                                        <select className="form-control margin-bottom-5" name="" disabled="" id="city_residence"><option value="">City of residence</option></select>
                                    </span>

                                </div>


                                <div className="col-sm-6 pd-r-2 geo_residence_estero" id="div_province_residence_estera" >
                                    <label className="color-top" for="province_text_residence">Province of residence</label>
                                    <input type="text" className="form-control margin-bottom-5" name="province_text_residence" autocomplete="off" value="" id="province_text_residence" placeholder="Province of residence">
                                </div>
                                <div className="col-sm-6 pd-l-2 geo_residence_estero" id="city_text_residence" >
                                    <label className="color-top" for="city_text_residence">City of residence</label>
                                    <input type="text" className="form-control margin-bottom-5" name="city_text_residence" autocomplete="off" value="" id="cliente_city_residence_estera" placeholder="City of residence">
                                </div>

                            </div>
                            <div className="row">
                                <div className="col-sm-8 pd-r-2">
                                    <label className="color-top" for="address_residence">Residence address</label>
                                    <input type="text" className="form-control margin-bottom-5" id="address_residence" name="address_residence" placeholder="*Residence address">
                                </div>
                                <div className="col-sm-4 pd-l-2">
                                    <label className="color-top" for="zip_residence">Postal code of residence</label>
                                    <input type="text" className="form-control margin-bottom-5" id="zip_residence" name="zip_residence" placeholder="*Postal code of residence">
                                </div>
                            </div>
                            <div className="row">
                                <div className="col-sm-12" id="div_cliente_nazione">
                                    <label className="color-top" for="cliente_nazione">Country of birth</label>
                                    <select id="cliente_nazione" name="country" className="form-control margin-bottom-5">
                                        <option value="AF">Afghanistan</option>
                                        <option value="AL">Albania</option>
                                        <option value="DZ">Algeria</option>

                                    </select>
                                </div>

                                <div className="col-sm-6 pd-r-2 geo_italy" id="div_cliente_provincia">
                                    <label className="color-top" for="cliente_provincia">Province of birth</label>
                                    <select id="cliente_provincia" name="province" className="form-control margin-bottom-5">
                                        <option value="">Province of birth</option>
                                        <option value="84">Agrigento</option>
                                        rno</option>

                                    <option value="67">Teramo</option>

                                </select>
                            </div>
                            <div className="col-sm-6 pd-l-2 geo_italy" id="div_cliente_citta">
                                <label className="color-top" for="citta">City of Birth</label>
                                <span id="selprovmsg">
                                    <select className="form-control margin-bottom-5" name="" disabled="" id="citta"><option value="">City of Birth</option></select>
                                </span>

                            </div>


                            <div className="col-sm-6 pd-r-2 geo_estero" id="div_cliente_provincia_estera" >
                                <label className="color-top" for="cliente_provincia_estera">Province of birth</label>
                                <input type="text" className="form-control margin-bottom-5" name="province_text" autocomplete="off" value="" id="cliente_provincia_estera" placeholder="Province of birth">
                            </div>
                            <div className="col-sm-6 pd-l-2 geo_estero" id="div_cliente_citta_estera" >
                                <label className="color-top" for="cliente_citta_estera">City of Birth</label>
                                <input type="text" className="form-control margin-bottom-5" name="city_text" autocomplete="off" value="" id="cliente_citta_estera" placeholder="City of Birth">
                            </div>

                    </div>
                    <div className="birthday_box">
                        <div className="row">
                            <div className="col-sm-6 pd-l-2">
                                <div className="row margin-regulation">
                                    <div className="col-12">
                                        <label className="color-top" for="birthday_giorno">Date of birth</label>
                                    </div>
                                    <div className="col-4 pd-r-2">
                                        <select className="form-control margin-bottom-5" name="birthday_giorno" id="birthday_giorno">
                                            <option value="1">1</option>

                                        </select>
                                    </div>
                                    <div className="col-4 pd-l-2 pd-r-2">
                                        <select className="form-control margin-bottom-5" name="birthday_mese" id="birthday_mese">
                                            <option value="1">1</option>

                                        </select>
                                    </div>
                                    <div className="col-4 pd-l-2 pd-r-2">
                                        <select className="form-control margin-bottom-5" name="birthday_anno" id="birthday_anno">
                                            <option value="2012">2012</option>

                                        </select>
                                    </div>
                                </div>
                            </div>
                            <div className="col-sm-6 pd-l-2">
                                <label className="color-top" for="sesso">Sex</label>
                                <select className="form-control margin-bottom-5" name="sesso" id="sesso">
                                    <option value="m">Male</option>
                                    <option value="f">Female</option>
                                </select>
                            </div>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-sm-12" id="fiscal_code_area">
                            <label className="color-top" for="sesso">Fiscal Code</label>
                            <div className="input-group  margin-bottom-5">
                                <input type="text" className="form-control" name="fiscal_code" id="fiscal_code" placeholder="*Fiscal Code" aria-label="Fiscal Code" aria-describedby="basic-addon1">
                                    <div className="input-group-append">
                                        <span className="input-group-text" id="basic-addon1">
                                            <a href="javascript:void(0)" onclick="calcolaCodiceFiscale()"><span className="fa fa-calculator"></span></a>
                                        </span>
                                    </div>
                            </div>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-sm-6 pd-r-2">
                            <label className="color-top" for="document_type">Document type</label>
                            <select name="document_type" id="document_type" className="form-control margin-bottom-5">
                                <option value="identity_card">Identity card</option>
                                <option value="passport">Passport</option>
                                <option value="drivers_license">Driving license</option>
                                <option value="cpf">CPF</option>
                            </select>
                        </div>
                        <div className="col-sm-6 pd-l-2">
                            <label className="color-top" for="document_number">Document number</label>
                            <input type="text" className="form-control margin-bottom-5" id="document_number" name="document_number" placeholder="*Document number">
                        </div>
                    </div>
                    <div className="row margin-regulation2">
                        <div className="col-sm-12 pd-l-2 pd-r-2">
                            <label className="color-top" for="agent_id">Promoter code</label>
                            <input type="text" value="" className="form-control margin-bottom-5" id="agent_id" name="agent_id" placeholder="Promoter code">
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-sm-6 pd-r-2">
                            <label className="color-top" for="username">Username</label>
                            <input type="text" className="form-control margin-bottom-5" id="username" name="username" placeholder="*Username">
                        </div>
                        <div className="col-sm-6 pd-l-2">
                            <label className="color-top" for="password">Password</label>
                            <input type="password" className="form-control margin-bottom-5" id="password" name="password" placeholder="*Password">
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-sm-4 pd-r-2">
                            <input className="form-check-input" type="checkbox" name="terms_conditions" id="terms_conditions">
                                <label className="form-check-label" for="terms_conditions" >
                                    * I have more than 18 years </label>
                        </div>
                        <div className="col-sm-8 pd-l-2">
                            <input className="form-check-input" type="checkbox" name="18years" id="18years">
                                <label className="form-check-label" for="18years">
                                    *&nbsp;<a href="javascript:help_popup('/help/index.php?id=2')">Terms and conditions</a> and <a href="javascript:help_popup('/help/index.php?id=1')">Privacy Policy</a> are accepted
                                </label>
                        </div>
                    </div>
                    <button type="submit" className="login">Sign in </button>
                    <p>Do you already have an account? <a onclick="openSignIn()" href="javascript:void(0)">Sign in now</a></p>
                </form>
            </div>
        </div >
        </Modal >
        </>
    );
}

export default RegistrationModal;