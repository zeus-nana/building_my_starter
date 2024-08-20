import { HiLockClosed, HiPencil } from "react-icons/hi2";
import { HiBan } from "react-icons/hi";
import Table from "../../ui/Table";
import Menus from "../../ui/Menus";
import Modal from "../../ui/Modal";
import PropTypes from "prop-types";
import CreateUserForm from "./CreateUserForm.jsx";
import ConfirmAction from "../../ui/ConfirmAction.jsx";

function UsersRow({ user }) {
  const {
    id,
    login,
    username,
    email,
    phone,
    profil,
    department,
    localisation,
    active,
  } = user;

  return (
    <Table.Row>
      <div>{login}</div>
      <div>{username}</div>
      <div>{email}</div>
      <div>{phone}</div>
      <div>{profil?.toUpperCase()}</div>
      <div>{department ? department.toUpperCase() : ""}</div>
      <div>{localisation ? localisation.toUpperCase() : ""}</div>
      <div>{active ? "Actif" : "Inactif"}</div>
      <div>
        <Modal>
          <Menus.Menu>
            <Menus.Toggle id={id.toString()} />
            <Menus.List id={id.toString()}>
              <Modal.Open opens="edit">
                <Menus.Button icon={<HiPencil />}>Éditer</Menus.Button>
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
      </div>
    </Table.Row>
  );
}

UsersRow.propTypes = {
  user: PropTypes.object.isRequired,
};

export default UsersRow;
