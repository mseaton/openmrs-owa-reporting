/*
 * This service contains functionality for managing the current state of the application
 * TOOD: Need to figure out how to avoid hard-coding the /openmrs into the path
 */

import React from 'react';
import {render} from 'react-dom';
import RestService from './RestService'

const SessionResourcePath = '/ws/rest/v1/session';

class AppService {

    getSession() {
        var promise = RestService.get(SessionResourcePath).then((response) => {
            if (response.status >= 200 && response.status < 300) {
                return response.json();
            }
            else {
                throw new Error(response.statusText);
            }
        }).then((json) => {
            return {
                authenticated: json.authenticated,
                user: json.user,
                sessionLocation: "emrContext.sessionLocationId"
            }
        });
        return promise;
    }

    redirectIfNotLoggedIn() {
        this.getSession().then((session) => {
            if (!session.authenticated) {
                document.location.href = RestService.getRootPath();
            }
        })
    }

    logout() {
        RestService.delete(SessionResourcePath).then((response) => {
            if (response.ok) {
                document.location.href = RestService.getRootPath();
            }
            else {
                throw new Error('Error while attempting to logout. ' + response.statusText);
            }
        });
    }

}

let appService = new AppService();
export default appService;