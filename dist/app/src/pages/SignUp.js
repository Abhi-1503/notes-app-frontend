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
        if (token)
            navigate('/dashboard');
    }, [navigate]);
    const handleGetOtp = (e) => __awaiter(void 0, void 0, void 0, function* () {
        var _a, _b;
        e.preventDefault();
        if (!email || !name || !dob)
            return alert('Please fill all the fields.');
        try {
            setLoading(true);
            const res = yield fetch('http://localhost:5000/api/auth/send-otp-signup', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email, name, dob }),
            });
            const data = yield res.json();
            if (res.ok) {
                setMessage((_a = data.message) !== null && _a !== void 0 ? _a : 'OTP sent successfully');
                setShowOtpBox(true);
            }
            else {
                setMessage((_b = data.message) !== null && _b !== void 0 ? _b : 'Failed to send OTP');
            }
        }
        catch (err) {
            console.error('Error sending OTP:', err);
            setMessage('Failed to send OTP.');
        }
        finally {
            setLoading(false);
        }
    });
    const handleVerifyOtp = () => __awaiter(void 0, void 0, void 0, function* () {
        var _a;
        if (!otp.trim())
            return alert('Please enter the OTP');
        try {
            setLoading(true);
            const res = yield fetch('http://localhost:5000/api/auth/verify-otp', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email, otp }),
            });
            const data = yield res.json();
            if (res.ok) {
                localStorage.setItem('token', data.token);
                setMessage('Verification successful!');
                setTimeout(() => navigate('/dashboard'), 1500);
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
    return (_jsxs("div", { className: "relative flex items-center justify-center min-h-screen px-4 bg-gray-50 font-inter", children: [_jsxs("div", { className: "z-10 w-full max-w-sm p-6 space-y-6 bg-white shadow-md rounded-2xl", children: [_jsxs("div", { className: "flex items-center justify-center space-x-2", children: [_jsx(FaSpinner, { className: "text-xl text-blue-500 animate-spin" }), _jsx("span", { className: "text-lg font-semibold", children: "HD" })] }), _jsx("h2", { className: "text-2xl font-bold text-center text-gray-800", children: "Sign up" }), _jsx("p", { className: "text-sm text-center text-gray-500", children: "Sign up to enjoy the feature of HD" }), _jsxs("form", { className: "space-y-4", onSubmit: handleGetOtp, children: [_jsxs("div", { className: "relative", children: [_jsx("input", { id: "name", type: "text", value: name, onChange: (e) => setName(e.target.value), placeholder: " ", required: true, className: "w-full px-4 pt-5 pb-2 text-sm border border-gray-300 rounded-lg peer focus:outline-none focus:ring-2 focus:ring-blue-500" }), _jsx("label", { htmlFor: "name", className: "absolute left-4 top-2 text-sm text-gray-500 transition-all peer-placeholder-shown:top-3.5 peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-400 peer-focus:top-2 peer-focus:text-sm peer-focus:text-blue-500", children: "Your Name" })] }), _jsxs("div", { className: "relative", children: [_jsx("input", { id: "dob", type: "date", value: dob, onChange: (e) => setDob(e.target.value), required: true, className: "w-full px-10 pt-5 pb-2 text-sm border border-gray-300 rounded-lg peer focus:outline-none focus:ring-2 focus:ring-blue-500" }), _jsx("label", { htmlFor: "dob", className: "absolute left-10 -top-2 text-xs bg-white px-1 text-gray-500 transition-all peer-placeholder-shown:top-3.5 peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-400 peer-focus:-top-2 peer-focus:text-xs peer-focus:text-blue-500", children: "Date of Birth" }), _jsx(AiOutlineCalendar, { className: "absolute left-3 top-3.5 text-gray-500 text-lg" })] }), _jsxs("div", { className: "relative", children: [_jsx("input", { id: "email", type: "email", value: email, onChange: (e) => setEmail(e.target.value), placeholder: " ", required: true, className: "w-full px-4 pt-5 pb-2 text-sm border border-blue-500 rounded-lg peer focus:outline-none focus:ring-2 focus:ring-blue-500" }), _jsx("label", { htmlFor: "email", className: "absolute left-4 top-2 text-sm text-gray-500 transition-all peer-placeholder-shown:top-3.5 peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-400 peer-focus:top-2 peer-focus:text-sm peer-focus:text-blue-500", children: "Email" })] }), _jsx("button", { type: "submit", className: "w-full py-2 text-sm font-semibold text-white transition bg-blue-600 rounded-lg hover:bg-blue-700", disabled: loading, children: loading ? 'Sending OTP...' : 'Get OTP' }), message && _jsx("p", { className: "text-sm text-center text-green-600", children: message }), _jsx("div", { id: "google-signin-button", className: "w-full" })] }), _jsxs("p", { className: "text-sm text-center text-gray-600", children: ["Already have an account?", ' ', _jsx(Link, { to: "/signin", className: "font-medium text-blue-600", children: "Sign in" })] })] }), showOtpBox && (_jsx("div", { className: "absolute top-0 left-0 z-20 flex items-center justify-center w-full h-full bg-black bg-opacity-40", children: _jsxs("div", { className: "w-full max-w-xs p-4 space-y-4 bg-white rounded-lg shadow-lg", children: [_jsx("h3", { className: "text-lg font-semibold text-center text-gray-800", children: "Verify OTP" }), _jsx("input", { type: "text", value: otp, onChange: (e) => setOtp(e.target.value), placeholder: "Enter OTP", className: "w-full px-3 py-2 border rounded" }), _jsx("button", { onClick: () => { handleVerifyOtp(); }, className: "w-full py-2 text-white bg-blue-600 rounded hover:bg-blue-700", disabled: loading, children: loading ? 'Verifying...' : 'Verify' }), message && (_jsx("p", { className: `text-sm text-center ${message.includes('success') ? 'text-green-600' : 'text-red-600'}`, children: message }))] }) }))] }));
};
export default SignUp;
