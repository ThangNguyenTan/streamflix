import styled from "styled-components";

export const AuthContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  background: ${({ theme }) => theme.colors.background};
`;

export const AuthForm = styled.form`
  background: #222;
  padding: 24px;
  border-radius: 8px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.5);
  max-width: 400px;
  width: 100%;
  display: flex;
  flex-direction: column;
`;

export const Input = styled.input`
  margin-bottom: 16px;
  padding: 12px;
  border-radius: 4px;
  border: 1px solid #555;
  background: #333;
  color: #fff;
  outline: none;

  &:focus {
    border-color: ${({ theme }) => theme.colors.primary};
  }
`;

export const Button = styled.button`
  padding: 12px;
  background: ${({ theme }) => theme.colors.primary};
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-weight: bold;

  &:hover {
    background: #d70712;
  }
`;

export const ErrorMessage = styled.p`
  color: red;
  margin-bottom: 16px;
`;

export const Link = styled.p`
  color: ${({ theme }) => theme.colors.primary};
  text-align: center;
  margin-top: 16px;
  cursor: pointer;

  &:hover {
    text-decoration: underline;
  }
`;
