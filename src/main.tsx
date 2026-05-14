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
  const [apiResponse, setApiResponse] = useState("");
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

  const handleMe = async () => {
    const token = localStorage.getItem("token");

    const res = await fetch(`${API}/auth/me`, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    });

    const data = await res.json();

    setApiResponse(JSON.stringify(data, null, 2));
  };

  const handleAdmin = async () => {
    const token = localStorage.getItem("token");

    const res = await fetch(`${API}/admin`, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    });

    const data = await res.json();

    setApiResponse(JSON.stringify(data, null, 2));
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
            fullWidth
            sx={{ mt: 3 }}
            onClick={handleMe}
          >
            GET /auth/me
          </Button>
                    {apiResponse && (
            <Box
              sx={{
                mt: 3,
                p: 2,
                bgcolor: "#f5f5f5",
                borderRadius: 2
              }}
            >
              <Typography variant="body2">
                <pre>{apiResponse}</pre>
              </Typography>
            </Box>
          )}
        <Button
          variant="contained"
          color="secondary"
          fullWidth
          sx={{ mt: 2 }}
          onClick={handleAdmin}
        >
          GET /admin
        </Button>
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