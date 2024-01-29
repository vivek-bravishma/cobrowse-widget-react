import React, { useEffect, useState } from 'react';
import { useWidgetApi } from '../../contexts/WidgetApiContext';

const CognigyCopilot = () => {
    const [urlToken, setUrlToken] = useState(null);
    const [userId, setUserId] = useState(null);
    const [sessionId, setSessionId] = useState(null);

    const { widgetApi, interactionId } = useWidgetApi();

    useEffect(() => {
        let interData = widgetApi?.getInteractionData();
        console.log('CognigyCopilot getInteractionData=======> ', interData);

        setUrlToken(interData?.intrinsics?.ENGAGEMENT_PARAMETERS?.urlToken);
        setUserId(interData?.intrinsics?.ENGAGEMENT_PARAMETERS?.userId);
        setSessionId(interData?.intrinsics?.ENGAGEMENT_PARAMETERS?.sessionId);
    }, []);

    return (
        <div
            style={{
                background: '#ccc',
                width: '100%',
                height: '80vh',
                display: 'flex',
                flexFlow: 'column',
                alignItems: 'center',
                justifyContent: 'space-evenly',
            }}
        >
            <iframe
                className={'screen'}
                title='Agent Session'
                frameBorder={0}
                unsafe-url='true'
                src={`https://agent-assist-trial.cognigy.ai/?${sessionId}=sessionId&userId=${userId}&URLToken=${urlToken}&organisationId=5f5a27a74b39915e7f9acd21&projectId=65a54ec0567cde408a1bc296&configId=65b264c83e5bbeb0d74a8414`}
            />
        </div>
    );
};

export default CognigyCopilot;
