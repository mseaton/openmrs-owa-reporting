import React from 'react';

import logoSmall from '../../img/openmrs-with-title-small.png';

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

function UserLink(props) {
    return (
        <li className="identifier">
            <i className="icon-user small"></i>
            Username
        </li>
    );
}

function LocationLink(props) {
    return (
        <li className="change-location">
            <i className="icon-map-marker small"></i>
            Location
        </li>
    );
}

function LogoutLink(props) {
    return (
        <li className="logout">
            <a href="/openmrs/appui/header/logout.action?successUrl=openmrs">
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
                    <UserLink />
                    <LocationLink />
                    <LogoutLink />
                </ul>
            </header>
        );
    }
}