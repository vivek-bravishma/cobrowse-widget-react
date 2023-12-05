import { createElement } from 'react';
import { render, unmountComponentAtNode } from 'react-dom';
import Cobrowse from '../components/Cobrowse';

class widgetComp extends HTMLElement {
    connectedCallback() {
        const interactionId = this.getAttribute('interactionid');
        console.log('interaction ID ===================> ', interactionId);
        render(createElement(Cobrowse, { interactionId }), this);
    }

    disconnectedCallback() {
        unmountComponentAtNode(Cobrowse as any);
    }
}

customElements.define('cobrowse-widget-react', widgetComp);
