'use client';

import { useState } from 'react';
import axios from 'axios';
import JSONPretty from 'react-json-pretty';
import 'react-json-pretty/themes/monikai.css'; // Optional: if you want a dark theme
import '../common-design/lookups.css';
import Image from 'next/image';

const EmailLookup = () => {
    const [inputValue, setInputValue] = useState('');
    const [userData, setUserData] = useState('');
    const [validMessage, setValidMessage] = useState('');

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setInputValue(e.target.value);
    };

    const inputData = async () => {
        if (!inputValue) {
            setValidMessage('Please enter your email');
            return;
        }

        try {
            const res = await axios.post('http://localhost:4001/lookups/email', {
                email: inputValue,
            });

            if (res.status === 422 || res.data?.code === 422) {
                setValidMessage('Please enter a valid email');
                return;
            }

            setUserData(res.data);
            setInputValue('');
            setValidMessage('');
        } catch (error) {
            console.error('Error fetching email data:', error);
            setValidMessage('Something went wrong. Please try again.');
        }
    };

    const handleReset = () => {
        setInputValue('');
        setUserData('');
        setValidMessage('');
    };

    return (
        <div className="main">
            <header className="header">
                <h1 id="title">EMAIL VERIFICATION</h1>
            </header>

            <div className="container">
                <Image
                    src="https://res.cloudinary.com/dfgwcxpwt/image/upload/v1747489184/upscalemedia-transformed_ek25pa.png"
                    alt="Verification Banner"
                    width={1000} // Replace with actual image width in px
                    height={200} // Replace with actual image height in px
                />

                <br />

                <input
                    type="text"
                    name="inputEmail"
                    id="input-box"
                    value={inputValue}
                    onChange={handleChange}
                    placeholder="Enter your email"
                />

                <p id="validErrMsg">{validMessage}</p>

                <button id="sub-button" onClick={inputData}>
                    Click To Verify
                </button>
                <button id="reset-button" onClick={handleReset}>
                    Click To Refresh
                </button>

                <br />
                <br />

                {userData && (
                    <table id="tableContent">
                        <thead>
                            <tr>
                                <th>Email Lookup Details</th>
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
                )}
            </div>
        </div>
    );
};

export default EmailLookup;
