'use client'

import { useForm } from 'react-hook-form'
import { useState } from 'react'
import '../../users/common-design/register.css' // adjust path as needed

type SignupForm = {
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
  } = useForm<SignupForm>()

  const onSubmit = (data: SignupForm) => {
    setMessage(`✅ Account created for ${data.name}`)
  }

  return (
    <div className='container'>
      <div className='card'>
        <h1 className='title'>Create Account</h1>
        <form onSubmit={handleSubmit(onSubmit)} className='form'>
          {/* Name */}
          <div>
            <label className='label'>Name</label>
            <input
              type='text'
              {...register('name', {
                required: 'Name is required',
                validate: value =>
                  value.trim() !== '' || 'Name cannot be empty or spaces only'
              })}
              className='input'
            />
            {errors.name && (
              <p className='error' id='nameErr'>
                {errors.name.message}
              </p>
            )}
          </div>

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

          {/* Confirm Password */}
          <div>
            <label className='label'>Confirm Password</label>
            <input
              type='password'
              {...register('confirmPassword', {
                required: 'Confirm your password',
                validate: val =>
                  val === watch('password') || 'Passwords do not match'
              })}
              className='input'
            />
            {errors.confirmPassword && (
              <p className='error'>{errors.confirmPassword.message}</p>
            )}
          </div>

          {/* Submit */}
          <button type='submit' className='button'>
            Sign Up
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
