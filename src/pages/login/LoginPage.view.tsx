import { useState } from "react";
import { useAuth } from "../../hooks/useAuth";
import { useNavigate } from "react-router-dom";
import {
  AuthContainer,
  AuthForm,
  Button,
  ErrorMessage,
  Input,
  Link,
} from "./LoginPage.styled";

export const LoginPage: React.FC = () => {
  const { login } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    try {
      await login(email, password);
      navigate("/dashboard"); // Redirect to dashboard
    } catch (err) {
      setError("Invalid email or password!");
      console.error(err);
    }
  };

  return (
    <AuthContainer>
      <AuthForm onSubmit={handleSubmit}>
        <h2
          style={{ color: "white", textAlign: "center", marginBottom: "20px" }}
        >
          Log In
        </h2>
        {error && <ErrorMessage>{error}</ErrorMessage>}
        <Input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <Input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <Button type="submit">Log In</Button>
        <Link onClick={() => navigate("/signup")}>
          Don't have an account? Sign Up
        </Link>
      </AuthForm>
    </AuthContainer>
  );
};

