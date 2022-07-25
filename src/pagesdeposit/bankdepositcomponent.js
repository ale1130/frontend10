import React from "react";
import { useTranslation } from "react-i18next";

export const ComponentBank = () =>{

    const { t, i18n } = useTranslation();

    return (
        <>
            <table width="100%" class="table table-bordered">
                <tbody>
                    <tr>
                        <td>
                    
                            <h2 class="virtual-title">{t('versamentocon')} Crypto</h2>
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