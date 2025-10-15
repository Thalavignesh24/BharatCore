'use client'

import { useForm } from 'react-hook-form'
import { useState } from 'react'

type SigninForm = {
  name: string
  email: string
  password: string
  confirmPassword: string
}

export default function SignupPage () {
  const [message, setMessage] = useState<string | null>(null)

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors }
  } = useForm<SigninForm>()

  const onSubmit = () => {
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

    let data = {
      length: parseInt(passwordLength.value) || 0,
      numbers: numbers.checked || false,
      uppercase: uppercase.checked || false,
      lowercase: lowercase.checked || false,
      symbols: specialcase.checked || false
    }
    console.log(data)
  }

  return (
    <div className='container'>
      <label>Password Length:</label>
      <input type='number' className='passwordLength'></input>
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
    </div>
  )
}
