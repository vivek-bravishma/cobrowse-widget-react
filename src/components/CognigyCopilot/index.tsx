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

        // interData = {
        //     id: '6924ac93-7971-4038-ae9f-709918693d3b',
        //     contactId: '6f8b16a8-87c3-4934-92af-31949d3664c0',
        //     channel: 'WEBCHAT',
        //     state: 'ACTIVE',
        //     capabilities: {
        //         canAccept: false,
        //         canAddAttachment: false,
        //         canBarge: false,
        //         canCoach: false,
        //         canCompleteACW: false,
        //         canConferenceComplete: false,
        //         canConsult: false,
        //         canConsultToService: false,
        //         canConsultToTeam: false,
        //         canDefer: false,
        //         canEnd: true,
        //         canExtendACW: false,
        //         canForward: false,
        //         canHold: false,
        //         canIgnore: false,
        //         canMute: false,
        //         canObserve: true,
        //         canReject: false,
        //         canReply: false,
        //         canSendDtmf: false,
        //         canSendMessage: true,
        //         canSendWhisper: false,
        //         canSetACW: false,
        //         canSetDispositionCode: true,
        //         canSetUui: false,
        //         canSetWorkCode: false,
        //         canSingleStepConference: false,
        //         canSingleStepTransfer: false,
        //         canSingleStepTransferToService: true,
        //         canSingleStepTransferToTeam: false,
        //         canSingleStepTransferToUser: true,
        //         canTransferComplete: false,
        //         canUnhold: false,
        //         canUnmute: false,
        //     },
        //     workRequestId: 'a9077f60-c0c5-4295-87bd-0c6995c8c3ce',
        //     originatingAddress: 'prabish29@avaya.com',
        //     destinationAddress: 'prabishb@sa.avayatoday.com-Chat',
        //     direction: 'INCOMING',
        //     isCustomerInteraction: true,
        //     workCode: '',
        //     dispositionCode: {
        //         code: '',
        //         name: '',
        //         agentId: '',
        //         agentName: '',
        //     },
        //     deferCode: '',
        //     participants: [
        //         {
        //             type: 'CUSTOMER',
        //             subtype: '',
        //             name: '+17202623702',
        //             address: 'prabish29@avaya.com',
        //             isSelf: false,
        //             muted: false,
        //         },
        //         {
        //             type: 'AGENT',
        //             subtype: '',
        //             name: 'PrabishB',
        //             address: '1f4a373c-a152-4c20-8f2f-8f4353b3031c',
        //             isSelf: true,
        //             muted: false,
        //         },
        //     ],
        //     userToUserInfo: '',
        //     isNailUpCall: false,
        //     isWebRtcCall: false,
        //     isACWEnabled: false,
        //     isACWExtended: false,
        //     isAutoAnswerEnabled: false,
        //     topic: 'mscards',
        //     establishedTime: '2024-01-29T13:23:14.421Z',
        //     stateChangeTime: '2024-01-29T13:23:18.052315Z',
        //     acwDuration: '0',
        //     externalInteractionId: '6924ac93-7971-4038-ae9f-709918693d3b',
        //     interactionType: 'CALLED',
        //     observeAction: 'NONE',
        //     priority: '5',
        //     attributes: [],
        //     stateReason: '',
        //     isObserved: false,
        //     isTransferredToService: false,
        //     isTransferredToUser: false,
        //     skill: '',
        //     skillId: '',
        //     intrinsics: {
        //         CALLER_NAME: '+17202623702',
        //         CALLER_NUMBER: 'prabish29@avaya.com',
        //         ENGAGEMENT_PARAMETERS:
        //             '{"msfeewaiver":"mscards","urlToken":"558ad84eaa17c7322317a378eec2c7847fb8e9034dceba2838bac21e61df8a00","sessionId":"session-4d6d6520-10bc-4c26-bb09-886d5322ce93","userId":"5e1814dc-18c4-48d5-894f-b8a7161c56c1"}',
        //         START_DATE: '2024-01-29(UTC)',
        //         START_TIME: '13:23:14(UTC)',
        //         TOPIC_ID: 'a731edb9-728f-4f46-a82a-8f4e9f415a01',
        //         TOPIC_NAME: 'mscards',
        //     },
        //     tenantId: 'WOEZYD',
        //     tenantName: '',
        //     providerId: '97d8aa0b-8024-4919-bfd9-db74b77699e0',
        //     resourceAddress: 'prabishb@sa.avayatoday.com-Chat',
        //     isRecording: false,
        //     isMentoringInteraction: false,
        //     buttons: [
        //         {
        //             icon: 'end',
        //             type: 'primary',
        //             modifier: 'alert',
        //             action: 'END',
        //             capability: 'canEnd',
        //             internal: true,
        //             tooltip: 'End Interaction',
        //             order: 1,
        //             label: 'End Interaction',
        //         },
        //         {
        //             icon: 'dtmf',
        //             type: 'secondary',
        //             action: 'DTMF',
        //             capability: 'canSendDtmf',
        //             internal: true,
        //             dropdown: true,
        //             tooltip: 'DTMF',
        //             order: 2,
        //             label: 'DTMF dropdown',
        //         },
        //         {
        //             icon: 'transfer-forward',
        //             type: 'secondary',
        //             action: 'TRANSFER',
        //             capabilities: [
        //                 'canSingleStepTransfer',
        //                 'canSingleStepTransferToTeam',
        //                 'canSingleStepTransferToService',
        //                 'canSingleStepTransferToUser',
        //             ],
        //             showExtension: 'canSingleStepTransfer',
        //             showTeam: 'canSingleStepTransferToTeam',
        //             showServices: 'canSingleStepTransferToService',
        //             showUsers: 'canSingleStepTransferToUser',
        //             showContacts: 'canSingleStepTransferToUser',
        //             internal: true,
        //             dropdown: true,
        //             tooltip: 'Transfer',
        //             order: 3,
        //             label: 'Transfer dropdown',
        //         },
        //         {
        //             icon: 'transfer-forward',
        //             type: 'secondary',
        //             action: 'COMPLETE_AS_TRANSFER',
        //             capability: 'canTransferComplete',
        //             internal: true,
        //             tooltip: 'Complete as Transfer',
        //             order: 3,
        //             label: 'Complete as Transfer',
        //         },
        //         {
        //             icon: 'user-group',
        //             type: 'secondary',
        //             action: 'CONSULT',
        //             capabilities: [
        //                 'canConsult',
        //                 'canConsultToTeam',
        //                 'canConsultToService',
        //                 'canConsultToUser',
        //             ],
        //             showExtension: 'canConsult',
        //             showTeam: 'canConsultToTeam',
        //             showServices: 'canConsultToService',
        //             showUsers: 'canConsultToUser',
        //             showContacts: 'canConsultToUser',
        //             internal: true,
        //             dropdown: true,
        //             tooltip: 'Consult',
        //             order: 4,
        //             label: 'Consult dropdown',
        //         },
        //         {
        //             icon: 'user-conference',
        //             type: 'secondary',
        //             action: 'COMPLETE_AS_CONFERENCE',
        //             capability: 'canConferenceComplete',
        //             internal: true,
        //             tooltip: 'Complete as Conference',
        //             order: 4,
        //             label: 'Complete as Conference',
        //         },
        //         {
        //             icon: 'user-conference',
        //             type: 'secondary',
        //             action: 'CONFERENCE',
        //             capabilities: [
        //                 'canSingleStepConference',
        //                 'canSingleStepConferenceToTeam',
        //                 'canSingleStepConferenceToService',
        //                 'canSingleStepConferenceToUser',
        //             ],
        //             showExtension: 'canSingleStepConference',
        //             showTeam: 'canSingleStepConferenceToTeam',
        //             showServices: 'canSingleStepConferenceToService',
        //             showUsers: 'canSingleStepConferenceToUser',
        //             showContacts: 'canSingleStepConferenceToUser',
        //             internal: true,
        //             dropdown: true,
        //             tooltip: 'Conference',
        //             order: 4,
        //             label: 'Conference dropdown',
        //         },
        //         {
        //             icon: 'audio-on',
        //             type: 'secondary',
        //             action: 'MUTE',
        //             capability: 'canMuteAudio',
        //             internal: true,
        //             tooltip: 'Mute Audio',
        //             order: 5,
        //             label: 'Mute',
        //         },
        //         {
        //             icon: 'audio-off',
        //             type: 'primary',
        //             action: 'UNMUTE',
        //             capability: 'canUnmuteAudio',
        //             internal: true,
        //             tooltip: 'Unmute Audio',
        //             order: 5,
        //             label: 'Unmute',
        //         },
        //         {
        //             icon: 'hold',
        //             type: 'secondary',
        //             action: 'HOLD',
        //             capability: 'canHold',
        //             internal: true,
        //             tooltip: 'Hold',
        //             order: 5,
        //             label: 'Hold',
        //         },
        //         {
        //             icon: 'more',
        //             type: 'secondary',
        //             action: 'MORE',
        //             capability: 'canEnd',
        //             internal: true,
        //             dropdown: true,
        //             tooltip: 'More',
        //             order: 6,
        //             label: 'More dropdown',
        //         },
        //     ],
        //     type: '[Interaction] Update',
        // };

        let ENGAGEMENT_PARAMETERS = interData?.intrinsics?.ENGAGEMENT_PARAMETERS;

        console.log('--->', ENGAGEMENT_PARAMETERS);
        if (ENGAGEMENT_PARAMETERS) {
            setUrlToken(JSON.parse(ENGAGEMENT_PARAMETERS)?.urlToken);
            setUserId(JSON.parse(ENGAGEMENT_PARAMETERS)?.userId);
            setSessionId(JSON.parse(ENGAGEMENT_PARAMETERS)?.sessionId);
        }
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
