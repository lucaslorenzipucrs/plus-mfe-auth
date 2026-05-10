import React, { useEffect, useState } from "react";
import ReactDOM from "react-dom/client";
import {
  Box,
  Button,
  Card,
  CardContent,
  Container,
  Typography
} from "@mui/material";
import LoginPage from "./pages/LoginPage";

const API = import.meta.env.VITE_MS_AUTH_URL || "http://localhost:3001";

function App() {
  const [user, setUser] = useState(null);

  const loadUser = async () => {
    const token = localStorage.getItem("token");

    if (!token) return;

    try {
      const res = await fetch(`${API}/auth/me`, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });

      if (!res.ok) throw new Error();

      const data = await res.json();
      setUser(data);
    } catch {
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
    return <LoginPage onLogin={loadUser} />;
  }

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
              fontWeight="bold"
              gutterBottom
            >
              Plus Auth
            </Typography>

            <Typography
              variant="body1"
              sx={{ mt: 3 }}
            >
              <strong>Usuário:</strong> {user.email}
            </Typography>

            <Typography
              variant="body1"
              sx={{ mt: 1 }}
            >
              <strong>Role:</strong> {user.role}
            </Typography>

            <Button
              variant="contained"
              color="error"
              fullWidth
              sx={{ mt: 4 }}
              onClick={handleLogout}
            >
              Logout
            </Button>
          </CardContent>
        </Card>
      </Box>
    </Container>
  );
}

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);