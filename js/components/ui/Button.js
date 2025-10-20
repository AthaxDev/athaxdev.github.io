import { createElement } from "../../lib/createElement.js";
import { Router } from '../../lib/router.js';

export const Button = (function() {
    function create(props) {
        const {
            text = 'Button',
            onClick = () => {},
            variant = 'primary',
            size = 'medium'
        } = props;

        const variants = {
            primary: { background: '#10b981', color: 'white' },
            danger: { background: '#ef4444', color: 'white' },
            secondary: { background: '#6366f1', color: 'white' },
            outline: { background: 'transparent', color: 'white', border: '2px solid white' }
        };

        const sizes = {
            small: { padding: '10px 20px', fontSize: '14px' },
            medium: { padding: '15px 30px', fontSize: '18px' },
            large: { padding: '20px 40px', fontSize: '20px' }
        };

        return createElement('button', {
            style: {
                ...variants[variant],
                ...sizes[size],
                border: variants[variant].border || 'none',
                borderRadius: '10px',
                cursor: 'pointer',
                transition: 'transform 0.2s',
                fontWeight: 'bold'
            },
            onclick: onClick,
            onmouseover: function() { this.style.transform = 'scale(1.05)'; },
            onmouseout: function() { this.style.transform = 'scale(1)'; }
        }, text);
    }

    function createNavLink(text, path, color1 = 'rgba(139, 92, 246, 0.6)', color2 = 'rgba(139, 92, 246, 0.3)') {
        const isActive = Router.getCurrentRoute() === path;
        return createElement('a', {
            href: '#' + path,
            style: {
                color: 'white',
                textDecoration: 'none',
                fontSize: '16px',
                transition: 'all 0.3s ease',
                padding: '8px 16px',
                borderRadius: '8px',
                background: isActive ? 'rgba(255, 255, 255, 0)' : 'transparent',
                position: 'relative',
                display: 'block',
            },
            onclick: function(e) {
                e.preventDefault();
                Router.navigate(path);
                if (window.innerWidth < 768) {
                    document.querySelector('#nav-links').style.display = 'none';
                }
            },
            onmouseover: function() { 
                if (!isActive) {
                    this.style.boxShadow = `
                        0 0 8px ${color1},
                        0 0 15px ${color1},
                        0 0 25px ${color2},
                        0 0 35px ${color2}
                    `;
                    this.style.background = color1;
                    this.style.transform = 'translateY(-2px)';
                } else {
                    this.style.boxShadow = `
                        0 0 15px ${color1},
                        0 0 25px ${color1},
                        0 0 35px ${color2},
                        0 0 50px ${color2}
                    `;
                    this.style.background = color1;
                    this.style.transform = 'translateY(-2px)';
                }
            },
            onmouseout: function() { 
                this.style.boxShadow = '0 0 0px transparent';
                this.style.background = 'transparent';
                this.style.transform = 'translateY(0)';
            }
        }, text);
    }

    function createLink(text, path, color1 = 'rgba(139, 92, 246, 0.6)', color2 = 'rgba(139, 92, 246, 0.3)') {
        const isActive = Router.getCurrentRoute() === path;
        return createElement('a', {
            href: path,
            style: {
                color: 'white',
                textDecoration: 'none',
                fontSize: '16px',
                transition: 'all 0.3s ease',
                padding: '8px 16px',
                borderRadius: '8px',
                background: isActive ? 'rgba(255, 255, 255, 0)' : 'transparent',
                position: 'relative',
                display: 'block',
            },
            onclick: function(e) {
                e.preventDefault();
                window.open(path);
            },
            onmouseover: function() { 
                if (!isActive) {
                    this.style.boxShadow = `
                        0 0 8px ${color1},
                        0 0 15px ${color1},
                        0 0 25px ${color2},
                        0 0 35px ${color2}
                    `;
                    this.style.background = color1;
                    this.style.transform = 'translateY(-2px)';
                } else {
                    this.style.boxShadow = `
                        0 0 15px ${color1},
                        0 0 25px ${color1},
                        0 0 35px ${color2},
                        0 0 50px ${color2}
                    `;
                    this.style.background = color1;
                    this.style.transform = 'translateY(-2px)';
                }
            },
            onmouseout: function() { 
                this.style.boxShadow = '0 0 0px transparent';
                this.style.background = 'transparent';
                this.style.transform = 'translateY(0)';
            }
        }, text);
    }

    return { create, createNavLink, createLink };
})();