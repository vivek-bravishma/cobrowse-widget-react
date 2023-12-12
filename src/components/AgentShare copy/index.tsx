import React, { useEffect, useRef, useState } from 'react';
import CobrowseAPI from 'cobrowse-agent-sdk';
import CobrowseIO from 'cobrowse-sdk-js';

import config from '../../utils/config';
import './style.css';
import { resetPresentSession, startPresentSession } from '../../utils/Helper';

const AgentShare2 = () => {
    const [session, setSession] = useState<any>(null);
    const [isPresenting, setIsPresenting] = useState<boolean>(false);

    const presentUrlRefTB = useRef<any>(null);
    const shareButtonRef = useRef<any>(null);
    const endButtonRef = useRef<any>(null);

    const agentToken = config.agentToken;

    const cobrowse = new CobrowseAPI(agentToken);
    const shareEndUI = () => {
        shareButtonRef.current.style.display = 'block';
        endButtonRef.current.style.display = 'none';
        presentUrlRefTB.current.value = '';
    };

    const shareStartUI = () => {
        shareButtonRef.current.style.display = 'none';
        endButtonRef.current.style.display = 'block';
    };

    useEffect(() => {
        if (session) console.log('session ue==> ', session?.id);
    }, [session]);

    const startPresentBtnHandler = async () => {
        startPresentSession(
            CobrowseIO,
            cobrowse,
            session,
            setSession,
            shareStartUI,
            shareEndUI,
            presentUrlRefTB,
        );
    };

    const resetPresentBtnHandler = () => {
        if (session) {
            resetPresentSession(CobrowseIO);
            shareEndUI();
        }
    };

    return (
        <div className='agent-share-container'>
            <div className='panel'>
                <input id='present-url' ref={presentUrlRefTB} />
                <button
                    id='share-button'
                    // disabled={session === null}
                    className=''
                    ref={shareButtonRef}
                    onClick={startPresentBtnHandler}
                >
                    Share my Desktop
                </button>
                <button id='end-button' ref={endButtonRef} onClick={resetPresentBtnHandler}>
                    End present session
                </button>
            </div>
        </div>
    );
};

export default AgentShare2;
