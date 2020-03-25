import React from 'react';
import Logo from './components/logo/logo'
import './index.scss'
import LoginForm from './components/loginForm/index';
const AdminLogin = () => {
    return (
        <div className='AdminLogin'>
            <Logo />
            <LoginForm />
        </div>
    );
}

export default AdminLogin