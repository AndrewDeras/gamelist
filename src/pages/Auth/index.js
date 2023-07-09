// css
import './index.css';

import { useState } from "react";
import { useAuth } from "../../hooks/useAuth";

const Auth = () => {
  const [userName, setUserName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const { createUser, error, loading } = useAuth();

  const handleCreateUser = async (e) => {
    e.preventDefault();
    const user = { userName, email, password };

    if (!userName || !email || !password || !confirmPassword) {
      return alert('Nao pode ter campos vazios');
    }

    if (password !== confirmPassword) {
      return alert('Senhas não são iguais');
    }

    const res = await createUser(user);

    console.log(res);

  };

  const handleLogin = async (e) => {
    e.preventDefault();
  }


  return (
    <div className='forms-container'>
      <div className="row">
        <div className="col-12 m-12">
          <h1>Login</h1>
          <form onSubmit={handleLogin} >
            <div className='mb-4'>
              <label className='form-label' htmlFor="emailLogin">Email:</label>
              <input
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
                className='form-control'
                type="password"
                name="password"
                id="passwordLogin"
                value={password}
                onChange={({ target }) => setPassword(target.value)} />
            </div>
            <div className='mb-4'>
              {loading ? (
                <button className='btn btn btn-primary mt-auto' type="submit" disabled >Logging...</button>
              ) : (
                <button className='btn btn btn-primary mt-auto' type="submit" >Login</button>
              )}
            </div>
          </form>
        </div>

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
        </div>
      </div>

      {error && <p>{error}</p>}
    </div>
  )
}

export default Auth