import React, { useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import AuthContext from './context/AuthContext';
import '../styles/Register.css';
// import { supabase } from '../supabase'; // If you want to do Supabase Auth

const Register = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const { login } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    // Example: If you had Supabase auth:
    /*
    const { data, error } = await supabase.auth.signUp({
      email,
      password
    });
    if (error) {
      setError(error.message);
      return;
    }
    // On success:
    login(data.user);
    navigate('/');
    */
    // For now, we’ll just “pretend” success:
    login({ email });
    navigate('/');
  };

  return (
    <div className="register-container">
      <h2>Create an Account</h2>
      {error && <div className="alert alert-danger">{error}</div>}
      <form className="register-form" onSubmit={handleSubmit}>
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <button type="submit">Sign Up</button>
      </form>
      <p>
        Already have an account? 
        <span onClick={() => navigate('/login')}> Log In</span>
      </p>
    </div>
  );
};

export default Register;
