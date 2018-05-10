import React, {Component} from "react";
import PropTypes from "prop-types";
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import AppBar from 'material-ui/AppBar';
import IconMenu from 'material-ui/IconMenu';
import MenuItem from 'material-ui/MenuItem';
import IconButton from 'material-ui/IconButton';
import Menu from 'material-ui/svg-icons/navigation/menu';
import SignOut from "material-ui/svg-icons/action/power-settings-new"

import "./AuthNavbar.css";

export default class AuthNavbar extends Component {
    render(){
        background = {
            backgroundColor: "#FFD31E"
        };
        titleLayout = {
            textAlign: "center"
        };
        return (
            <div>
                <MuiThemeProvider>
                    <AppBar
                        title={<img src="MinEmotionerLogo.PNG" alt="emotioner_min_logo"
                                    className="col-4 col-md-1 appbar-logo" onClick={this.props.goToIndex}/>}
                        iconElementLeft={<p> </p>}
                        titleStyle={titleLayout}
                        style={background}
                    />
                </MuiThemeProvider>
            </div>
        );
    }
}

AuthNavbar.propTypes = {
    goToIndex: PropTypes.func.isRequired
}