import { useState } from "react";
import { useAuth } from "../../hooks/useAuth";

const Register = () => {
  const [userName, setUserName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const { createUser, error, loading } = useAuth();

  const handleSubmit = async (e) => {
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


  return (
    <div>
      <form onSubmit={handleSubmit} >
        <div>
          <label htmlFor="userName">Username:</label>
          <input type="text"
            name="userName"
            id="userName"
            value={userName}
            onChange={({ target }) => setUserName(target.value)} />
        </div>
        <div>
          <label htmlFor="email">Email:</label>
          <input type="email"
            name="email"
            id="email"
            value={email}
            onChange={({ target }) => setEmail(target.value)} />
        </div>
        <div>
          <label htmlFor="password">Password:</label>
          <input type="password"
            name="password"
            id="password"
            value={password}
            onChange={({ target }) => setPassword(target.value)} />
        </div>
        <div>
          <label htmlFor="confirmPassword">Confirm password:</label>
          <input type="password"
            name="confirmPassword"
            id="confirmPassword"
            value={confirmPassword}
            onChange={({ target }) => setConfirmPassword(target.value)}
          />
        </div>
        <div>
          {loading ? (
            <button type="submit" disabled >Creating account...</button>
          ) : (
            <button type="submit" >Create account</button>
          )}
        </div>

      </form>
      {error && <p>{error}</p>}
    </div>
  )
}

export default Register