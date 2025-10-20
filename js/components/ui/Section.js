import { createElement } from "../../lib/createElement.js";

export const Section = (function() {
    let hfsize = '24px';
    let pfsize = '14px';
    function create(props) {
        const {
            title = '',
            subtitle = '',
            textAlign = 'left',
            children = []
        } = props;
        return createElement('section', {
            style: {
                padding: '80px 50px',
                color: 'white',
                minHeight: 'calc(100vh - 300px)'
            }
        },
            title ? createElement('h2', {
                style: {
                    fontSize: hfsize,
                    marginBottom: subtitle ? '20px' : '50px',
                    textAlign: textAlign
                }
            }, title) : null,
            subtitle ? createElement('p', {
                style: {
                    fontSize: pfsize,
                    textAlign: textAlign,
                    marginBottom: '50px',
                    opacity: '0.9'
                }
            }, subtitle) : null,
            ...children
        );
        
    }
    function handleResize() {
        if (window.innerWidth < 768) {
            pfsize = '12px';
            hfsize = '24px';
        } else {
            pfsize = '18px';
            hfsize = '24px';
        }
    }
    window.addEventListener('resize', handleResize);
    handleResize();

    return { create };
})();
