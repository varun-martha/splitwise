import React from 'react';
import '../welcome/WelcomePage.css'
import { Link } from 'react-router-dom';

const WelcomePage = () => {
    return (
        <div className='container'>
            <h1 className='title'>Welcome to SplitWise Tracker Application</h1>
            <h3 className='tag-title'>Track, share and settle effortlessly</h3>
            <div>
                <Link to={'/login'}><button className='Hbutton'>Login</button></Link>
                <Link to={'/register'}><button className='Hbutton'>Register</button></Link>
            </div>
        </div>
    )
}

export default WelcomePage;