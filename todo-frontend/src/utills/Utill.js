import createHistory from 'history/createBrowserHistory';

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

export const browserHistory = createHistory({basename: window.basename});

browserHistory.listen((location, action) => {
    console.log(`The current URL is ${location.pathname}${location.search}${location.hash}`);
    console.log(`The last navigation action was ${action}`);
});
