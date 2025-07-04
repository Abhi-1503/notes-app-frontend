var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState, useEffect, useCallback } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AiOutlineEye, AiOutlineEyeInvisible } from 'react-icons/ai';
import { FaSpinner } from 'react-icons/fa';
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
        if (token)
            navigate('/dashboard');
    }, [navigate]);
    const toggleOTPVisibility = () => setShowOTP((prev) => !prev);
    const handleSendOTP = () => __awaiter(void 0, void 0, void 0, function* () {
        var _a, _b;
        if (!email.trim()) {
            setMessage('Please enter your email');
            return;
        }
        try {
            setLoading(true);
            const res = yield fetch('http://localhost:5000/api/auth/send-otp-signin', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email }),
            });
            const data = yield res.json();
            if (res.ok) {
                setOtpSent(true);
                setMessage((_a = data.message) !== null && _a !== void 0 ? _a : 'OTP sent successfully');
                setTimeout(() => setOtpSent(false), 4000);
            }
            else {
                setMessage((_b = data.message) !== null && _b !== void 0 ? _b : 'Failed to send OTP');
            }
        }
        catch (err) {
            console.error('Send OTP Error:', err);
            setMessage('Failed to send OTP');
        }
        finally {
            setLoading(false);
        }
    });
    const handleVerifyOTP = (e) => __awaiter(void 0, void 0, void 0, function* () {
        var _a;
        e.preventDefault();
        if (!email || !otp) {
            setMessage('Please enter both email and OTP');
            return;
        }
        try {
            setLoading(true);
            const res = yield fetch('http://localhost:5000/api/auth/verify-otp', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email, otp }),
            });
            const data = yield res.json();
            if (res.ok && data.token) {
                localStorage.setItem('token', data.token);
                setMessage('Login successful!');
                navigate('/dashboard');
            }
            else {
                setMessage((_a = data.message) !== null && _a !== void 0 ? _a : 'Invalid OTP');
            }
        }
        catch (err) {
            console.error('Verify OTP Error:', err);
            setMessage('Something went wrong');
        }
        finally {
            setLoading(false);
        }
    });
    const handleGoogleSuccess = useCallback((response) => __awaiter(void 0, void 0, void 0, function* () {
        var _a;
        try {
            const res = yield fetch('http://localhost:5000/api/auth/google-login', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ credential: response.credential }),
            });
            const data = yield res.json();
            if (res.ok) {
                localStorage.setItem('token', data.token);
                navigate('/dashboard');
            }
            else {
                alert((_a = data.message) !== null && _a !== void 0 ? _a : 'Google login failed');
            }
        }
        catch (err) {
            console.error('Google login error:', err);
        }
    }), [navigate]);
    useEffect(() => {
        var _a;
        if ((_a = window.google) === null || _a === void 0 ? void 0 : _a.accounts) {
            window.google.accounts.id.initialize({
                client_id: import.meta.env.VITE_GOOGLE_CLIENT_ID,
                callback: handleGoogleSuccess,
            });
            window.google.accounts.id.renderButton(document.getElementById('google-signin-button'), { theme: 'outline', size: 'large', width: '100%' });
        }
    }, [handleGoogleSuccess]);
    return (_jsx("div", { className: "flex items-center justify-center min-h-screen px-4 bg-gray-50 font-inter", children: _jsxs("div", { className: "w-full max-w-md p-8 space-y-6 bg-white rounded-lg shadow-lg", children: [_jsxs("div", { className: "flex items-center justify-center space-x-2", children: [_jsx(FaSpinner, { className: "text-xl text-blue-500 animate-spin" }), _jsx("span", { className: "text-lg font-semibold", children: "HD" })] }), _jsx("h2", { className: "text-2xl font-bold text-center text-gray-800", children: "Sign In" }), _jsx("p", { className: "text-sm text-center text-gray-600", children: "Please login to continue to your account" }), _jsxs("form", { className: "space-y-4", onSubmit: handleVerifyOTP, children: [_jsxs("div", { className: "relative", children: [_jsx("input", { id: "email", type: "email", value: email, onChange: (e) => setEmail(e.target.value), className: "w-full px-4 pt-5 pb-2 border border-gray-300 rounded peer focus:outline-none focus:ring-2 focus:ring-blue-500", placeholder: " ", required: true }), _jsx("label", { htmlFor: "email", className: "absolute left-4 top-2 text-sm text-gray-500 transition-all peer-placeholder-shown:top-3.5 peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-400 peer-focus:top-2 peer-focus:text-sm peer-focus:text-blue-500", children: "Email" }), _jsxs("div", { className: "flex justify-between mt-1", children: [_jsx("button", { type: "button", onClick: handleSendOTP, className: "text-sm text-blue-600 hover:underline", children: "Send OTP" }), otpSent && (_jsx("span", { className: "flex items-center gap-1 text-sm text-green-600", children: "OTP sent" }))] })] }), _jsxs("div", { className: "relative", children: [_jsx("input", { id: "otp", type: showOTP ? 'text' : 'password', value: otp, onChange: (e) => setOtp(e.target.value), className: "w-full px-4 pt-5 pb-2 border border-gray-300 rounded peer focus:outline-none focus:ring-2 focus:ring-blue-500", placeholder: " ", required: true }), _jsx("label", { htmlFor: "otp", className: "absolute left-4 top-2 text-sm text-gray-500 transition-all peer-placeholder-shown:top-3.5 peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-400 peer-focus:top-2 peer-focus:text-sm peer-focus:text-blue-500", children: "OTP" }), _jsx("button", { type: "button", onClick: toggleOTPVisibility, className: "absolute right-3 top-3.5 text-gray-600", "aria-label": "Toggle OTP visibility", children: showOTP ? _jsx(AiOutlineEyeInvisible, { size: 20 }) : _jsx(AiOutlineEye, { size: 20 }) })] }), _jsx("button", { type: "submit", disabled: loading, className: "w-full py-2 text-white transition duration-200 bg-blue-600 rounded hover:bg-blue-700", children: loading ? 'Verifying...' : 'Sign In' }), _jsx("div", { id: "google-signin-button", className: "w-full" })] }), message && _jsx("p", { className: "mt-2 text-sm text-center text-blue-600", children: message }), _jsx("div", { className: "text-sm text-center", children: _jsx("a", { href: "#", className: "text-blue-600 hover:underline", children: "Forgot Password?" }) }), _jsxs("p", { className: "text-sm text-center text-gray-700", children: ["Need an account?", ' ', _jsx(Link, { to: "/signup", className: "text-blue-600 hover:underline", children: "Create One" })] })] }) }));
};
export default SignIn;
