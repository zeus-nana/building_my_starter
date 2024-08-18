import styled from "styled-components";
import { User as Users } from "../../types/User.ts";
import Table from "../../ui/Table.tsx";
import Menus from "../../ui/Menus.tsx";
import { HiLockClosed, HiPencil } from "react-icons/hi2";
import { HiBan } from "react-icons/hi";
import Modal from "../../ui/Modal.tsx";
import CreateUserForm from "./CreateUserForm.tsx";

const Img = styled.img`
  display: block;
  width: 6.4rem;
  aspect-ratio: 3 / 2;
  object-fit: cover;
  object-position: center;
  transform: scale(1.5) translateX(-7px);
`;

const User = styled.div`
  font-size: 1.6rem;
  font-weight: 600;
  color: var(--color-grey-600);
  font-family: "Sono";
`;

const Price = styled.div`
  font-family: "Sono";
  font-weight: 600;
`;

const Discount = styled.div`
  font-family: "Sono";
  font-weight: 500;
  color: var(--color-green-700);
`;

function UsersRow({ user }: { user: Users }) {
  return (
    <Table.Row>
      <div>{user.login}</div>
      <div>{user.username}</div>
      <div>{user.email}</div>
      <div>{user.phone}</div>
      <div>{user.profil?.toUpperCase()}</div>
      <div>{user.department ? user.department.toUpperCase() : ""}</div>
      <div>{user.localisation ? user.localisation.toUpperCase() : ""}</div>
      <div>{user.active ? "Actif" : "Inactif"}</div>
      <div>
        <Modal>
          <Menus.Menu>
            <Menus.Toggle id={user.id} />
            <Menus.List id={user.id}>
              <Modal.Open opens="edit">
                <Menus.Button icon={<HiPencil />}>Éditer</Menus.Button>
              </Modal.Open>

              <Menus.Button icon={<HiLockClosed />}>
                Réinitialiser le mot de passe
              </Menus.Button>
              <Menus.Button icon={<HiBan />}>Déactiver</Menus.Button>

              <Modal.Window name="edit">
                <CreateUserForm />
              </Modal.Window>
            </Menus.List>
          </Menus.Menu>
        </Modal>
      </div>
    </Table.Row>
  );
}

export default UsersRow;
