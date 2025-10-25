/* eslint-disable prefer-const, react/no-unescaped-entities, @typescript-eslint/no-unused-vars */

'use client'
import { useState } from 'react'

import '../../productivity-tools/passwordGenerator/passwordGenerator.css'

export default function SignupPage () {
  const [userData, setUserData] = useState('')

  const onSubmit = async () => {
    const passwordLength = document
      .getElementsByClassName('passwordLength')
      .item(0) as HTMLInputElement

    const uppercase = document
      .getElementsByClassName('upperCase')
      .item(0) as HTMLInputElement

    const lowercase = document
      .getElementsByClassName('lowerCase')
      .item(0) as HTMLInputElement

    const numbers = document
      .getElementsByClassName('numberCase')
      .item(0) as HTMLInputElement

    const specialcase = document
      .getElementsByClassName('specialCase')
      .item(0) as HTMLInputElement

    const inputData = {
      length: Number.parseInt(passwordLength.value) || 0,
      numbers: numbers.checked || false,
      uppercase: uppercase.checked || false,
      lowercase: lowercase.checked || false,
      symbols: specialcase.checked || false
    }

    if (inputData?.length < 5 || inputData?.length > 30) {
      alert(
        'Password length should not be empty and must be greater than 4 and less than or equal to 30.'
      )
      return
    }
    const apiCall = await fetch(
      'https://bharatcore.onrender.com/productivity-tools/password-generator',
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(inputData)
      }
    )
    const result = await await apiCall.json()
    if (result?.['success'] != true || result?.['statusCode'] != 200) {
      alert('At least one rule must be selected.✅')
      return
    } else {
      setUserData(result?.['data']?.['generatedPassword'])
    }
  }

  return (
    <div className='main'>
      <h1 className='title'> Random Password Generator </h1>
      <div className='container'>
        <input
          type='text'
          className='passwordLength'
          placeholder='Enter the Password Length'
        />
        <br></br> <br></br>
        <input type='checkbox' className='lowerCase' />{' '}
        <span>Include LoweCase (a-z)</span>
        <br></br> <br></br>
        <input type='checkbox' className='upperCase' value={'off'} />{' '}
        <span>Include upperCase (A-Z)</span>
        <br></br> <br></br>
        <input type='checkbox' className='numberCase' />{' '}
        <span>Include Numbers (0-9)</span>
        <br></br> <br></br>
        <input type='checkbox' className='specialCase' />{' '}
        <span>Include Special Characters ('!"#$%&'()*+,-./:;?@[\]^_`~)</span>
        <br></br> <br></br>
        <button onClick={onSubmit}>Generate Password</button>
        <br></br> <br></br>
        <label>Generated Password:</label>
        <br></br>
        <p id='passwordResult'>{userData}</p>
      </div>
    </div>
  )
}
