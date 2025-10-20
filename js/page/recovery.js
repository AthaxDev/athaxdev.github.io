import { createElement } from '../lib/createElement.js';
import { Navbar } from '../components/navbar.js';
import { Footer } from '../components/footer.js';
import { Section } from '../components/ui/Section.js';
import { Card } from '../components/ui/Card.js';
import { Grid } from '../components/ui/Grid.js';
import { Button } from '../components/ui/Button.js';
import { device } from "../devicelist.js";

export const RecoveryPage = (function() {
   

    // Updated function for download buttons (opens link in new tab)
    function createDownloadBtn(text, link, color1 = 'rgba(255, 127, 255, 0.8)', color2 = 'rgba(255, 127, 255, 0.4)') {
        const isPlaceholder = link === '#';  // Check if it's a placeholder link
        return createElement('a', {
            class: 'fas fa-download',
            href: isPlaceholder ? '#' : link,  // Prevent navigation if placeholder
            target: isPlaceholder ? '_self' : '_blank',  // Open in new tab only if valid link
            style: {
                marginTop: '20px',
                color: 'white',
                textDecoration: 'none',
                fontSize: '16px',
                transition: 'all 0.3s ease',
                padding: '8px 16px',
                borderRadius: '8px',
                background: 'transparent',
                position: 'relative',
                cursor: isPlaceholder ? 'not-allowed' : 'pointer',  // Disable cursor for placeholders
                opacity: isPlaceholder ? 0.5 : 1  // Dim placeholders
            },
            onclick: function(e) {
                if (isPlaceholder) {
                    e.preventDefault();
                    alert('Download link not available yet.');  // Optional: Alert for placeholders
                } else {
                    // Allow default behavior (open in new tab) or force with window.open
                    window.open(link, '_blank');
                    e.preventDefault();  // Prevent default to ensure window.open works
                }
            },
            onmouseover: function() { 
                if (!isPlaceholder) {
                    this.style.boxShadow = `
                        0 0 8px ${color1},
                        0 0 15px ${color1},
                        0 0 25px ${color2},
                        0 0 35px ${color2}
                    `;
                    this.style.background = color1;
                    this.style.transform = 'translateY(-2px)';
                }
            },
            onmouseout: function() { 
                if (!isPlaceholder) {
                    this.style.boxShadow = '0 0 0px transparent';
                    this.style.background = 'transparent';
                    this.style.transform = 'translateY(0)';
                }
            }
        }, " "+text);
    }

    function render() {
        return createElement('div', { class: 'fade-in' },
            Navbar.render(),
            Section.create({
                title: 'Custom Recovery',
                subtitle: 'A collection of Custom Recovery for various devices.',
                textAlign: 'center',
                children: [
                    Grid.create({
                        children: device.map(dev => 
                            Card.create({
                                title: dev.name,
                                techArray: dev.tech,
                                description: dev.description,
                                alertbug: dev.bug,
                                children: dev.buttons.map(btn => {
                                    // Assign colors based on button name
                                    let color1, color2;
                                    if (btn.name === 'TWRP') {
                                        color1 = 'rgba(0, 123, 255, 0.8)';  // Blue
                                        color2 = 'rgba(0, 123, 255, 0.4)';
                                    } else if (btn.name === 'OrangeFox') {
                                        color1 = 'rgba(255, 165, 0, 0.8)';  // Orange
                                        color2 = 'rgba(255, 165, 0, 0.4)';
                                    } else if (btn.name === 'SHRP') {
                                        color1 = 'rgba(180, 108, 217, 0.8)';  // Purple
                                        color2 = 'rgba(255, 114, 255, 0.77)';
                                    } else {
                                        // Fallback to default (magenta)
                                        color1 = 'rgba(255, 127, 255, 0.8)';
                                        color2 = 'rgba(255, 127, 255, 0.4)';
                                    }
                                    return createDownloadBtn(btn.name, btn.link, color1, color2);
                                })
                            })
                        )
                    })
                ]
            }),
            Footer.render()
        );
    }

    return { render };
})();
