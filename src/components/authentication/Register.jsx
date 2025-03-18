// component/authention/Register.jsx
import React, { useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import AuthContext from '../context/AuthContext';
import { supabase } from '../../supabase';
import '../../styles/Register.css';

export default function Register() {
  const navigate = useNavigate();
  const { login } = useContext(AuthContext);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleSignUp = async (e) => {
    e.preventDefault();
    setError(null);
    setLoading(true);

    try {
      // First sign up the user
// Update the options.data in the signUp call
      const { data: signUpData, error: signUpError } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: {
            name: email.split('@')[0] // Changed from full_name to name
          }
        }
      });

      if (signUpError) throw signUpError;

      // Immediately sign in after successful sign-up
      const { data: signInData, error: signInError } = await supabase.auth.signInWithPassword({
        email,
        password
      });

      if (signInError) throw signInError;

      login(signInData.user);
      navigate('/');
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleSignIn = async () => {
    setLoading(true);
    setError(null);
    const { error } = await supabase.auth.signInWithOAuth({
      provider: 'google',
      options: {
        redirectTo: window.location.origin
      }
    });
    if (error) setError(error.message);
    setLoading(false);
  };

  return (
    <div className="register-container">
      <h2>Create an Account</h2>
      {error && <div className="alert alert-danger">{error}</div>}

      <form className="register-form" onSubmit={handleSignUp}>
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
        <button type="submit" disabled={loading}>
          {loading ? 'Signing up...' : 'Sign Up'}
        </button>
      </form>

      <p style={{ margin: '20px 0' }}>Or</p>

      <button
        className="google-button"
        onClick={handleGoogleSignIn}
        disabled={loading}
      >
        Continue with Google
      </button>

      <p style={{ color: 'white' }}>
        Already have an account?
        <span 
          style={{ marginLeft: '5px', cursor: 'pointer', color: '#4facfe' }}
          onClick={() => navigate('/login')}
        >
          Log In
        </span>
      </p>
    </div>
  );
}