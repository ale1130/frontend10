import { t } from "i18next";
import React from "react";

function ComponentCryptoW (props){
    return (
        <>
            <table width="100%" class="table table-bordered">
                <tbody>
                    <tr>
                        <td>
                    
                            <h2 class="virtual-title">{t('prelievocon')} Crypto</h2>
                            <hr class="border-hr" />

                            <div class="col-md-12">
                                <div class="alert alert-warning">
                                    <div class="alert-text">
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

export {ComponentCryptoW}