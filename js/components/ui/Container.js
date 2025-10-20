import { createElement } from "../../lib/createElement.js";

export const Container = (function() {
    function create(props) {
        const {
            maxWidth = '1200px',
            padding = '50px',
            children = []
        } = props;

        return createElement('div', {
            style: {
                maxWidth: maxWidth,
                margin: '0 auto',
                padding: padding
            }
        }, ...children);
    }

    return { create };
})();
