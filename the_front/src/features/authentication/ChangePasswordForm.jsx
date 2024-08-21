import { useState } from "react";
import { useParams, useNavigate, useSearchParams } from "react-router-dom";
import Button from "../../ui/Button";
import Form from "../../ui/Form";
import Input from "../../ui/Input";
import FormRowVertical from "../../ui/FormRowVertical";
import toast from "react-hot-toast";
import { useChangePassword } from "./useChangePassword.js";
import validator from "validator/es";

function ChangePasswordForm() {
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const { isLoading, changePass } = useChangePassword();

  const [searchParams] = useSearchParams();
  const userId = Number(searchParams.get("userId"));

  const validatePassword = (password) => {
    return validator.isStrongPassword(password, {
      minLength: 8,
      minLowercase: 1,
      minUppercase: 1,
      minNumbers: 1,
      minSymbols: 1,
    });
  };

  function handleSubmit(e) {
    e.preventDefault();
    if (!password || !confirmPassword) {
      return toast.error("Veuillez renseigner tous les champs");
    }
    if (password !== confirmPassword) {
      return toast.error("Les mots de passe ne correspondent pas");
    }

    if (!validatePassword(password)) {
      return toast.error(
        "Le mot de passe n'est pas assez fort. Il doit contenir au moins 8 caractères, dont une minuscule, une majuscule, un chiffre et un symbole.",
      );
    }
    changePass({ userId, password });
  }

  return (
    <Form onSubmit={handleSubmit}>
      <FormRowVertical label="Nouveau mot de passe">
        <Input
          type="password"
          id="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          disabled={isLoading}
        />
      </FormRowVertical>
      <FormRowVertical label="Confirmer le mot de passe">
        <Input
          type="password"
          id="confirmPassword"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          disabled={isLoading}
        />
      </FormRowVertical>
      <FormRowVertical>
        <Button size="large" disabled={isLoading}>
          Changer le mot de passe
        </Button>
      </FormRowVertical>
    </Form>
  );
}

export default ChangePasswordForm;
