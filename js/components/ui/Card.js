import { createElement } from "../../lib/createElement.js";

export const Card = (function() {
    function create(props) {
        const {
            title = '',
            subtitle = '',
            description = '',
            onClick = null,
            children = [],
            techArray = [],
            alertbug = []  // Changed from alertBug to alertbug to match your call
        } = props;

        let subtitleElement = null;
        
        if (techArray.length > 0) {
            subtitleElement = createElement('div', {
                style: {
                    display: 'flex',
                    gap: '8px',
                    flexWrap: 'wrap',
                    marginBottom: '15px',
                    justifyContent: 'flex-start'
                }
            }, ...techArray.map(tech => 
                createElement('span', {
                    style: {
                        fontSize: '13px',
                        color: '#ffffff',
                        background: 'rgba(0, 0, 0, 0.3)',
                        border: '1px solid rgba(0, 0, 0, 0.25)',
                        padding: '6px 14px',
                        borderRadius: '20px',
                        fontWeight: '500',
                        display: 'inline-flex',
                        alignItems: 'center',
                        gap: '6px',
                        transition: 'all 0.2s'
                    },
                    onmouseover: function() {
                        this.style.background = 'rgba(255, 255, 255, 0.28)';
                        this.style.transform = 'scale(1.05)';
                    },
                    onmouseout: function() {
                        this.style.background = 'rgba(0, 0, 0, 0.3)';
                        this.style.transform = 'scale(1)';
                    }
                }, 
                    tech.icon ? createElement('i', {
                        class: tech.icon,
                        style: {
                            fontSize: '14px',
                            marginRight: '2px'
                        }
                    }) : null,
                    tech.name || tech
                )
            ));
        } else if (subtitle) {
            const techList = Array.isArray(subtitle) 
                ? subtitle 
                : subtitle.split(',').map(t => t.trim());
            
            subtitleElement = createElement('div', {
                style: {
                    display: 'flex',
                    gap: '8px',
                    flexWrap: 'wrap',
                    marginBottom: '15px',
                    justifyContent: 'flex-start'
                }
            }, ...techList.map(tech => 
                createElement('span', {
                    style: {
                        fontSize: '13px',
                        color: '#ffffff',
                        background: 'rgba(0, 0, 0, 0.3)',
                        border: '1px solid rgba(0, 0, 0, 0.25)',
                        padding: '6px 14px',
                        borderRadius: '20px',
                        fontWeight: '500',
                        display: 'inline-block',
                        transition: 'all 0.2s'
                    },
                    onmouseover: function() {
                        this.style.background = 'rgba(255, 255, 255, 0.28)';
                        this.style.transform = 'scale(1.05)';
                    },
                    onmouseout: function() {
                        this.style.background = 'rgba(0, 0, 0, 0.3)';
                        this.style.transform = 'scale(1)';
                    }
                }, tech)
            ));
        }

        // Handle description - create container with proper line breaks
        let descriptionElement = null;
        if (description) {
            const lines = description.split('\\n');
            
            descriptionElement = createElement('div', {
                style: {
                    fontSize: '14px',
                    color: 'rgba(255,255,255,0.85)',
                    lineHeight: '1.6',
                    marginBottom: '15px'
                }
            }, ...lines.map((line, index) => 
                createElement('div', {
                    style: {
                        marginBottom: index < lines.length - 1 ? '4px' : '0'
                    }
                }, line.trim())
            ));
        }

        // New: Handle bug warnings - red box with icon and list
        let bugElement = null;
        if (alertbug.length > 0) {
            bugElement = createElement('div', {
                style: {
                    background: 'rgba(255, 0, 0, 0.1)',  // Light red background
                    border: '1px solid red',  // Red border
                    borderRadius: '8px',
                    padding: '10px',
                    marginBottom: '15px'
                }
            },
                createElement('h5', {
                    style: {
                        color: 'red',
                        marginBottom: '8px',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '8px',
                        fontSize: '16px'
                    }
                },
                    createElement('i', { class: 'fas fa-bug' }),  // Bug icon
                    'Bug Warnings'
                ),
                createElement('ul', {
                    style: {
                        color: 'red',
                        listStyleType: 'disc',  // No bullets, or use 'disc' for bullets
                        padding: 0,
                        marginLeft: '20px'
                    }
                }, ...alertbug.map(bug => 
                    createElement('li', {
                        style: {
                            marginBottom: '4px'
                        }
                    }, bug)
                ))
            );
        }

        return createElement('div', {
            style: {
                background: 'rgba(255, 255, 255, 0.1)',
                backdropFilter: 'blur(10px)',
                padding: '30px',
                borderRadius: '15px',
                boxShadow: '0 8px 32px rgba(0,0,0,0.1)',
                transition: 'transform 0.3s',
                cursor: onClick ? 'pointer' : 'default'
            },
            onclick: onClick,
            onmouseover: function() { if(onClick) this.style.transform = 'translateY(-10px)'; },
            onmouseout: function() { if(onClick) this.style.transform = 'translateY(0)'; }
        },
            title ? createElement('h4', {
                style: {
                    fontSize: '22px',
                    marginBottom: '12px',
                    color: 'white'
                }
            }, title) : null,
            subtitleElement,
            descriptionElement,
            bugElement,  // Added: Bug warning element
            ...children
        );

        
    }

    return { create };
})();
