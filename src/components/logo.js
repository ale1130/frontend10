import React, {Component} from "react";

class Logo extends Component{
    render(){
        return(
            <h1 className="logo">
                <a href="">

                    <img src={this.props.logolink} />
                </a>
            </h1>
        );
    }
}

export default Logo;