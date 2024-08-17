import Button from "../../ui/Button.tsx";
import CreateUserForm from "./CreateUserForm.tsx";
import Modal from "../../ui/Modal.tsx";

function AddUser() {
  return (
    <div>
      <Modal>
        <Modal.Open opens="newUser-form">
          <Button>Ajouter un utilisateur</Button>
        </Modal.Open>
        <Modal.Window name="newUser-form">
          <CreateUserForm />
        </Modal.Window>
      </Modal>
    </div>
  );
}

export default AddUser;
