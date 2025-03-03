import React, { useContext } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import './LoginPage.css';
import { SubmitHandler, useForm } from 'react-hook-form';
import Credentials from '../../types/Credentials';
import { GlobalContext } from '../../context/context.tsx';

const LoginPage = () => {

    const {setUser} = useContext(GlobalContext);

    const {
        register,
        handleSubmit,
        formState: {errors},
        reset
    } = useForm<Credentials>();

    const navigate = useNavigate();
    const login: SubmitHandler<Credentials> = async(credentials) => {
        try{
            const response = await fetch(`${process.env.REACT_APP_BASE_URL}/login`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(credentials)
            });
            if(response.ok) {
                const result = await response.json();
                alert(result.message);
                console.log(result.user.name);
                setUser({
                    username: result.user.name,
                    email:result.user.email,
                    mobileNumber: result.user.mobileNumber
                });
                navigate('/home');
            } else{
                const result = await response.json();
                alert(result.message);
            }
        } catch(err){
            alert('Error occurred');
        } finally{
            reset();
        }
    }

  return (
    <div className='login-container'>
        <form className='login-form-container' onSubmit={handleSubmit(login)}>
            <p className='login-heading'>Login!</p>
            <div className='login-field-container'>
                <label htmlFor='username'>Username</label>
                <input type="text" id="username" {...register('username', {required: true}) } />
                {errors.username && <span className='error-message'>Please enter a username</span>}
            </div>
            <div className='login-field-container'>
                <label htmlFor='password'>Password</label>
                <input type="password" id='password' {...register('password', {required: true}) }/>
                {errors.password && <span className='error-message'>Please enter a password</span>}
            </div>
            <span>
                <span>Don't you have an account ? </span><span className='register-text'><Link to='/register'>Register here</Link></span>
            </span>
            <button className='login-button' type='submit'>Login</button>
        </form>
    </div>
  )
}

export default LoginPage;