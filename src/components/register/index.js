import React, { useState } from 'react';
import validator from 'validator';

//hooks
import { useAuth } from "../../hooks/useAuth";


const Register = () => {
  const [userName, setUserName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');

  const { createUser, error: registerError, loading } = useAuth();

  const handleCreateUser = async (e) => {
    e.preventDefault();
    setError('');

    if (!userName || !email || !password || !confirmPassword) {
      setError('There are empty fields');
      return;
    }

    if (userName.length < 3) {
      setError('Username must be 3 or more characters');
      return;
    }

    if (!validator.isEmail(email)) {
      setEmail('Invalid email.');
      return;
    }

    if (password.length < 6 || confirmPassword.length < 6) {
      setError('Password fields must be 6 or more characters');
      return;
    }

    if (password !== confirmPassword) {
      setError('Passwords do not match');
      return;
    }

    const user = { userName, email, password };

    const res = await createUser(user);

    console.log(res);

  };

  return (
    <div className="col-12 m-12">
      <h1>Create account</h1>
      <form onSubmit={handleCreateUser} >
        <div className='mb-4'>
          <label className='form-label' htmlFor="userName">Username:</label>
          <input
            className='form-control'
            type="text"
            name="userName"
            id="userName"
            value={userName}
            onChange={({ target }) => setUserName(target.value)} />
        </div>
        <div className='mb-4'>
          <label className='form-label' htmlFor="email">Email:</label>
          <input
            className='form-control'
            type="email"
            name="email"
            id="email"
            value={email}
            onChange={({ target }) => setEmail(target.value)} />
        </div>
        <div className='mb-4'>
          <label className='form-label' htmlFor="password">Password:</label>
          <input
            className='form-control'
            type="password"
            name="password"
            id="password"
            value={password}
            onChange={({ target }) => setPassword(target.value)} />
        </div>
        <div className='mb-4'>
          <label className='form-label' htmlFor="confirmPassword">Confirm password:</label>
          <input
            className='form-control'
            type="password"
            name="confirmPassword"
            id="confirmPassword"
            value={confirmPassword}
            onChange={({ target }) => setConfirmPassword(target.value)}
          />
        </div>
        <div className='mb-4'>
          {loading ? (
            <button className='btn btn btn-primary mt-auto' type="submit" disabled >Creating account...</button>
          ) : (
            <button className='btn btn btn-primary mt-auto' type="submit" >Create account</button>
          )}
        </div>
      </form>
      {error && <p className="error-msg" >{error}</p>}
      {registerError && <p className="error-msg" >{registerError}</p>}
    </div>
  )
}

export default Register