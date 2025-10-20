import { createElement } from '../lib/createElement.js';
import { Input } from '../components/ui/Input.js';
import { Card } from '../components/ui/Card.js';
import { Section } from '../components/ui/Section.js';
import { Button } from '../components/ui/Button.js';
import { Container } from '../components/ui/Container.js';
import { Navbar } from "../components/navbar.js";
import { Footer } from "../components/footer.js";

export const ContactPage = (function() {
    let formState = {
        name: '',
        email: '',
        message: ''
    };

    function render() {
        return createElement('div', { class: 'fade-in' },
            Navbar.render(),
            Section.create({
                title: 'Get In Touch',
                subtitle: 'Have a question or want to work together?',
                textAlign: 'center',
                children: [
                    Container.create({
                        maxWidth: '700px',
                        padding: '0',
                        children: [
                            Card.create({
                                children: [
                                    createElement('form', {
                                        style: {
                                            display: 'flex',
                                            flexDirection: 'column',
                                            gap: '25px'
                                        },
                                        onsubmit: function(e) {
                                            e.preventDefault();
                                            alert(`Message sent!\n\nName: ${formState.name}\nEmail: ${formState.email}\nMessage: ${formState.message}`);
                                            formState = { name: '', email: '', message: '' };
                                            this.reset();
                                        }
                                    },
                                        Input.create({
                                            type: 'text',
                                            label: 'Name',
                                            required: true,
                                            onInput: function(e) {
                                                formState.name = e.target.value;
                                            }
                                        }),
                                        Input.create({
                                            type: 'email',
                                            label: 'Email',
                                            required: true,
                                            onInput: function(e) {
                                                formState.email = e.target.value;
                                            }
                                        }),
                                        Input.create({
                                            type: 'text',
                                            label: 'Message',
                                            required: true,
                                            rows: 6,
                                            onInput: function(e) {
                                                formState.message = e.target.value;
                                            }
                                        }),
                                        Button.create({
                                            text: 'Send Message',
                                            variant: 'primary',
                                            size: 'large'
                                        })
                                    )
                                ]
                            }),
                            createElement('div', {
                                style: {
                                    marginTop: '40px',
                                    textAlign: 'center'
                                }
                            },
                                createElement('p', {
                                    style: {
                                        fontSize: '18px',
                                        marginBottom: '15px',
                                        color: 'z'
                                    }
                                }, 'Or reach out via:'),
                                createElement('div', {
                                    style: {
                                        display: 'flex',
                                        justifyContent: 'center',
                                        gap: '20px',
                                        fontSize: '16px',
                                        flexWrap: 'wrap',
                                        color: 'white'
                                    }
                                },
                                    // createElement('span', {}, '📧 '),
                                    createElement('span', {}, 'Telegram: @Massatriof16 & @Athaxdev')
                                )
                            )
                        ]
                    })
                ]
            }),
            Footer.render()
        );
    }

    return { render };
})();
