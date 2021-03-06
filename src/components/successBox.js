import React from "react";

function SuccessBox (props){

    const param = props.param ? props.param : '';

    return (
        <>
            <div className="row">
                <div className="col-12">
                    <div className="alert alert-success" role="alert" id="saveProfileFormSuccess">
                        <div className="alert-text">
                            <div className="" id="saveProfileFormSuccessText">{props.message} {param}</div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default SuccessBox;
