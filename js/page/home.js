import { createElement } from '../lib/createElement.js';
import { Navbar } from '../components/navbar.js';
import { Footer } from '../components/footer.js';
import { Section } from '../components/ui/Section.js';
import { Card } from '../components/ui/Card.js';
import { Button } from '../components/ui/Button.js';


export const HomePage = (function() {
    let state = {
        count: 0
    };

    function render() {

        return createElement('div', { 
            class: 'fade-in',
            style: {
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
            },
            },
            Navbar.render(),
            createElement('img', {
                src: './assets/icon.ico',
                style: {
                    width: '40vw',
                    marginTop: '100px',
                    maxWidth: '200px',
                }
            }, ),
            Section.create({
                title: "UNISOC Community ID",
                subtitle: 'Delivered Tools & Custom Recovery For UNISOC Devices. Developed on INDONESIA',
                textAlign: 'center',
                children: [
                    createElement('div', {
                        style: {
                            display: 'flex',
                            flexWrap: 'wrap',
                            justifyContent: 'center',
                            gap: '10px'
                        }
                    },
                        Button.createLink('Telegram Channel', 'https://t.me/forumitelindonesia', '#00d0ecff', '#008cffff'),
                        Button.createNavLink('Get SPDTools', '/tools', 'rgba(100, 121, 255, 0.8)', 'rgba(162, 175, 255, 0.82)'),
                        Button.createNavLink('Custom Recovery', '/recovery', 'rgba(255, 127, 127, 0.87)', 'rgba(255, 127, 127, 0.58)'),

                    )
                ]
            }),
            Footer.render()
        );
    }
    


    return { render };
})();
