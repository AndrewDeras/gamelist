import React, { useState } from 'react';
import validator from 'validator';

import { useAuth } from '../../hooks/useAuth';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const { login, loading, error: loginError } = useAuth();


  const handleLogin = async (e) => {
    e.preventDefault();

    setError('');

    if (!validator.isEmail(email)) {
      setError('Invalid email');
      return;
    }

    if (password.length < 6) {
      setError('Password must be 6 or more characters');
      return;
    }

    const user = { email, password };

    const res = await login(user);

    console.log(res);


  }

  return (
    <div className="col-12 m-12">
      <h1>Login</h1>
      <form onSubmit={handleLogin} >
        <div className='mb-4'>
          <label className='form-label' htmlFor="emailLogin">Email:</label>
          <input
            autoComplete='on'
            className='form-control'
            type="email"
            name="email"
            id="emailLogin"
            value={email}
            onChange={({ target }) => setEmail(target.value)} />
        </div>
        <div className='mb-4'>
          <label className='form-label' htmlFor="passwordLogin">Password:</label>
          <input
            autoComplete='on'
            className='form-control'
            type="password"
            name="password"
            id="passwordLogin"
            value={password}
            onChange={({ target }) => setPassword(target.value)} />
        </div>
        <div className='mb-4'>
          {loading ? (
            <button className='formBtn btn btn btn-primary mt-auto' type="submit" disabled >Logging...</button>
          ) : (
            <button className='formBtn btn btn btn-primary mt-auto' type="submit" >Login</button>
          )}
        </div>
      </form>
      {error && <p className="error-msg" >{error}</p>}
      {loginError && <p className="error-msg" >{loginError}</p>}
    </div>
  )
}

export default Login