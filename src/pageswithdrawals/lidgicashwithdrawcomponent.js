import React from "react";

import { useTranslation } from "react-i18next";

function ComponentLidgicashW (props){

    const { t, i18n } = useTranslation();

    return (
        <>
            <table width="100%" className="table table-bordered">
                <tbody>
                    <tr>
                        <td>
                    
                            <h2 className="virtual-title">{t('prelievocon')} Crypto</h2>
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

export {ComponentLidgicashW}