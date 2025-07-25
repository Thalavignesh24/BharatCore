'use client';

import { useState } from 'react';
import JSONPretty from 'react-json-pretty';
import 'react-json-pretty/themes/monikai.css';
import axios from 'axios';
import '../common-design/lookups.css';
import Image from 'next/image';

const PhoneLookup = () => {
    const [inputPhone, setInputPhone] = useState('');
    const [selectedCode, setSelectedCode] = useState('none');
    const [userData, setUserData] = useState('');
    const [validMessage, setValidMessage] = useState('');

    const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setInputPhone(e.target.value);
    };

    const handleCodeChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        setSelectedCode(e.target.value);
    };

    const handleReset = () => {
        setInputPhone('');
        setSelectedCode('none');
        setUserData('');
        setValidMessage('');
    };

    const verifyPhone = async () => {
        if (selectedCode === 'none') {
            setValidMessage('Please select a phone code');
            return;
        }

        if (!inputPhone.trim()) {
            setValidMessage('Please enter your phone number');
            return;
        }

        try {
            const res = await axios.post('http://localhost:4001/lookups/phone',
                {
                    phoneCode: selectedCode,
                    phoneNumber: inputPhone
                }
            );

            if (res.data.code === 422) {
                setValidMessage('Please enter a valid phone number');
            } else {
                setUserData(res.data);
                setInputPhone('');
                setSelectedCode('none');
                setValidMessage('');
            }
        } catch (error) {
            console.error('Phone lookup error:', error);
            setValidMessage('An error occurred. Please try again.');
        }
    };

    return (
        <div className="main">
            <header className="header">
                <h1 id="title">PHONE NUMBER VERIFICATION</h1>
            </header>

            <div className="container">
                <Image
                    src="https://res.cloudinary.com/dfgwcxpwt/image/upload/v1747553807/images_ugqucp_e_background_removal_f_png_akcd3w.png"
                    alt="Phone Verification"
                    width={1000}
                    height={200}
                />

                <select id="code" className="dropDown" value={selectedCode} onChange={handleCodeChange}>
                    <option value="none">Select Phone Code</option>
                    <option value="+91">+91 India</option>
                    <option value="+44">+44 United Kingdom</option>
                </select>

                <input
                    type="number"
                    name="inputPhone"
                    id="input-box1"
                    value={inputPhone}
                    onChange={handlePhoneChange}
                    placeholder="Enter the phone number"
                />

                <p id="validErrMsg">{validMessage}</p>

                <button id="sub-button" onClick={verifyPhone}>Click To Verify</button>
                <button id="reset-button" onClick={handleReset}>Reset</button>
            </div>

            {userData && (
                <div id="data">
                    <table id="tableContent">
                        <thead>
                            <tr>
                                <th>Phone Number Lookup Details</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td>
                                    <JSONPretty id="json-pretty" data={userData} />
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            )}
        </div>
    );
};

export default PhoneLookup;
