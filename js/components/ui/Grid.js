import { createElement } from "../../lib/createElement.js";

export const Grid = (function() {
    let size = '460px';
    function create(props) {
        const {
            columns = 'repeat(auto-fit, minmax('+ size +', 1fr))',
            gap = '20px',
            children = []
        } = props;

        return createElement('div', {
            style: {
                display: 'grid',
                gridTemplateColumns: columns,
                gap: gap
            }
        }, ...children);
    }
    function handleResize() {
            if (window.innerWidth < 768) {
                size = '300px';
            } else {
                size = '460px';
            }
    }
    window.addEventListener('resize', handleResize);
    handleResize();

    return { create };
})();