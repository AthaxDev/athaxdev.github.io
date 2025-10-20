import { Router } from './lib/router.js';
import { HomePage } from './page/home.js';
import { RecoveryPage } from './page/recovery.js';
import { AboutPage } from './page/about.js';
import { ContactPage } from './page/contact.js';
import { ToolsPage } from './page/spdtools.js';

document.addEventListener('DOMContentLoaded', function() {
    console.log('PortofolioAja Fully Modular Application Starting...');
    
    // Register all routes
    Router.register('/', HomePage);
    Router.register('/tools', ToolsPage);
    Router.register('/recovery', RecoveryPage);
    Router.register('/about', AboutPage);
    Router.register('/contact', ContactPage);
    
    // Initialize router
    Router.init();
    console.log('Routes Loaded!');
    console.log('Available routes: #/, #/projects, #/about, #/contact');
    console.log('UI Components: Button, Card, Input, Container, Section, Grid');
});