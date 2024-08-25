import { useState } from "react";
import { useLogin } from "./useLogin";
import Form from "../../ui/Form";
import FormRowVertical from "../../ui/FormRowVertical";
import Input from "../../ui/Input";
import Button from "../../ui/Button";
import SpinnerMini from "../../ui/SpinnerMini";
import toast from "react-hot-toast";
import PropTypes from "prop-types";

function LoginForm({ onResetPassword }) {
  const [login, setLogin] = useState("");
  const [password, setPassword] = useState("");

  const { signIn, isLoading } = useLogin(onResetPassword);

  function handleSubmit(e) {
    e.preventDefault();
    if (!login || !password) {
      return toast.error("Veuillez renseigner tous les champs");
    }

    signIn(
      { login, password },
      {
        onSettled: () => {
          setLogin("");
          setPassword("");
        },
      },
    );
  }

  return (
    <Form onSubmit={handleSubmit}>
      <FormRowVertical label="Login">
        <Input
          type="text"
          id="login"
          autoComplete="username"
          value={login}
          onChange={(e) => setLogin(e.target.value)}
          disabled={isLoading}
        />
      </FormRowVertical>
      <FormRowVertical label="Mot de passe">
        <Input
          type="password"
          id="password"
          autoComplete="current-password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          disabled={isLoading}
        />
      </FormRowVertical>
      <FormRowVertical>
        <Button size="large" disabled={isLoading}>
          {!isLoading ? "Se connecter" : <SpinnerMini />}
        </Button>
      </FormRowVertical>
    </Form>
  );
}

LoginForm.propTypes = {
  onResetPassword: PropTypes.func,
};

export default LoginForm;
