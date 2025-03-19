// src/components/authentication/Register.jsx

import React, { useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import UserAuthContext from '../context/UserAuthContext';
import { supabase } from '../../supabase';
import '../../styles/Register.css';

export default function Register() {
  const navigate = useNavigate();
  const { login } = useContext(UserAuthContext);

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  // You can update this with your own criteria
  const validateInputs = () => {
    // Very basic email pattern check
    const emailRegex = /^\S+@\S+\.\S+$/;
    if (!emailRegex.test(email)) {
      return 'Please enter a valid email address.';
    }
    if (password.length < 6) {
      return 'Password must be at least 6 characters.';
    }
    return null;
  };

  const handleSignUp = async (e) => {
    e.preventDefault();
    setError(null);

    // Basic front-end checks
    const validationError = validateInputs();
    if (validationError) {
      setError(validationError);
      return;
    }

    setLoading(true);

    try {
      // 1) Sign up user in Supabase
      const { data: signUpData, error: signUpError } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: {
            // Default name is whatever before '@' in email
            name: email.split('@')[0],
            // Provide a default avatar if you want:
            picture: 'https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png'
          }
        }
      });
      if (signUpError) {
        // Common error might be "User already registered"
        throw new Error(signUpError.message);
      }

      // 2) Immediately sign in
      const { data: signInData, error: signInError } = await supabase.auth.signInWithPassword({
        email,
        password
      });
      if (signInError) {
        throw new Error(signInError.message);
      }

      // 3) Update local context
      login(signInData.user);

      // 4) Navigate to homepage
      navigate('/');
    } catch (err) {
      setError(err.message || 'An error occurred during sign-up.');
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleSignIn = async () => {
    setLoading(true);
    setError(null);

    // If you have set "http://localhost:3000" as the "Site URL" in Supabase
    // and configured Google to match
    const { error } = await supabase.auth.signInWithOAuth({
      provider: 'google',
      options: {
        redirectTo: 'http://localhost:3000'
      }
    });

    if (error) setError(error.message);
    // We don't setLoading(false) because the user is redirected.
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
        Already have an account?{' '}
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
