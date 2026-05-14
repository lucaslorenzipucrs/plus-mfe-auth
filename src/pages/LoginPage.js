import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState } from "react";
import { Alert, Box, Button, Card, CardContent, CircularProgress, Container, TextField, Typography } from "@mui/material";
const API = import.meta.env.VITE_MS_AUTH_URL || "http://localhost:3001";
export default function LoginPage({ onLogin }) {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);
    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError(null);
        try {
            const res = await fetch(`${API}/auth/login`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    email,
                    password
                })
            });
            if (!res.ok) {
                const { error: msg } = await res.json();
                throw new Error(msg || "Erro ao fazer login");
            }
            const data = await res.json();
            localStorage.setItem("token", data.token);
            localStorage.setItem("refresh", data.refresh);
            onLogin?.(data);
        }
        catch (err) {
            setError(err.message);
        }
        finally {
            setLoading(false);
        }
    };
    return (_jsx(Container, { maxWidth: "sm", children: _jsx(Box, { sx: {
                minHeight: "100vh",
                display: "flex",
                alignItems: "center"
            }, children: _jsx(Card, { sx: {
                    width: "100%",
                    borderRadius: 4,
                    boxShadow: 4
                }, children: _jsxs(CardContent, { sx: { p: 5 }, children: [_jsx(Typography, { variant: "h4", sx: { fontWeight: "bold" }, gutterBottom: true, children: "Plus Auth" }), _jsx(Typography, { variant: "body1", color: "text.secondary", sx: { mb: 4 }, children: "Sistema de autentica\u00E7\u00E3o da plataforma Plus" }), _jsxs("form", { onSubmit: handleSubmit, children: [_jsx(TextField, { label: "E-mail", type: "email", fullWidth: true, margin: "normal", value: email, onChange: (e) => setEmail(e.target.value) }), _jsx(TextField, { label: "Senha", type: "password", fullWidth: true, margin: "normal", value: password, onChange: (e) => setPassword(e.target.value) }), error && (_jsx(Alert, { severity: "error", sx: { mt: 2 }, children: error })), _jsx(Button, { type: "submit", variant: "contained", fullWidth: true, size: "large", sx: { mt: 3 }, disabled: loading, children: loading ? (_jsx(CircularProgress, { size: 24, color: "inherit" })) : ("Entrar") })] })] }) }) }) }));
}
