import { useState, useEffect, useCallback } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AiOutlineCalendar } from 'react-icons/ai';
import { FaSpinner } from 'react-icons/fa';

const SignUp = () => {
  const [dob, setDob] = useState('');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [otp, setOtp] = useState('');
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);
  const [showOtpBox, setShowOtpBox] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) navigate('/dashboard');
  }, [navigate]);

  const handleGetOtp = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!email || !name || !dob) return alert('Please fill all the fields.');

    try {
      setLoading(true);
      const res = await fetch('http://localhost:5000/api/auth/send-otp-signup', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, name, dob }),
      });

      const data = await res.json();
      if (res.ok) {
        setMessage(data.message ?? 'OTP sent successfully');
        setShowOtpBox(true);
      } else {
        setMessage(data.message ?? 'Failed to send OTP');
      }
    } catch (err) {
      console.error('Error sending OTP:', err);
      setMessage('Failed to send OTP.');
    } finally {
      setLoading(false);
    }
  };

  const handleVerifyOtp = async () => {
    if (!otp.trim()) return alert('Please enter the OTP');

    try {
      setLoading(true);
      const res = await fetch('http://localhost:5000/api/auth/verify-otp', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, otp }),
      });

      const data = await res.json();
      if (res.ok) {
        localStorage.setItem('token', data.token);
        setMessage('Verification successful!');
        setTimeout(() => navigate('/dashboard'), 1500);
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

  const handleGoogleSuccess = useCallback(async (response: { credential: string }) => {
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
    <div className="relative flex items-center justify-center min-h-screen px-4 bg-gray-50 font-inter">
      <div className="z-10 w-full max-w-sm p-6 space-y-6 bg-white shadow-md rounded-2xl">
        <div className="flex items-center justify-center space-x-2">
          <FaSpinner className="text-xl text-blue-500 animate-spin" />
          <span className="text-lg font-semibold">HD</span>
        </div>

        <h2 className="text-2xl font-bold text-center text-gray-800">Sign up</h2>
        <p className="text-sm text-center text-gray-500">Sign up to enjoy the feature of HD</p>

        <form className="space-y-4" onSubmit={handleGetOtp}>
          <div className="relative">
            <input
              id="name"
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder=" "
              required
              className="w-full px-4 pt-5 pb-2 text-sm border border-gray-300 rounded-lg peer focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <label htmlFor="name" className="absolute left-4 top-2 text-sm text-gray-500 transition-all peer-placeholder-shown:top-3.5 peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-400 peer-focus:top-2 peer-focus:text-sm peer-focus:text-blue-500">
              Your Name
            </label>
          </div>

          <div className="relative">
            <input
              id="dob"
              type="date"
              value={dob}
              onChange={(e) => setDob(e.target.value)}
              required
              className="w-full px-10 pt-5 pb-2 text-sm border border-gray-300 rounded-lg peer focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <label htmlFor="dob" className="absolute left-10 -top-2 text-xs bg-white px-1 text-gray-500 transition-all peer-placeholder-shown:top-3.5 peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-400 peer-focus:-top-2 peer-focus:text-xs peer-focus:text-blue-500">
              Date of Birth
            </label>
            <AiOutlineCalendar className="absolute left-3 top-3.5 text-gray-500 text-lg" />
          </div>

          <div className="relative">
            <input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder=" "
              required
              className="w-full px-4 pt-5 pb-2 text-sm border border-blue-500 rounded-lg peer focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <label htmlFor="email" className="absolute left-4 top-2 text-sm text-gray-500 transition-all peer-placeholder-shown:top-3.5 peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-400 peer-focus:top-2 peer-focus:text-sm peer-focus:text-blue-500">
              Email
            </label>
          </div>

          <button
            type="submit"
            className="w-full py-2 text-sm font-semibold text-white transition bg-blue-600 rounded-lg hover:bg-blue-700"
            disabled={loading}
          >
            {loading ? 'Sending OTP...' : 'Get OTP'}
          </button>

          {message && <p className="text-sm text-center text-green-600">{message}</p>}

          <div id="google-signin-button" className="w-full" />
        </form>

        <p className="text-sm text-center text-gray-600">
          Already have an account?{' '}
          <Link to="/signin" className="font-medium text-blue-600">Sign in</Link>
        </p>
      </div>

      {showOtpBox && (
        <div className="absolute top-0 left-0 z-20 flex items-center justify-center w-full h-full bg-black bg-opacity-40">
          <div className="w-full max-w-xs p-4 space-y-4 bg-white rounded-lg shadow-lg">
            <h3 className="text-lg font-semibold text-center text-gray-800">Verify OTP</h3>
            <input
              type="text"
              value={otp}
              onChange={(e) => setOtp(e.target.value)}
              placeholder="Enter OTP"
              className="w-full px-3 py-2 border rounded"
            />
            <button
              onClick={() => { handleVerifyOtp(); }}
              className="w-full py-2 text-white bg-blue-600 rounded hover:bg-blue-700"
              disabled={loading}
            >
              {loading ? 'Verifying...' : 'Verify'}
            </button>
            {message && (
              <p className={`text-sm text-center ${message.includes('success') ? 'text-green-600' : 'text-red-600'}`}>
                {message}
              </p>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default SignUp;
