import { useState, useEffect, useCallback } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AiOutlineEye, AiOutlineEyeInvisible } from 'react-icons/ai';
import { FaSpinner } from 'react-icons/fa';

type GoogleCredentialResponse = {
  credential: string;
  select_by?: string;
  clientId?: string;
};

declare global {
  interface Window {
    google?: {
      accounts: {
        id: {
          initialize: (config: {
            client_id: string;
            callback: (response: GoogleCredentialResponse) => void;
          }) => void;
          renderButton: (
            parent: HTMLElement | null,
            options: { theme: string; size: string; width: string }
          ) => void;
        };
      };
    };
  }
}

const SignIn = () => {
  const [showOTP, setShowOTP] = useState(false);
  const [otpSent, setOtpSent] = useState(false);
  const [email, setEmail] = useState('');
  const [otp, setOtp] = useState('');
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) navigate('/dashboard');
  }, [navigate]);

  const toggleOTPVisibility = () => setShowOTP((prev) => !prev);

  const handleSendOTP = async () => {
    if (!email.trim()) {
      setMessage('Please enter your email');
      return;
    }

    try {
      setLoading(true);
      const res = await fetch('http://localhost:5000/api/auth/send-otp-signin', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email }),
      });

      const data = await res.json();
      if (res.ok) {
        setOtpSent(true);
        setMessage(data.message ?? 'OTP sent successfully');
        setTimeout(() => setOtpSent(false), 4000);
      } else {
        setMessage(data.message ?? 'Failed to send OTP');
      }
    } catch (err) {
      console.error('Send OTP Error:', err);
      setMessage('Failed to send OTP');
    } finally {
      setLoading(false);
    }
  };

  const handleVerifyOTP = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!email || !otp) {
      setMessage('Please enter both email and OTP');
      return;
    }

    try {
      setLoading(true);
      const res = await fetch('http://localhost:5000/api/auth/verify-otp', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, otp }),
      });

      const data = await res.json();
      if (res.ok && data.token) {
        localStorage.setItem('token', data.token);
        setMessage('Login successful!');
        navigate('/dashboard');
      } else {
        setMessage(data.message ?? 'Invalid OTP');
      }
    } catch (err) {
      console.error('Verify OTP Error:', err);
      setMessage('Something went wrong');
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleSuccess = useCallback(async (response: GoogleCredentialResponse) => {
    try {
      const res = await fetch('http://localhost:5000/api/auth/google-login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ credential: response.credential }),
      });

      const data = await res.json();
      if (res.ok) {
        localStorage.setItem('token', data.token);
        navigate('/dashboard');
      } else {
        alert(data.message ?? 'Google login failed');
      }
    } catch (err) {
      console.error('Google login error:', err);
    }
  }, [navigate]);

  useEffect(() => {
    if (window.google?.accounts) {
      window.google.accounts.id.initialize({
        client_id: import.meta.env.VITE_GOOGLE_CLIENT_ID,
        callback: handleGoogleSuccess,
      });

      window.google.accounts.id.renderButton(
        document.getElementById('google-signin-button'),
        { theme: 'outline', size: 'large', width: '100%' }
      );
    }
  }, [handleGoogleSuccess]);

  return (
    <div className="flex items-center justify-center min-h-screen px-4 bg-gray-50 font-inter">
      <div className="w-full max-w-md p-8 space-y-6 bg-white rounded-lg shadow-lg">
        <div className="flex items-center justify-center space-x-2">
          <FaSpinner className="text-xl text-blue-500 animate-spin" />
          <span className="text-lg font-semibold">HD</span>
        </div>

        <h2 className="text-2xl font-bold text-center text-gray-800">Sign In</h2>
        <p className="text-sm text-center text-gray-600">Please login to continue to your account</p>

        <form className="space-y-4" onSubmit={handleVerifyOTP}>
          <div className="relative">
            <input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 pt-5 pb-2 border border-gray-300 rounded peer focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder=" "
              required
            />
            <label htmlFor="email" className="absolute left-4 top-2 text-sm text-gray-500 transition-all peer-placeholder-shown:top-3.5 peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-400 peer-focus:top-2 peer-focus:text-sm peer-focus:text-blue-500">
              Email
            </label>
            <div className="flex justify-between mt-1">
              <button type="button" onClick={handleSendOTP} className="text-sm text-blue-600 hover:underline">
                Send OTP
              </button>
              {otpSent && (
                <span className="flex items-center gap-1 text-sm text-green-600">
                  OTP sent
                </span>
              )}
            </div>
          </div>

          <div className="relative">
            <input
              id="otp"
              type={showOTP ? 'text' : 'password'}
              value={otp}
              onChange={(e) => setOtp(e.target.value)}
              className="w-full px-4 pt-5 pb-2 border border-gray-300 rounded peer focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder=" "
              required
            />
            <label htmlFor="otp" className="absolute left-4 top-2 text-sm text-gray-500 transition-all peer-placeholder-shown:top-3.5 peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-400 peer-focus:top-2 peer-focus:text-sm peer-focus:text-blue-500">
              OTP
            </label>
            <button
              type="button"
              onClick={toggleOTPVisibility}
              className="absolute right-3 top-3.5 text-gray-600"
              aria-label="Toggle OTP visibility"
            >
              {showOTP ? <AiOutlineEyeInvisible size={20} /> : <AiOutlineEye size={20} />}
            </button>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full py-2 text-white transition duration-200 bg-blue-600 rounded hover:bg-blue-700"
          >
            {loading ? 'Verifying...' : 'Sign In'}
          </button>

          <div id="google-signin-button" className="w-full" />
        </form>

        {message && <p className="mt-2 text-sm text-center text-blue-600">{message}</p>}

        <div className="text-sm text-center">
          <a href="#" className="text-blue-600 hover:underline">Forgot Password?</a>
        </div>

        <p className="text-sm text-center text-gray-700">
          Need an account?{' '}
          <Link to="/signup" className="text-blue-600 hover:underline">
            Create One
          </Link>
        </p>
      </div>
    </div>
  );
};

export default SignIn;
