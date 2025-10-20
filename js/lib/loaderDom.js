export const LoaderDOM = (function() {
    function load(rootId, component) {
        const root = document.getElementById(rootId);
        if (!root) {
            console.error(`Element with id "${rootId}" not found`);
            return;
        }
        
        root.innerHTML = '';
        const element = component.render();
        root.appendChild(element);
    }
    return { load };
})();