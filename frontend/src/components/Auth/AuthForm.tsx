import React from "react";

interface AuthFormProps {
  email: string;
  password: string;
  onEmailChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onPasswordChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onSubmit: (e: React.FormEvent) => void;
  buttonLabel: string;
}

const AuthForm: React.FC<AuthFormProps> = ({
  email,
  password,
  onEmailChange,
  onPasswordChange,
  onSubmit,
  buttonLabel,
}) => {
  return (
    <form onSubmit={onSubmit}>
      <input
        type="email"
        placeholder="Email"
        value={email}
        onChange={onEmailChange}
      />
      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={onPasswordChange}
      />
      <button type="submit">{buttonLabel}</button>
    </form>
  );
};

export default AuthForm;
