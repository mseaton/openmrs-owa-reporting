/*
 * This service contains functionality for managing the current state of the application
 * TOOD: Need to figure out how to avoid hard-coding the /openmrs into the path
 */
class AppService {

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

    logout() {
        var promise = fetch(this.getPath('/ws/rest/v1/session'), {
            method: 'DELETE',
            credentials: 'same-origin',
            Accept: 'application/json'
        })
            .then((response) => {
                if (response.ok) {
                    document.location.href = this.getRootPath();
                }
                throw new Error('Error while attempting to logout. ' + response.statusText);
            })
    }

    getSession() {
        var promise = fetch(this.getPath('/ws/rest/v1/session'), {
            credentials: 'same-origin',
            Accept: 'application/json'
        })
            .then((response) => {
                if (response.status >= 200 && response.status < 300) {
                    return response.json();
                }
                else {
                    throw new Error(response.statusText);
                }
            })
        return promise;
    }

}

let appService = new AppService();
export default appService;