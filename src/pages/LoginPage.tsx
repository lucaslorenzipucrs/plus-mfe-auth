import { useState } from "react";

import {
  Alert,
  Box,
  Button,
  Card,
  CardContent,
  CircularProgress,
  Container,
  TextField,
  Typography
} from "@mui/material";

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

    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container maxWidth="sm">
      <Box
        sx={{
          minHeight: "100vh",
          display: "flex",
          alignItems: "center"
        }}
      >
        <Card
          sx={{
            width: "100%",
            borderRadius: 4,
            boxShadow: 4
          }}
        >
          <CardContent sx={{ p: 5 }}>
            <Typography
              variant="h4"
              sx={{ fontWeight: "bold" }}
              gutterBottom
            >
              Plus Auth
            </Typography>

            <Typography
              variant="body1"
              color="text.secondary"
              sx={{ mb: 4 }}
            >
              Sistema de autenticação da plataforma Plus
            </Typography>

            <form onSubmit={handleSubmit}>
              <TextField
                label="E-mail"
                type="email"
                fullWidth
                margin="normal"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />

              <TextField
                label="Senha"
                type="password"
                fullWidth
                margin="normal"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />

              {error && (
                <Alert severity="error" sx={{ mt: 2 }}>
                  {error}
                </Alert>
              )}

              <Button
                type="submit"
                variant="contained"
                fullWidth
                size="large"
                sx={{ mt: 3 }}
                disabled={loading}
              >
                {loading ? (
                  <CircularProgress size={24} color="inherit" />
                ) : (
                  "Entrar"
                )}
              </Button>
            </form>
          </CardContent>
        </Card>
      </Box>
    </Container>
  );
}