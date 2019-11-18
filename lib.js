export default class Http {
    constructor(baseUrl) {
        this.baseUrl = baseUrl;
    }

    request(type, url, onSuccess, onError, body = null, headers = []) {
        const xhr = new XMLHttpRequest();
        switch (type) {
            case 'GET':
                xhr.open('GET', `${this.baseUrl}${url}`);
                break;

            case 'POST':
                xhr.open('POST', `${this.baseUrl}${url}`);
                break;

            case 'DELETE':
                xhr.open('DELETE', `${this.baseUrl}${url}`);
                break;
        }
        for (const header of headers) {
            xhr.setRequestHeader(header.name, header.value);
        }
        xhr.addEventListener('load', e => {
            if (e.currentTarget.status >= 200 && e.currentTarget.status < 300) {
                onSuccess(e);
                return;
            }
            onError();
        });
        xhr.addEventListener('error', onError);
        xhr.send(body);
    }
}