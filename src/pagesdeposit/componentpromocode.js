import React from "react"

function PromoCode (props){

    const inputs = props.inputs;

    return (
        <>
            <div className="col-md-12">

                <hr className="border-hr" />

                <input type="checkbox" name="have_promocode" id="have_promocode" onChange={() => props.handleChangePromocode()} checked={inputs.have_promocode == 1 ? "checked" : ""} /> <label htmlFor="have_promocode">Hai un codice promozionale?</label>

                <div className="row" hidden={inputs.have_promocode==1 ? "" : "hidden"}>
                    <div className="col-sm-12" id="promocode-box">

                        <input type="text" name="promocode" onChange={event => props.handleChange(event)} value={inputs.promocode || ""} className="form-control" id="promocode" placeholder="Inserisci qui il codice promozionale" />
                    </div>
                </div>

            </div>
        </>
    )
}

export {PromoCode}