import styled from "styled-components";
import LoginForm from "../features/authentication/LoginForm.jsx";
import Logo from "../ui/Logo.jsx";
import ChangePasswordForm from "../features/authentication/ChangePasswordForm.jsx";
import { useState } from "react";
import Modal from "../ui/Modal.jsx";

const LoginLayout = styled.main`
  min-height: 100vh;
  display: grid;
  grid-template-columns: 48rem;
  align-content: center;
  justify-content: center;
  gap: 3.2rem;
  background-image: url("/bkg.svg");
  background-size: cover;
  background-color: var(--color-grey-50);
`;

function Login() {
  const [showResetPassword, setShowResetPassword] = useState(false);
  const [userId, setUserId] = useState(null);

  const handleResetPassword = (id) => {
    setShowResetPassword(true);
    setUserId(id);
  };

  return (
    <LoginLayout>
      <Modal>
        <Logo />
        {showResetPassword ? (
          <ChangePasswordForm
            userId={userId}
            onPasswordChanged={() => setShowResetPassword(false)}
          />
        ) : (
          <LoginForm onResetPassword={handleResetPassword} />
        )}
      </Modal>
    </LoginLayout>
  );
}

export default Login;
