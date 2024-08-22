import styled from "styled-components";
// import ButtonIcon from "./ButtonIcon.jsx";
// import { HiOutlineUser } from "react-icons/hi2";
import LogoutForm from "../features/authentication/LogoutForm.jsx";

const StyledHeaderMenu = styled.ul`
  display: flex;
  gap: 0.4rem;
`;

function HeaderMenu() {
  return (
    <StyledHeaderMenu>
      {/*<li>*/}
      {/*  <ButtonIcon>*/}
      {/*    <HiOutlineUser />*/}
      {/*  </ButtonIcon>*/}
      {/*</li>*/}
      <li>
        <LogoutForm />
      </li>
    </StyledHeaderMenu>
  );
}

export default HeaderMenu;
