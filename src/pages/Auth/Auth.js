// css
import './auth.css';

// hooks
import { useState } from 'react';

// components
import Login from '../../components/login/Login';
import Register from '../../components/register/Register';

const Auth = () => {
  const [option, setOption] = useState('login');

  const handleChoose = (e) => {
    const loginBtn = document.querySelector('.loginBtn');
    const registerBtn = document.querySelector('.registerBtn');

    const option = e.target;
    if (option.value === 'login') {
      if (loginBtn.classList.contains('selected')) return;
      loginBtn.classList.add('selected');
      registerBtn.classList.remove('selected');
      setOption('login');
    };

    if (option.value === 'register') {
      if (registerBtn.classList.contains('selected')) return;
      loginBtn.classList.remove('selected');
      registerBtn.classList.add('selected');
      setOption('createUser');
    };

  };

  return (
    <div className='forms-container'>

      <div className="choose">
        <h1>what I want to do?</h1>
        <div className="chooseBtn">
          <div className="loginCheck">
            <button value='login' onClick={handleChoose} className='btn btn-seconday loginBtn selected'>Login</button>
          </div>
          <h1>or</h1>
          <div className="registerCheck">
            <button value='register' onClick={handleChoose} className='btn btn-seconday registerBtn'>Register</button>
          </div>
        </div>
      </div>

      <div className="row">
        {option === 'login' ? (
          <Login />
        ) : (
          <Register />
        )}
      </div>
    </div>
  )
}

export default Auth