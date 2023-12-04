import React from 'react';
import './style.css';
import CONFIG from '../../utils/config';
import CustomAgentUI from '../CustomAgent/CustomAgentUI';
import Form from '../Form';
import AgentShare from '../AgentShare';

// const api = 'https://cobrowse.io';
const api = 'https://cobrowse.io/dashboard';

const token = CONFIG.agentToken;

function Cobrowse() {
    // return <CustomAgentUI token={token} demoId={demoId} api={api} />;
    // return <CustomAgentUI token={token} api={api} />;
    return (
        <div className='cobrowse-widget-container'>
            <CustomAgentUI token={token} api={api} />
            <AgentShare />
            <Form />
        </div>
    );
}

export default Cobrowse;
