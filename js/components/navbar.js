import { createElement } from "../lib/createElement.js";
import { Router } from '../lib/router.js';
import { Button } from './ui/Button.js';

export const Navbar = (function() {
    

    function render() {
        const navLinks = createElement('div', {
            id: 'nav-links',
            style: {
                display: 'flex',
                gap: '10px',
                transition: 'max-height 0.3s ease',
            }
        },
            Button.createNavLink('Home', '/', 'rgba(255, 146, 146, 0.8)', 'rgba(250, 160, 160, 0.7)'),
            Button.createNavLink('SPDTools', '/tools', 'rgba(255, 127, 255, 0.8)', 'rgba(255, 127, 255, 0.4)'),
            Button.createNavLink('Recovery', '/recovery', 'rgba(127, 127, 255, 0.8)', 'rgba(127, 127, 255, 0.4)'),
            Button.createNavLink('About', '/about', 'rgba(127, 255, 212, 0.8)', 'rgba(127, 255, 212, 0.64)'),
            Button.createNavLink('Contact', '/contact', 'rgba(255, 217, 0, 1)', 'rgba(255, 217, 0, 0.65)')
        );

        const hamburger = createElement('div', {
            id: 'hamburger',
            style: {
                display: 'none',
                position: 'fixed',
                top: '20px',
                right: '20px',
                flexDirection: 'column',
                cursor: 'pointer',
                gap: '5px',
            },
            onclick: function() {
                const links = document.querySelector('#nav-links');
                if (links.style.display === 'flex' || links.style.display === '') {
                    links.style.display = 'none';
                } else {
                    links.style.display = 'flex';
                    links.style.flexDirection = 'column';
                    links.style.width = '100%';
                    links.style.alignItems = 'flex-start';
                }
            }
        },
            createElement('span', { style: { width: '25px', height: '3px', background: 'white', borderRadius: '2px' } }),
            createElement('span', { style: { width: '25px', height: '3px', background: 'white', borderRadius: '2px' } }),
            createElement('span', { style: { width: '25px', height: '3px', background: 'white', borderRadius: '2px' } }),
        );

        const nav = createElement('nav', {
            style: {
                background: 'rgba(255, 255, 255, 0)',
                backdropFilter: 'blur(10px)',
                padding: '20px 50px',
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                position: 'fixed',
                width: '100%',
                top: '0',
                zIndex: '1000',
                flexWrap: 'wrap',
            }
        },
            createElement('h1', {
                style: {
                    color: 'white',
                    fontSize: '18px',
                    fontWeight: 'bold',
                    cursor: 'pointer',
                    transition: 'all 0.3s ease',
                    textShadow: '0 0 10px rgba(255, 255, 255, 0.5)'
                },
                onclick: function() {
                    Router.navigate('/');
                },
                onmouseover: function() {
                    this.style.textShadow = `
                        0 0 10px rgba(255, 255, 255, 0.8),
                        0 0 20px rgba(255, 255, 255, 0.6),
                        0 0 30px rgba(255, 255, 255, 0.4)
                    `;
                    this.style.transform = 'scale(1.05)';
                },
                onmouseout: function() {
                    this.style.textShadow = '0 0 10px rgba(255, 255, 255, 0.5)';
                    this.style.transform = 'scale(1)';
                }
            }, 'UNISOC Community ID'),
            hamburger,
            navLinks
        );

        // Responsive behavior
        function handleResize() {
            if (window.innerWidth < 768) {
                hamburger.style.display = 'flex';
                navLinks.style.display = 'none';
                navLinks.style.flexDirection = 'column';
                navLinks.style.width = '100%';
                navLinks.style.marginTop = '10px';
            } else {
                hamburger.style.display = 'none';
                navLinks.style.marginTop = '0px';
                navLinks.style.width = '';
                navLinks.style.display = 'flex';
                navLinks.style.flexDirection = 'row';
            }
        }

        window.addEventListener('resize', handleResize);
        handleResize();

        return nav;
    }

    return { render };
})();
