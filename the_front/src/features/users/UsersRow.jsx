import { HiLockClosed, HiPencil } from "react-icons/hi2";
import { HiBan } from "react-icons/hi";
import Table from "../../ui/Table";
import Menus from "../../ui/Menus";
import Modal from "../../ui/Modal";
import PropTypes from "prop-types";
import CreateUserForm from "./CreateUserForm.jsx";
import { useActivateUser } from "./useActivateUser.js";
import { useDeactivateUser } from "./useDeactivateUser.js";
import ConfirmAction from "../../ui/ConfirmAction.jsx";

// const Img = styled.img`
//   display: block;
//   width: 6.4rem;
//   aspect-ratio: 3 / 2;
//   object-fit: cover;
//   object-position: center;
//   transform: scale(1.5) translateX(-7px);
// `;
//
// const User = styled.div`
//   font-size: 1.6rem;
//   font-weight: 600;
//   color: var(--color-grey-600);
//   font-family: "Sono";
// `;
//
// const Price = styled.div`
//   font-family: "Sono";
//   font-weight: 600;
// `;
//
// const Discount = styled.div`
//   font-family: "Sono";
//   font-weight: 500;
//   color: var(--color-green-700);
// `;

function UsersRow({ user }) {
  const { isActivating, activateUser } = useActivateUser();
  const { isDeactivating, deactivateUser } = useDeactivateUser();

  const handleConfirm = () => {
    if (active) {
      deactivateUser(id);
    } else {
      activateUser(id);
    }
  };

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

              <Menus.Button icon={<HiLockClosed />}>
                Réinitialiser le mot de passe
              </Menus.Button>
              <Modal.Open opens="activateDeactivate">
                <Menus.Button icon={<HiBan />}>
                  {active ? "Désactiver" : "Activer"}
                </Menus.Button>
              </Modal.Open>
            </Menus.List>

            <Modal.Window name="activateDeactivate">
              <ConfirmAction
                onConfirm={handleConfirm}
                disabled={isActivating || isDeactivating}
              />
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
