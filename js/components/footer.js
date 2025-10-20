import { createElement } from '../lib/createElement.js';

export const Footer = (function() {
    let cfsize = '18px';
    let pfsize = '8px';
    function render() {
        return createElement('footer', {
            style: {
                background: 'rgba(0, 0, 0, 0.38)',
                padding: '40px 50px',
                textAlign: 'center',
                color: 'white',
                marginTop: '50px',
                width: '100%'
            }
        },
            createElement('p', {
                style: {
                    fontSize: cfsize,
                    marginBottom: '10px'
                }
            }, '© 2025 MassatrioF16 & AthaxDev - All Rights Reserved'),
            createElement('p', {
                style: {
                    fontSize: pfsize,
                    opacity: '0.7'
                }
            }, 'Telegram Contact Dev : @Massatriof16 & @Athaxdev | Telegram Channel : Forum UNISOC TRANSSION')
        );
    }
    function handleResize() {
        if (window.innerWidth < 768) {
            cfsize = '13px';
            pfsize = '12px';
        } else {
            cfsize = '18px';
            pfsize = '14px';
        }
    }
        
    window.addEventListener('resize', handleResize);
    handleResize();
    

    return { render };
})();