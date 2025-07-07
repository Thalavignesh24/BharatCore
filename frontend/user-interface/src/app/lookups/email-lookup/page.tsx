"use client"

import { SetStateAction, useEffect, useState } from 'react'

import axios from 'axios';

import JSONPretty from 'react-json-pretty';
//import JSONPrettyMon from 'react-json-pretty/dist/monikai';


//import ".././designs/Lookup.css";


const EmailLookup = () => {
    const [inputValue, setInputValue] = useState('');

    const [userData, setUserData] = useState('');

    const [valid, validCheck] = useState("");

    const handleChange = (e: { target: { value: SetStateAction<string>; }; }) => {
        setInputValue(e.target.value);
    };

    const inputData = async () => {
        if (!inputValue) {
            return validCheck("Please Enter Your Email")
        }
        if (inputValue) {
            try {
                const res = await axios.post("http://127.0.0.1:2408/api/admin/indcore/email-data", {
                    email: inputValue,
                });

                if (res?.["data"]?.["code"] === 422) {
                    return validCheck("Please Enter The Valid Email")
                } else {
                    setUserData(res.data)
                    setInputValue('');
                    validCheck("")
                }


            } catch (error) {
                console.error("Error fetching email data:", error);
            }
        }
    };

    return (
        <div className="main">

            <div className="header">
                <h1 id="title">EMAIL VERIFICATION</h1>
            </div>

            <div className="container">
                <img src="https://res.cloudinary.com/dfgwcxpwt/image/upload/v1747489184/upscalemedia-transformed_ek25pa.png">
                </img><br>
                </br>
                <input
                    type="text"
                    name="inputEmail"
                    id="input-box"
                    value={inputValue}
                    onChange={handleChange}
                    placeholder="ENTER THE EMAIL"
                />
                <p id="validErrMsg">
                    {
                        valid
                    }
                </p>
                <button name="checkEmail" id="sub-button" onClick={inputData}>Click To Verify</button>
                <br></br><br></br>
                <a href="http://localhost:5173/ind-core/device/find-email" id="reset-button">Click To Refresh</a>


                <br></br>
                <br></br>


                <div id="data">
                    <div id="data">
                        {
                            userData ? <h4>
                                <table id="tableContent">
                                    <th>
                                        Email Lookup Details
                                    </th>
                                    <tr>
                                        <td>
                                            <JSONPretty id="json-pretty" data={userData}></JSONPretty>
                                        </td>
                                    </tr>

                                </table>

                            </h4> : ""
                        }


                    </div>
                </div>



            </div>
        </div>
    );
};

export default EmailLookup;




