import { useState } from "react";
import Button from "../../ui/Button";
import Form from "../../ui/Form";
import Input from "../../ui/Input";
import FormRowVertical from "../../ui/FormRowVertical";
import toast from "react-hot-toast";
import SpinnerMini from "../../ui/SpinnerMini.jsx";
import { useLogin } from "./useLogin.js";

function LoginForm() {
  const [login, setLogin] = useState("");
  const [password, setPassword] = useState("");

  const { signIn, isLoading } = useLogin();

  function handleSubmit(e) {
    e.preventDefault();
    if (!login || !password) {
      return toast.error("Veuillez renseigner tous les champs");
    }

    console.log(login, password);
    signIn({ email: login, password: password });
  }

  return (
    <Form onSubmit={handleSubmit}>
      <FormRowVertical label="Login">
        <Input
          type="login"
          id="login"
          // For password managers
          autoComplete="login"
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

export default LoginForm;
