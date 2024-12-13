import React from 'react'
import { Link, useNavigate } from 'react-router-dom';
import './RegisterPage.css'
import { SubmitHandler, useForm } from 'react-hook-form';
import dotenv from 'dotenv';
import User from '../../types/User';
dotenv.config();

const RegisterPage = () => {
     const {
        register,
        handleSubmit,
        formState: {errors},
        reset
    } = useForm<User>();
    const navigate = useNavigate();

    const handleRegister: SubmitHandler<User> = async(user) => {
        try{
            const response = await fetch(`${process.env.BASE_URL}/users`, {
                method: "POST",
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(user)
                
            });
            if(response.ok){
                alert("Successfully registered");
                navigate('/login');
            } else{
                const result = await response.json();
                alert(result.message);
            }
        } catch(err){
            alert('Network Error');
        } finally{
            reset();
        }
    }

  return (
    <div className='register-container'>
        <form className='register-form-container' onSubmit={handleSubmit(handleRegister)}>
            <p className='register-heading'>Register!</p>
            <div className='field-container'>
                <label htmlFor='username'>Username</label>
                <input type="text" id="username" {...register('name', {required: true}) } />
                {errors.name && <span className='error-message'>Please enter name</span>}
            </div>
            <div className='field-container'>
                <label htmlFor='pass'>Password</label>
                <input type="password" id='pass' {...register('password', {required: true}) }/>
                {errors.password && <span className='error-message'>Please enter password</span>}
            </div>
            <div className='field-container'>
                <label htmlFor='mail'>Email</label>
                <input type="email" id="mail" {...register('email', {required: true}) }/>
                {errors.email && <span className='error-message'>Please enter email</span>}
            </div>
            <div className='field-container'>
                <label htmlFor='mobile'>Mobile Number</label>
                <input type="number" id="mobile" {...register('mobileNumber', {required: true}) }/>
                {errors.mobileNumber && <span className='error-message'>Please enter phone number</span>}
            </div>
            <button className='button' type='submit'>Register</button>
            <span>
                <span>Already have an account ? </span> <span className='login-text'><Link to='/login'>Login here</Link></span>
            </span>
        </form>
    </div>
  )
}

export default RegisterPage;