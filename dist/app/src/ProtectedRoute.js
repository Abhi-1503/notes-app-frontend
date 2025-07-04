import { Fragment as _Fragment, jsx as _jsx } from "react/jsx-runtime";
import { Navigate } from 'react-router-dom';
const ProtectedRoute = ({ children }) => {
    const token = localStorage.getItem('token');
    return token ? _jsx(_Fragment, { children: children }) : _jsx(Navigate, { to: "/signin" });
};
export default ProtectedRoute;
