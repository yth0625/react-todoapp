import createHistory from 'history/createBrowserHistory';
import dateFormat from 'dateformat';

export function getCookie(name) {
    const value = document.cookie.match('(^|;) ?' + name + '=([^;]*)(;|$)');
    return value ? value[2] : null;
}

export function startSessionCheck() {
    let sessionChecking = setInterval(() => {
        if (!getCookie('userId')) {
            clearInterval(sessionChecking);
            browserHistory.push('/');
        }
    }, 1000);
}

export function deleteCookie(name) {
    document.cookie = name + '=; expires=Thu, 01 Jan 1970 00:00:01 GMT;';
}

export const browserHistory = createHistory({basename: window.basename});

browserHistory.listen((location, action) => {
    console.log(`The current URL is ${location.pathname}${location.search}${location.hash}`);
    console.log(`The last navigation action was ${action}`);
});

export function getDateToString(value) {
    let date = new Date(value);
    return dateFormat(date, 'isoDate');
}
