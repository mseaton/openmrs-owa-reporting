/*
 * This service contains functionality for managing the current state of the application
 * TOOD: Need to figure out how to avoid hard-coding the /openmrs into the path
 */

import React from 'react';
import {render} from 'react-dom';
import RestService from './RestService'

const SessionResourcePath = '/ws/rest/v1/session';
const AppUiSessionResourcePath = '/ws/rest/v1/appui/session'

class AppService {

    getSession() {

        // First try to get session data from appui session resource, fall back to default session resource

        var promise = RestService.get(AppUiSessionResourcePath).then((appuiResponse) => {
            if (appuiResponse.status >= 200 && appuiResponse.status < 300) {
                return appuiResponse.json();
            }
            else {
                return RestService.get(SessionResourcePath).then((sessionResponse) => {
                    if (sessionResponse.status >= 200 && sessionResponse.status < 300) {
                        return sessionResponse.json();
                    }
                    else {
                        throw new Error(sessionResponse.statusText);
                    }
                });
            }
        }).then((json) => {
            return {
                authenticated: json.authenticated,
                user: json.user,
                location: json.sessionLocation
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