import React from 'react';

import logoSmall from '../../img/openmrs-with-title-small.png';
import AppService from '../services/AppService';

/**
 * TODO:  Implement population of currently logged in user and session location
 * TODO:  Implement correct logout behavior
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
            self.setState({
                location: session.sessionLocation
            })
        });
    }

    render() {
        return (
            <li className="change-location">
                <i className="icon-map-marker small"></i>
                {this.state.location}
            </li>
        );
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