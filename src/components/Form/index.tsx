import React, { useState } from 'react';
// import { Icon } from '@avaya/neo-react';
import './style.css';
import { useWidgetApi } from '../../contexts/WidgetApiContext';

type formOptionType = {
    value: string;
    text: string;
};

const Form = () => {
    const formOptions = [
        { value: '', text: 'Choose an option' },
        { value: 'https://lab.bravishma.com:6510', text: 'Update mobile number' },
        { value: 'https://lab.bravishma.com:6508', text: 'Update address details' },
        { value: 'https://lab.bravishma.com:6507', text: 'Update email address' },
    ];

    const [selectedForm, setSelectedForm] = useState<formOptionType>(formOptions[0]);

    const handleSelectFormChange = (event) => {
        let selectedOption = formOptions.find((ele) => ele.value === event.target.value);
        console.log('s o====> ', selectedOption);
        if (selectedOption) setSelectedForm(selectedOption);
    };

    const handleViewFormClick = () => {
        console.log('handleViewFormClick==> ', selectedForm);
        if (selectedForm.value) {
            window.open(selectedForm.value, '_blank');
        }
    };

    // const sendCobrowseUrlToCustomer = () => {
    //     widgetAPI.sendChatMessage(selectedForm.value);
    //     // console.log(this.urlname);
    // };

    const sendCobrowseUrlSMSToCustomer = () => {
        console.log('sending sms');
    };

    const widgetAPI = useWidgetApi();
    console.log('Widget api =====================> ', widgetAPI);

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
                    <button className='cobro-url-form-btn'>
                        <span className='neo-icon-send'></span>
                        Send Co-browse URL
                    </button>
                    <button
                        className='cobro-url-form-btn '
                        // onClick={sendCobrowseUrlSMSToCustomer}
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
