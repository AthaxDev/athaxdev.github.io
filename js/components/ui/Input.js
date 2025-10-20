import { createElement } from "../../lib/createElement.js";

export const Input = (function() {
    function create(props) {
        const {
            type = 'text',
            placeholder = '',
            label = '',
            required = false,
            rows = null,
            onInput = () => {}
        } = props;
        const inputStyle = {
            width: '100%',
            padding: '15px',
            fontSize: '16px',
            border: 'none',
            borderRadius: '10px',
            background: 'rgba(255,255,255,0.9)',
            outline: 'none',
            fontFamily: 'inherit'
        };
        const input = rows 
            ? createElement('textarea', {
                required: required,
                rows: rows.toString(),
                placeholder: placeholder,
                style: { ...inputStyle, resize: 'vertical' },
                oninput: onInput
            })
            : createElement('input', {
                type: type,
                required: required,
                placeholder: placeholder,
                style: inputStyle,
                oninput: onInput
            });
        if (label) {
            return createElement('div', {},
                createElement('label', {
                    style: {
                        display: 'block',
                        marginBottom: '10px',
                        fontSize: '16px',
                        fontWeight: '500',
                        color: 'white'
                    }
                }, label),
                input
            );
        }
        return input;
    }
    return { create };
})();