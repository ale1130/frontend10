import React from "react";

function ComponentPix(props) {
    return (
        <>
            <table className="table table-bordered">
                <tbody>
                    <tr>
                        <td>
                            <h2 className="virtual-title">Versamento con Pix - Starspay</h2>
                            <hr className="border-hr" />

                            <div className="row">
                                <div className="col-md-3">
                                    <img src="https://stagemedia.gamesolutions.org/deposit/img/13.png" />
                                </div>
                                <div className="col-md-9">
                                    PIX è un nuovo metodo di pagamento in Brasile per effettuare bonifici bancari diretti e istantanei, creato e di proprietà della Central Bank e utilizzato dalle banche brasiliane, dai conti digitali e dai wallet.
                                </div>
                            </div>
                            <div className="row">

                                <div className="col-sm-4">

                                    <input type="hidden" name="method" value="pix" />

                                    <label htmlFor="amount" className="color-top">
                                        <strong>Importo da versare</strong> Importo minimo: 5.00 EUR
                                    </label>

                                    <input type="text" name="amount" autoComplete="off" className="form-control margin-bottom-5" id="amount" placeholder="Inserisci qui l'importo" />


                                </div>


                                <div className="col-sm-4">


                                    <label htmlFor="amount" className="color-top"><strong>Inserisci il tuo cpf</strong></label>

                                    <input type="text" value="010.237.702-29" name="cpf" autoComplete="off" className="form-control margin-bottom-5" id="cpf" placeholder="Inserisci il tuo cpf" maxLength="14" />


                                </div>

                                <div className="col-sm-4">
                                    <button type="submit" className="login">Procedi al pagamento <i className="fa fa-angle-right"></i></button>
                                </div>

                                <div className="col-md-12">
                                    <hr className="border-hr" />
                                    <input type="checkbox" name="have_promocode" id="have_promocode" checked="" disabled="" value="0" /> <label htmlFor="have_promocode">Hai un codice promozionale?</label>
                                    <input type="hidden" id="have_promocode" name="have_promocode" value="1" />
                                    <div className="row">
                                        <div className="col-sm-12" id="promocode-box">
                                            <input type="text" name="promocode" autoComplete="off" readOnly="" value="WEL" className="form-control" id="promocode" placeholder="Inserisci qui il codice promozionale" />
                                        </div>
                                    </div>


                                </div>
                            </div>





                        </td>
                    </tr>
                </tbody></table>
        </>
    )
}

export { ComponentPix }