'use client'

import { useForm } from 'react-hook-form'
import { useState } from 'react'
import '../../users/common-design/login.css' // adjust path as needed

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
    formState: { errors }
  } = useForm<SigninForm>()

  const onSubmit = (data: SigninForm) => {
    console.log(data)
    setMessage(`✅ Account created for ${data.name}`)
  }

  return (
    <div className='container'>
      <div className='card'>
        <h1 className='title'>Login</h1>
        <form onSubmit={handleSubmit(onSubmit)} className='form'>
          {/* Name */}

          {/* Email */}
          <div>
            <label className='label'>Email</label>
            <input
              type='email'
              {...register('email', {
                required: 'Email is required',
                pattern: { value: /\S+@\S+\.\S+/, message: 'Invalid email' },
                validate: value =>
                  value.trim() !== '' || 'Email cannot be empty or spaces only'
              })}
              className='input'
            />
            {errors.email && <p className='error'>{errors.email.message}</p>}
          </div>

          {/* Password */}
          <div>
            <label className='label'>Password</label>
            <input
              type='password'
              {...register('password', {
                required: 'Password is required',
                minLength: { value: 6, message: 'At least 6 characters' },
                validate: value =>
                  value.trim() !== '' ||
                  'Password cannot be empty or spaces only'
              })}
              className='input'
            />
            {errors.password && (
              <p className='error'>{errors.password.message}</p>
            )}
          </div>

          {/* Submit */}
          <button type='submit' className='button'>
            Sign In
          </button>
           <button type='reset' className='button_two'>
            Reset
          </button>
        </form>

        {message && <p className='message'>{message}</p>}
      </div>
    </div>
  )
}
