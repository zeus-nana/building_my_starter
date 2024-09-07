import { HiLockClosed, HiPencil } from "react-icons/hi2";
import { HiBan } from "react-icons/hi";
import Table from "../../ui/Table";
import Menus from "../../ui/Menus";
import Modal from "../../ui/Modal";
import PropTypes from "prop-types";
import CreateUserForm from "./CreateUserForm.jsx";
import ConfirmAction from "../../ui/ConfirmAction.jsx";
import { useUser } from "../authentication/useUser.js";
import styled from "styled-components";

const Avatar = styled.img`
  width: 32px;
  height: 32px;
  border-radius: 50%;
  object-fit: cover;
`;

function UsersRow({ user }) {
  const { user: currentUser } = useUser();

  const {
    id,
    login,
    username,
    email,
    phone,
    profile,
    department,
    localisation,
    active,
    avatar,
  } = user;

  const avatarUrl = "default-user.jpg"; // Remplacez par le chemin de votre avatar par défaut

  return (
    <Table.Row>
      <span name="avatar" alignment="center">
        <Avatar src={avatarUrl} alt={`Avatar de ${username}`} />
      </span>
      <span name="login">{login}</span>
      <span name="username">{username}</span>
      <span name="email">{email}</span>
      <span name="phone">{phone}</span>
      <span name="profile">{profile?.toUpperCase()}</span>
      <span name="department">
        {department ? department.toUpperCase() : ""}
      </span>
      <span name="localisation">
        {localisation ? localisation.toUpperCase() : ""}
      </span>
      <span name="active" alignment="center">
        {active ? "Actif" : "Inactif"}
      </span>
      <span name="actions" alignment="center">
        <Modal>
          <Menus.Menu>
            <Menus.Toggle id={id.toString()} />
            <Menus.List id={id.toString()}>
              <Modal.Open opens="edit">
                <Menus.Button
                  icon={<HiPencil />}
                  disabled={currentUser.id === id}
                >
                  Éditer
                </Menus.Button>
              </Modal.Open>

              <Modal.Open opens="resetUserPassword">
                <Menus.Button icon={<HiLockClosed />}>
                  Réinitialiser le mot de passe
                </Menus.Button>
              </Modal.Open>

              <Modal.Open opens="activateDeactivate">
                <Menus.Button icon={<HiBan />}>
                  {active ? "Désactiver" : "Activer"}
                </Menus.Button>
              </Modal.Open>
            </Menus.List>

            <Modal.Window name="activateDeactivate">
              <ConfirmAction
                action={active ? "deactivate" : "activate"}
                id={id}
              />
            </Modal.Window>

            <Modal.Window name="resetUserPassword">
              <ConfirmAction action="resetUserPassword" id={id} />
            </Modal.Window>

            <Modal.Window name="edit">
              <CreateUserForm userToEdit={user} />
            </Modal.Window>
          </Menus.Menu>
        </Modal>
      </span>
    </Table.Row>
  );
}

UsersRow.propTypes = {
  user: PropTypes.object.isRequired,
};

export default UsersRow;
