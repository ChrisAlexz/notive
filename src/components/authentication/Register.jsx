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

  // We’ll use "error" for sign-up errors, "message" for success info
  const [error, setError] = useState(null);
  const [message, setMessage] = useState(null);
  const [loading, setLoading] = useState(false);

  // Optional: front-end validation
  const validateInputs = () => {
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
    setMessage(null);

    const validationError = validateInputs();
    if (validationError) {
      setError(validationError);
      return;
    }

    setLoading(true);
    try {
      // 1. Create a new user (unconfirmed) in Supabase
      const { data, error: signUpError } = await supabase.auth.signUp({
        email,
        password,
        options: {
          // The user must click a link in their email.
          // This is the redirect URL after they click "Confirm Email"
          emailRedirectTo: 'http://localhost:3000/login',
          data: {
            // some default user_metadata
            name: email.split('@')[0],
            picture: 'https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png'
          }
        }
      });
      if (signUpError) throw signUpError;

      // 2. Tell them to check their email
      setMessage(
        `A confirmation link has been sent to ${email}. Please check your inbox (and spam folder) to verify your account.`
      );

      // We do NOT log them in immediately. They are unconfirmed until they click the link.

    } catch (err) {
      // e.g. "User already registered" or "Invalid email"
      setError(err.message || 'An error occurred during sign-up.');
    } finally {
      setLoading(false);
    }
  };

  // (Optional) If you still want Google sign-in
  const handleGoogleSignIn = async () => {
    setLoading(true);
    setError(null);
    const { error } = await supabase.auth.signInWithOAuth({
      provider: 'google',
      options: { redirectTo: 'http://localhost:3000' }
    });
    if (error) setError(error.message);
    // no setLoading(false) because redirect
  };

  return (
    <div className="register-container">
      <h2>Create an Account</h2>

      {/* Show errors if any */}
      {error && <div className="alert alert-danger">{error}</div>}

      {/* Show success message if any */}
      {message && <div className="alert alert-success">{message}</div>}

      {/* If the user hasn’t gotten the success message, show the sign-up form. 
          If you prefer, you can also keep the form visible so they can re-try with a different email. */}
      {!message && (
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
            placeholder="Password (min 6 chars)"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />

          <button type="submit" disabled={loading}>
            {loading ? 'Signing up...' : 'Sign Up'}
          </button>
        </form>
      )}

      {/* Only show these if user hasn’t confirmed */}
      {!message && (
        <>
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
        </>
      )}
    </div>
  );
}
