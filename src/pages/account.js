import React from "react";

import { convertDate } from "../constants/global";

import { useTranslation } from "react-i18next";

import { LogOut } from "../constants/global";

function Account (props){

    const { t, i18n } = useTranslation();

    const USER = props.datiUtente;

    const currency = USER["currency"];

    const saldo_totale = USER["balance"]+USER["balance_withdrawable"]+USER["bonus"];

    const currentPage2 = props.paginaAttuale;

    return (
        <>
            <div className="container-fluid body-content">
                <div className="row">
                    <div className="col-md-12 col-lg-3">

                        <div className="box-balance">
                            <h2>{t('dettagliosaldo')}	</h2>

                            <div><span className="elemento-voce">{t('saldototale')}</span>
                            <strong>{saldo_totale+" "+currency}</strong></div>

                            <div><span className="elemento-voce">{t('saldoprelevabile')}</span>
                            <strong>{USER["balance_withdrawable"]+" "+currency}</strong></div>

                            <div><span className="elemento-voce">{t('saldononprelevabile')}</span> <br/>
                            <strong>{USER["balance"]+" "+currency}</strong></div>

                            <div><span className="elemento-voce">{t('bonus')}</span> <br/>
                            <strong>{USER["bonus"]+" "+currency}</strong></div>
                        </div>


                        <div className="box-account-button">
                        
                            <h2>
                                {t('tuoconto')}			          
                            </h2>
                            
                            <div>
                                <a href='/account/deposit'>
                                    <div id="deposit" className={currentPage2=="deposit" ? "selezionato" : ""} >
                                        {t('deposit')}	         
                                    </div>
                                </a>  

                                <a href='/account/withdrawals'>
                                    <div id="withdrawals" className={currentPage2=="withdrawals" ? "selezionato" : ""} >    
                                        {t('withdrawals')}	                    
                                    </div>
                                </a> 

                                <a href='/account/voucher'>
                                    <div id="voucher" className={currentPage2=="voucher" ? "selezionato" : ""} >
                                        {t('voucher')}	          
                                    </div>
                                </a>   

                                <a href='/account/transactions'>
                                    <div id="transactions" className={currentPage2=="transactions" ? "selezionato" : ""} >
                                        {t('transactions')}	          
                                    </div>
                                </a>   

                                <a href='/account/coupons'>
                                    <div id="coupons" className={currentPage2=="coupons" ? "selezionato" : ""} >
                                        {t('coupons')}	          
                                    </div>
                                </a>   

                                <a href='/account/bonus'>
                                    <div id="bonus" className={currentPage2=="bonus" ? "selezionato" : ""} >
                                        {t('bonus')}	          
                                    </div>
                                </a>   

                                <h2>
                                    {t('altreoperazioni')}			          
                                </h2>

                                <a href='/account/withdrawals_requests'>
                                    <div id="withdrawals_requests" className={currentPage2=="withdrawals_requests" ? "selezionato" : ""} >
                                        {t('withdrawals_requests')}	          
                                    </div>
                                </a>   

                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Account;
