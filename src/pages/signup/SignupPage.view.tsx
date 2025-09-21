import { useNavigate } from "react-router-dom";
import { useAuth } from "../../hooks";
import { useState } from "react";
import { AuthContainer, AuthForm, Button, ErrorMessage, Input, Link } from "../login";

export const SignupPage: React.FC = () => {
  const { signup } = useAuth(); // Use signup function from AuthContext
  const [username, setUsername] = useState(""); // State for username
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null); // Clear previous errors

    // Basic validation for simplicity
    if (!username || !email || !password) {
      setError("All fields are required.");
      return;
    }

    try {
      await signup(username, email, password); // Call signup function
      navigate("/dashboard"); // Redirect to dashboard or home after successful signup
    } catch (err) {
      setError("Signup failed. Please try again.");
      console.error(err);
    }
  };

  return (
    <AuthContainer>
      <AuthForm onSubmit={handleSubmit}>
        <h2 style={{ color: "white", textAlign: "center", marginBottom: "20px" }}>Sign Up</h2>
        {error && <ErrorMessage>{error}</ErrorMessage>}
        <Input
          type="text"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
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
        <Button type="submit">Sign Up</Button>
        <Link onClick={() => navigate("/login")}>
          Already have an account? Log In
        </Link>
      </AuthForm>
    </AuthContainer>
  );
};
