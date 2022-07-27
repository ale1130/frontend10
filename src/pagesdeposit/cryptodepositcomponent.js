import { t } from "i18next";
import React from "react";

function ComponentCrypto (props){
    return (
        <>
            <table width="100%" className="table table-bordered">
                <tbody>
                    <tr>
                        <td>
                    
                            <h2 className="virtual-title">{t('versamentocon')} Crypto</h2>
                            <hr className="border-hr" />

                            <div className="col-md-12">
                                <div className="alert alert-warning">
                                    <div className="alert-text">
                                        {t('metodosospeso')}
                                    </div>
                                </div>
                            </div>
                        </td>
                    </tr>
                </tbody>
            </table>
        </>
    )
}

export {ComponentCrypto}