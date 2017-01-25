/*
 * This service contains functionality for managing the current state of the application
 * TOOD: Need to figure out how to avoid hard-coding the /openmrs into the path
 */

import React from 'react';
import {render} from 'react-dom';
import update from 'react-addons-update';

class RestService {

    getRootPath() {
        return "/openmrs";
    }

    getPath(path) {
        if (path.startsWith(this.getRootPath())) {
            return path;
        }
        if (!path.startsWith("/")) {
            path = "/" + path;
        }
        return this.getRootPath() + path;
    }

    get(resource, config) {
        let defaultConfig = {
            method: 'GET',
            credentials: 'same-origin',
            Accept: 'application/json'
        };
        let newConfig = update(defaultConfig, (config || {}));
        return fetch(this.getPath(resource), newConfig);
    }

    delete(resource, config) {
        let defaultConfig = {
            method: 'DELETE',
            credentials: 'same-origin',
            Accept: 'application/json'
        };
        let newConfig = update(defaultConfig, (config || {}));
        return fetch(this.getPath(resource), newConfig);
    }
}

let restService = new RestService();
export default restService;