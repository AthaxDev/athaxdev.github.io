import { createElement } from '../lib/createElement.js';
import { Navbar } from '../components/navbar.js';
import { Footer } from '../components/footer.js';
import { Section } from '../components/ui/Section.js';
import { Card } from '../components/ui/Card.js';
import { Container } from '../components/ui/Container.js';
export const AboutPage = (function() {
            function render() {
                return createElement('div', { class: 'fade-in' },
                    Navbar.render(),
                    Section.create({
                        title: 'About SFDTools',
                        textAlign: 'center',
                        children: [
                            Container.create({
                                maxWidth: '900px',
                                padding: '0',
                                children: [
                                    Card.create({
                                        children: [
                                            createElement('h3', {
                                                style: {
                                                    fontSize: '28px',
                                                    marginBottom: '20px',
                                                    color: 'white'
                                                }
                                            }, '🚀 What is UNISOC Community ID?'),
                                            createElement('p', {
                                                style: {
                                                    fontSize: '18px',
                                                    lineHeight: '1.8',
                                                    marginBottom: '20px',
                                                    color: 'white'
                                                }
                                            }, 'UNISOC Community ID where you find a user of UNISOC Devices helping each and other for unlocking bootloader, rooting phone, custom rom, custom recovery, etc.'),
                                            createElement('p', {
                                                style: {
                                                    fontSize: '18px',
                                                    lineHeight: '1.8',
                                                    color: 'white'
                                                }
                                            }, 'This project is based on Python & C/C++ Based and source of the Project SPDTools is from TomKing062. Thank You so much TomKing062.')
                                        ]
                                    }),
//                                     createElement('div', { style: { marginTop: '30px' } },
//                                         Card.create({
//                                             children: [
//                                                 createElement('h3', {
//                                                     style: {
//                                                         fontSize: '28px',
//                                                         marginBottom: '20px',
//                                                         color: 'white'
//                                                     }
//                                                 }, '🛠️ Technologies'),
//                                                 createElement('ul', {
//                                                     style: {
//                                                         fontSize: '18px',
//                                                         lineHeight: '2',
//                                                         listStyle: 'none',
//                                                         padding: '0',
//                                                         color: 'white'
//                                                     }
//                                                 },
//                                                     createElement('li', {}, '✅ Pure Vanilla JavaScript (ES6+)'),
//                                                     createElement('li', {}, '✅ Custom createElement Function'),
//                                                     createElement('li', {}, '✅ Hash-based Client-side Routing'),
//                                                     createElement('li', {}, '✅ Component-based Architecture'),
//                                                     createElement('li', {}, '✅ Modular UI Components (Button, Card, Input, etc)'),
//                                                     createElement('li', {}, '✅ State Management'),
//                                                     createElement('li', {}, '✅ No External Dependencies')
//                                                 )
//                                             ]
//                                         })
//                                     ),
//                                     createElement('div', { style: { marginTop: '30px' } },
//                                         Card.create({
//                                             children: [
//                                                 createElement('h3', {
//                                                     style: {
//                                                         fontSize: '28px',
//                                                         marginBottom: '20px',
//                                                         color: 'white'
//                                                     }
//                                                 }, '📁 Project Structure'),
//                                                 createElement('pre', {
//                                                     style: {
//                                                         fontSize: '16px',
//                                                         lineHeight: '1.6',
//                                                         background: 'rgba(0,0,0,0.3)',
//                                                         padding: '20px',
//                                                         borderRadius: '10px',
//                                                         overflow: 'auto',
//                                                         textAlign: 'left',
//                                                         color: 'white'
//                                                     }
//                                                 }, `PortoJS:
//   |- js/
//        |- page/
//             |- home.js
//             |- projects.js
//             |- about.js
//             |- contact.js
//        |- components/
//             |- navbar.js
//             |- footer.js
//             |- ui/
//                  |- Button.js
//                  |- Card.js
//                  |- Input.js
//                  |- Container.js
//                  |- Section.js
//                  |- Grid.js
//        |- lib/
//             |- createElement.js
//             |- router.js
//        |- loaderDom.js
//   |- index.html`)
//                                             ]
//                                         })
//                                     )
                                ]
                            })
                        ]
                    }),
                    Footer.render()
                );
            }

            return { render };
        })();
