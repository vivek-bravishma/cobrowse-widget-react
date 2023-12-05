import React from 'react';
import './style.css';
import CONFIG from '../../utils/config';
import CustomAgentUI from '../CustomAgent/CustomAgentUI';
import Form from '../Form';
import AgentShare from '../AgentShare';
import WidgetApiProvider from '../../contexts/WidgetApiContext';

// const api = 'https://cobrowse.io';
const api = 'https://cobrowse.io/dashboard';

const token = CONFIG.agentToken;

function Cobrowse({ interactionId }) {
    console.log('<===============================================> ');
    console.log('interaction id from cobro component=============> ', interactionId);
    // return <CustomAgentUI token={token} demoId={demoId} api={api} />;
    // return <CustomAgentUI token={token} api={api} />;
    return (
        <WidgetApiProvider>
            <div className='cobrowse-widget-container'>
                <CustomAgentUI token={token} api={api} />
                <AgentShare />
                <Form />
            </div>
        </WidgetApiProvider>
    );
}

export default Cobrowse;
