import { LoaderDOM } from './loaderDom.js';

let routes = {};
let currentRoute = '';

export const Router = {
    register(path, component) {
        routes[path] = component;
    },
    navigate(path) {
        if (routes[path]) {
            currentRoute = path;
            window.location.hash = path;
            LoaderDOM.load('app', routes[path]);
        } else {
            console.error(`Route "${path}" not found`);
        }
    },
    init() {
        window.addEventListener('hashchange', () => {
            const hash = window.location.hash.slice(1) || '/';
            if (routes[hash]) {
                currentRoute = hash;
                LoaderDOM.load('app', routes[hash]);
            }
        });

        const hash = window.location.hash.slice(1) || '/';
        if (routes[hash]) {
            currentRoute = hash;
            LoaderDOM.load('app', routes[hash]);
        } else {
            currentRoute = '/';
            LoaderDOM.load('app', routes['/']);
        }
    },
    getCurrentRoute() {
        return currentRoute;
    }
};