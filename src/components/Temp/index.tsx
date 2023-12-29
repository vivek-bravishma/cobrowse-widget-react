import React, { useState } from 'react';
import CobrowseIO from 'cobrowse-sdk-js';

const Temp = () => {
    const [code, setCode] = useState<any>('');

    CobrowseIO.license = 'h5U9O61S0DG05Q';
    CobrowseIO.customData = {
        user_id: '12345',
        user_name: 'example',
        user_email: 'cobrowsing.avaya@hotmail.com',
        device_id: 'device123',
        device_name: 'windows123',
    };

    const handleHelp = async () => {
        // await CobrowseIO.stop();
        // await CobrowseIO;

        await CobrowseIO.client().then(async function () {
            // create a code a display it to the user using your own UI
            await CobrowseIO.stop();
            CobrowseIO.redactedViews = ['input[ name=""],input[name="SSN"]'];
            console.log('starting');
            await CobrowseIO.start().then((su) => console.log('cos==> ', su));
            console.log('started');
            CobrowseIO.createSessionCode().then(function (code) {
                console.log('code--> ', code);
                setCode(code);
            });
        });
    };

    return (
        <div
            style={{
                background: '#ccc',
                width: '100%',
                height: '100px',
                display: 'flex',
                flexFlow: 'column',
                alignItems: 'center',
                justifyContent: 'space-evenly',
            }}
        >
            <button
                type='button'
                onClick={handleHelp}
                className='py-[12px] px-[20px]    bg-[#007BFF]'
            >
                Need Help
            </button>
            6 digit code is {code}
        </div>
    );
};

export default Temp;
