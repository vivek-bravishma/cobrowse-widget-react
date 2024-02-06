import React, { useState } from 'react';
// import { Icon } from '@avaya/neo-react';
import './style.css';
import { useWidgetApi } from '../../contexts/WidgetApiContext';

type formOptionType = {
    value: string;
    text: string;
};

const Form = () => {
    const { widgetApi, interactionId } = useWidgetApi();

    const formOptions = [
        { value: '', text: 'Choose an option' },
        {
            value: 'https://cobrowsingservice.lab.bravishma.com/mobile',
            text: 'Update mobile number',
        },
        {
            value: 'https://cobrowsingservice.lab.bravishma.com/address',
            text: 'Update address details',
        },
        {
            value: 'https://cobrowsingservice.lab.bravishma.com/email',
            text: 'Update email address',
        },
    ];

    const [selectedForm, setSelectedForm] = useState<formOptionType>(formOptions[0]);

    const handleSelectFormChange = (event) => {
        let selectedOption = formOptions.find((ele) => ele.value === event.target.value);
        // console.log('s o====> ', selectedOption);
        if (selectedOption) setSelectedForm(selectedOption);
    };

    const handleViewFormClick = () => {
        console.log('handleViewFormClick==> ', selectedForm);
        if (selectedForm.value) {
            window.open(selectedForm.value, '_blank');
        }
    };

    const sendCobrowseUrlToCustomer = () => {
        if (selectedForm.value) {
            console.log('Sending URL in Chat Message to the user');
            widgetApi?.sendChatMessage(selectedForm.value);
        }
    };

    const sendCobrowseUrlSMSToCustomer = () => {
        console.log('sending sms');
    };

    return (
        <div className='sendCoBroOuterContainer'>
            <div className='sendCoBroUrlFormContainer'>
                <div className='selectFormInputContainer'>
                    <select
                        className='formSelectInput'
                        value={selectedForm.value}
                        onChange={handleSelectFormChange}
                    >
                        {formOptions.map((option) => (
                            <option key={option.value} value={option.value}>
                                {option.text}
                            </option>
                        ))}
                    </select>
                    <button
                        className='cobro-url-form-btn'
                        onClick={handleViewFormClick}
                        disabled={selectedForm.value === ''}
                    >
                        <span className='neo-icon-send'></span>View Form
                    </button>
                </div>
                <div className='selectedFormDetails'>
                    <p>URL: {selectedForm.value}</p>
                    <p>Description: {selectedForm.text}</p>
                </div>
                <div className='sendFormUrlBtnContr'>
                    <button
                        className='cobro-url-form-btn'
                        onClick={sendCobrowseUrlToCustomer}
                        disabled={selectedForm.value === ''}
                    >
                        <span className='neo-icon-send'></span>
                        Send Co-browse URL
                    </button>
                    <button
                        className='cobro-url-form-btn '
                        // onClick={sendCobrowseUrlSMSToCustomer}
                        disabled={selectedForm.value === ''}
                    >
                        <span className='neo-icon-send'></span>
                        Send Co-browse URL SMS
                    </button>
                </div>
            </div>
        </div>
    );
};

export default Form;
