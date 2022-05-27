import React, {Component} from "react";

class Logo extends Component{
    render(){
        return(
            <img src={this.props.logolink} />
        );
    }
}

export default Logo;