import React, { Component } from 'react';
import { Link, useParams } from "react-router-dom";

class Logout extends Component {

    openLogoutButton = (e) => {
        const logout_e = document.getElementById("logout_link");
        if (logout_e != null) {
                logout_e.style.display = "block";
                logout_e.style.marginLeft = "200px";
        }     
    }

    closeLogoutButton = (e) => {
        const logout_e = document.getElementById("logout_link");
        if (logout_e != null) {
            logout_e.style.display = "none";
            logout_e.style.marginLeft = "0px";
        }
    }

    click_logout = () => {
        localStorage.clear();
    }

    leaveButton = () => {
        const { username } = useParams();
        if (username) {
            return (
                <Link to="/" style={{ textDecoration: 'none' }} id="logout_link" className="link" onMouseOver={this.openLogoutButton} onMouseOut={this.closeLogoutButton} onClick={this.click_logout}>
                    Logout
                </Link>
            );
        }

    }

    render() {
        return (
            <div id="logout_bar">
                <this.leaveButton />
            </div>
        );
    }
}

export default Logout;