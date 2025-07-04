import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useEffect, useState, useCallback } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { FiEdit, FiTrash2, FiLogOut, FiSun, FiMoon } from 'react-icons/fi';
import { FaSpinner } from 'react-icons/fa';
export default function Dashboard() {
    const [notes, setNotes] = useState([]);
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');
    const [isCreating, setIsCreating] = useState(false);
    const [editingId, setEditingId] = useState(null);
    const [user, setUser] = useState({ name: '', email: '' });
    const [darkMode, setDarkMode] = useState(false);
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();
    const token = localStorage.getItem('token');
    const fetchNotes = useCallback(async () => {
        try {
            setLoading(true);
            const res = await axios.get('/api/notes', {
                headers: { Authorization: `Bearer ${token}` },
            });
            setNotes(res.data);
        }
        catch (error) {
            console.error('❌ Failed to fetch notes', error);
        }
        finally {
            setLoading(false);
        }
    }, [token]);
    const fetchUser = useCallback(async () => {
        try {
            const res = await axios.get('/api/user', {
                headers: { Authorization: `Bearer ${token}` },
            });
            setUser(res.data);
        }
        catch (error) {
            console.error('❌ Failed to fetch user', error);
        }
    }, [token]);
    const handleAddOrUpdateNote = async () => {
        if (!title.trim() || !content.trim())
            return;
        try {
            setLoading(true);
            if (editingId) {
                await axios.put(`/api/notes/${editingId}`, { title, content }, {
                    headers: { Authorization: `Bearer ${token}` },
                });
                setEditingId(null);
            }
            else {
                await axios.post('/api/notes', { title, content }, {
                    headers: { Authorization: `Bearer ${token}` },
                });
            }
            setTitle('');
            setContent('');
            setIsCreating(false);
            fetchNotes();
        }
        catch (error) {
            console.error('❌ Failed to save note', error);
        }
        finally {
            setLoading(false);
        }
    };
    const handleEdit = (note) => {
        setTitle(note.title);
        setContent(note.content);
        setEditingId(note._id);
        setIsCreating(true);
    };
    const handleDelete = async (id) => {
        try {
            setLoading(true);
            await axios.delete(`/api/notes/${id}`, {
                headers: { Authorization: `Bearer ${token}` },
            });
            fetchNotes();
        }
        catch (error) {
            console.error('❌ Failed to delete note', error);
        }
        finally {
            setLoading(false);
        }
    };
    const handleLogout = () => {
        localStorage.removeItem('token');
        navigate('/signin');
    };
    const toggleDarkMode = () => {
        document.documentElement.classList.toggle('dark');
        setDarkMode(!darkMode);
    };
    const getGreeting = () => {
        const hour = new Date().getHours();
        if (hour < 12)
            return 'Good morning';
        if (hour < 18)
            return 'Good afternoon';
        return 'Good evening';
    };
    useEffect(() => {
        const init = async () => {
            if (!token) {
                navigate('/signin');
                return;
            }
            await fetchUser();
            await fetchNotes();
        };
        init();
    }, [token, navigate, fetchUser, fetchNotes]);
    return (_jsxs("div", { className: "min-h-screen p-4 transition-all bg-gray-100 dark:bg-gray-900 dark:text-white font-inter", children: [_jsxs("header", { className: "flex flex-col gap-3 mb-6 sm:flex-row sm:justify-between sm:items-center", children: [_jsxs("div", { className: "flex items-center space-x-2", children: [_jsx(FaSpinner, { className: "text-xl text-blue-500 animate-spin" }), _jsx("span", { className: "text-lg font-semibold", children: "HD" })] }), _jsxs("div", { className: "flex items-center gap-3", children: [_jsx("button", { onClick: toggleDarkMode, className: "p-2 text-xl bg-gray-200 rounded-full dark:bg-gray-700", title: "Toggle dark mode", children: darkMode ? _jsx(FiSun, {}) : _jsx(FiMoon, {}) }), _jsxs("button", { onClick: handleLogout, className: "flex items-center px-4 py-2 text-white bg-red-500 rounded hover:bg-red-600", children: [_jsx(FiLogOut, { className: "mr-2" }), " Sign Out"] })] })] }), _jsxs("div", { className: "p-6 mb-6 transition-all duration-500 rounded-lg shadow-lg bg-gradient-to-r from-purple-500 via-pink-500 to-red-500 animate-fade-in", children: [_jsxs("h2", { className: "mb-1 text-2xl font-bold text-white drop-shadow", children: [getGreeting(), ", ", user.name || user.email || 'User', "!"] }), _jsxs("p", { className: "text-white break-all opacity-90", children: ["Logged in as: ", user.email || user.name || 'User'] })] }), _jsx("div", { className: "mb-6", children: !isCreating ? (_jsx("button", { className: "px-6 py-2 mb-4 text-white bg-blue-600 rounded hover:bg-blue-700", onClick: () => setIsCreating(true), children: "Create Note" })) : (_jsxs("div", { className: "space-y-2", children: [_jsx("input", { className: "w-full p-2 border rounded dark:bg-gray-800 dark:border-gray-700", value: title, placeholder: "Title", onChange: (e) => setTitle(e.target.value) }), _jsx("textarea", { className: "w-full p-2 border rounded dark:bg-gray-800 dark:border-gray-700", value: content, placeholder: "Content", onChange: (e) => setContent(e.target.value) }), _jsxs("div", { className: "flex gap-2", children: [_jsx("button", { className: "px-4 py-2 text-white bg-green-600 rounded hover:bg-green-700", onClick: handleAddOrUpdateNote, disabled: loading, children: editingId ? 'Update Note' : 'Add Note' }), _jsx("button", { className: "px-4 py-2 text-white bg-gray-500 rounded hover:bg-gray-600", onClick: () => {
                                        setIsCreating(false);
                                        setTitle('');
                                        setContent('');
                                        setEditingId(null);
                                    }, disabled: loading, children: "Cancel" })] })] })) }), loading ? (_jsx("div", { className: "flex items-center justify-center mt-10", children: _jsx(FaSpinner, { className: "text-3xl text-blue-600 animate-spin" }) })) : (_jsx("ul", { className: "grid gap-4 sm:grid-cols-2 lg:grid-cols-3", children: notes.map((note) => (_jsxs("li", { className: "p-4 bg-white border rounded shadow dark:bg-gray-800 dark:border-gray-600", children: [_jsxs("div", { className: "flex items-center justify-between mb-2", children: [_jsx("strong", { className: "text-lg break-words", children: note.title }), _jsxs("div", { className: "flex space-x-3", children: [_jsx("button", { title: "Edit Note", onClick: () => handleEdit(note), className: "text-blue-600 hover:text-blue-800 dark:text-blue-400", children: _jsx(FiEdit, {}) }), _jsx("button", { title: "Delete Note", onClick: () => handleDelete(note._id), className: "text-red-600 hover:text-red-800 dark:text-red-400", children: _jsx(FiTrash2, {}) })] })] }), _jsx("p", { className: "break-words whitespace-pre-line", children: note.content })] }, note._id))) }))] }));
}
