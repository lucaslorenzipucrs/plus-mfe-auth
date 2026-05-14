import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import React, { useEffect, useState } from "react";
import ReactDOM from "react-dom/client";
import { Box, Button, Card, CardContent, Container, Typography } from "@mui/material";
import LoginPage from "./pages/LoginPage";
const API = import.meta.env.VITE_MS_AUTH_URL || "http://localhost:3001";
function App() {
    const [user, setUser] = useState(null);
    const loadUser = async () => {
        const token = localStorage.getItem("token");
        if (!token)
            return;
        try {
            const res = await fetch(`${API}/auth/me`, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            if (!res.ok)
                throw new Error();
            const data = await res.json();
            setUser(data);
        }
        catch {
            localStorage.removeItem("token");
            localStorage.removeItem("refresh");
        }
    };
    useEffect(() => {
        loadUser();
    }, []);
    const handleLogout = () => {
        localStorage.removeItem("token");
        localStorage.removeItem("refresh");
        setUser(null);
    };
    if (!user) {
        return _jsx(LoginPage, { onLogin: loadUser });
    }
    return (_jsx(Container, { maxWidth: "sm", children: _jsx(Box, { sx: {
                minHeight: "100vh",
                display: "flex",
                alignItems: "center"
            }, children: _jsx(Card, { sx: {
                    width: "100%",
                    borderRadius: 4,
                    boxShadow: 4
                }, children: _jsxs(CardContent, { sx: { p: 5 }, children: [_jsx(Typography, { variant: "h4", sx: { fontWeight: "bold" }, gutterBottom: true, children: "Plus Auth" }), _jsxs(Typography, { variant: "body1", sx: { mt: 3 }, children: [_jsx("strong", { children: "Usu\u00E1rio:" }), " ", user.email] }), _jsxs(Typography, { variant: "body1", sx: { mt: 1 }, children: [_jsx("strong", { children: "Role:" }), " ", user.role] }), _jsx(Button, { variant: "contained", color: "error", fullWidth: true, sx: { mt: 4 }, onClick: handleLogout, children: "Logout" })] }) }) }) }));
}
ReactDOM.createRoot(document.getElementById("root")).render(_jsx(React.StrictMode, { children: _jsx(App, {}) }));
