import { createElement } from 'react';
import { render, unmountComponentAtNode } from 'react-dom';
import Cobrowse from '../components/Cobrowse';

class widgetComp extends HTMLElement {
    connectedCallback() {
        render(createElement(Cobrowse), this);
    }

    disconnectedCallback() {
        unmountComponentAtNode(Cobrowse as any);
    }
}

customElements.define('cobrowse-widget-react', widgetComp);
