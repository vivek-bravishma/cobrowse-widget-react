import React, { useEffect, useRef, useState } from 'react';
import config from '../../utils/config';
import CobrowseAPI from 'cobrowse-agent-sdk';
import CobrowseIO from 'cobrowse-sdk-js';

import * as jose from 'jose';

import './style.css';

const AgentShare = () => {
    const [session, setSession] = useState<any>(null);

    const presentUrlRef = useRef<any>(null);
    const previewRef = useRef<any>(null);
    const shareButtonRef = useRef<any>(null);
    const endButtonRef = useRef<any>(null);

    const licenseKey = config.licenseKey;
    const agentToken = config.agentToken;
    const pkcs8 = config.pkcs8;

    // console.log('session=======> ', session);

    useEffect(() => {
        // setTimeout(() => {
        createPresentSession();
        // }, 5000);
        // return () => {
        //     resetPresentSession();
        // };
    }, []);

    // console.log(licenseKey);
    // console.log(agentToken);
    // console.log(pkcs8);

    const cobrowse = new CobrowseAPI(agentToken); //agent

    // var session;

    const createPresentSession = async () => {
        try {
            // Create a new session with full device in requesting state
            // session = await cobrowse.sessions.create({
            //     full_device: 'requested',
            // });

            // setSession(
            //     await cobrowse.sessions.create({
            //         full_device: 'requested',
            //     }),
            // );
            // console.log('session==> ', session);

            cobrowse.sessions
                .create({
                    full_device: 'requested',
                })
                .then(async (data) => {
                    setSession(data);
                    // console.log('session==> ', session?.id);
                    // console.log('data==> ', data.id);

                    const viewerToken = await generateViewerJWT(licenseKey, data.id);

                    // Generate the present URL for the session with the viewer token including all query parameters to hide agent tools from the viewer
                    const presentURL = `https://cobrowse.io/session/${data.id}?token=${viewerToken}&agent_tools=none&device_controls=none&end_action=none&popout=none&session_details=none`;
                    // document.getElementById('present-url').value = presentURL;
                    presentUrlRef.current.value = presentURL;
                })
                .catch((err) => console.log('Error in creating agent cobrowse session ==> ', err));

            // const viewerToken = await generateViewerJWT(licenseKey, session.id);

            // // Generate the present URL for the session with the viewer token including all query parameters to hide agent tools from the viewer
            // const presentURL = `https://cobrowse.io/session/${session.id}?token=${viewerToken}&agent_tools=none&device_controls=none&end_action=none&popout=none&session_details=none`;
            // // document.getElementById('present-url').value = presentURL;
            // presentUrlRef.current.value = presentURL;
        } catch (error) {
            console.log(
                'Error Creating Agent preview session (createPresentSession()) ==> ',
                error,
            );
        }
    };

    const startPresentSession = async () => {
        try {
            const media = await navigator.mediaDevices.getDisplayMedia({
                video: {
                    // cursor: 'always',
                    width: { ideal: 1400 },
                    height: { ideal: 1000 },
                    frameRate: { max: 10 },
                },
                audio: false,
            });

            // const video = document.getElementById('preview') as any;
            // const video = previewRef.current;
            // video.srcObject = media;
            // video.play();

            await CobrowseIO.client(); // client

            CobrowseIO.license = licenseKey;
            CobrowseIO.redactedViews = ['.container'];
            CobrowseIO.capabilities = ['full_device'];
            CobrowseIO.showSessionControls = () => {};
            CobrowseIO.hideSessionControls = () => {};
            CobrowseIO.confirmSession = async () => true;
            CobrowseIO.confirmFullDevice = async () => media;
            CobrowseIO.confirmRemoteControl = async () => false;

            CobrowseIO.on('session.updated', (presentSession) => {
                if (presentSession.isActive()) {
                    // document.getElementById('share-button').style.display = 'none';
                    // document.getElementById('end-button').style.display = 'block';
                    // document.getElementById('preview').style.display = 'block';

                    shareButtonRef.current.style.display = 'none';
                    endButtonRef.current.style.display = 'block';
                    // previewRef.current.style.display = 'block';

                    if (!presentSession.fullDevice()) {
                        session.end();
                    }
                }
            });

            CobrowseIO.on('session.ended', async (presentSession) => {
                if (media) media.getTracks().forEach((track) => track.stop());
                resetPresentSession();
            });

            await CobrowseIO.start({
                allowIFrameStart: true,
                register: false,
            });

            // Use the Client SDK to join the session
            await CobrowseIO.getSession(session.id);
        } catch (error) {
            console.log('Error Starting Agent preview (startPresentSession()) ==> ', error);
        }
    };

    const resetPresentSession = async () => {
        try {
            if (session) await CobrowseIO.stop();

            // document.getElementById('share-button').style.display = 'block';
            // document.getElementById('end-button').style.display = 'none';
            // document.getElementById('preview').style.display = 'none';
            shareButtonRef.current.style.display = 'block';
            endButtonRef.current.style.display = 'none';
            // previewRef.current.style.display = 'none';

            await createPresentSession();
        } catch (error) {
            console.log('Error Resetting present session (resetPresentSession()) => ', error);
        }
    };

    const generateViewerJWT = async (license, id) => {
        try {
            const alg = 'RS256';

            const privateKey = await jose.importPKCS8(pkcs8, alg);

            // Generate a viewer JWT token scoped to a single session
            const jwt = await new jose.SignJWT({
                displayName: 'Viewer',
                policy: {
                    version: 2,
                    sessions: {
                        id: id,
                    },
                },
            })
                .setProtectedHeader({ alg })
                .setIssuedAt()
                .setIssuer(license)
                .setSubject('viewer@cobrowse.io')
                .setAudience('https://cobrowse.io')
                // .setExpirationTime('30m') // Choose your own expiration time
                .setExpirationTime('1m') // Choose your own expiration time
                .sign(privateKey);

            return jwt;
        } catch (error) {
            console.log('Error generating JWT for agent preview (generateViewerJWT()) ==> ', error);
        }
    };

    return (
        <div className='agent-share-container'>
            <div className='panel'>
                <input id='present-url' ref={presentUrlRef} />
                <button
                    id='share-button'
                    disabled={session === null}
                    // className='disabled-button'
                    className=''
                    ref={shareButtonRef}
                    onClick={startPresentSession}
                >
                    Share my Desktop
                </button>
                <button id='end-button' ref={endButtonRef} onClick={resetPresentSession}>
                    End present session
                </button>
                {/* <video id='preview' ref={previewRef}></video> */}
            </div>
        </div>
    );
};

export default AgentShare;
