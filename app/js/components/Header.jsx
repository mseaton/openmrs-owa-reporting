import React from 'react';

import logoSmall from '../../img/openmrs-with-title-small.png';
import AppService from '../services/AppService';

/**
 * TODO:  Implement ability to change location or view user profile details
 * TODO:  Localize text
 */

function HeaderLogo(props) {
    return (
        <div className="logo">
            <a href="../../">
                <img src={logoSmall} />
            </a>
        </div>
    );
}

class CurrentUserLink extends React.Component {

    constructor() {
        super();
        this.state = {
            user: undefined
        };
    }

    componentWillMount() {
        AppService.redirectIfNotLoggedIn();
    }

    componentDidMount() {
        var self = this;
        AppService.getSession().then((session) => {
            self.setState({
                user: session.user.display
            })
        });
    }

    render() {
        return (
            <li className="identifier">
                <i className="icon-user small"></i>
                {this.state.user}
            </li>
        );
    }
}

class SessionLocationLink extends React.Component {

    constructor() {
        super();
        this.state = {
            location: undefined
        };
    }

    componentDidMount() {
        var self = this;
        AppService.getSession().then((session) => {
            if (session.location) {
                self.setState({
                    location: session.location.display
                })
            }
        });
    }

    render() {
        if (this.state.location) {
            return (
                <li className="change-location">
                    <i className="icon-map-marker small"></i>
                    {this.state.location}
                </li>
            );
        }
        else {
            return null;
        }
    }
}

function LogoutLink(props) {
    return (
        <li className="logout">
            <a href="#" onClick={(evt) => AppService.logout()}>
                Logout
                <i className="icon-signout small"></i>
            </a>
        </li>
    );
}

export default class Header extends React.Component {
    render() {
        return (
            <header>
                <HeaderLogo/>
                <ul className="user-options">
                    <CurrentUserLink />
                    <SessionLocationLink />
                    <LogoutLink />
                </ul>
            </header>
        );
    }
}