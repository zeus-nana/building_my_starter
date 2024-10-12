import CreateUpdateMenuForm from './CreateUpdateMenuForm.jsx';
import Modal from '../../../ui/Modal.jsx';
import Button from '../../../ui/Button.jsx';

function AddMenu() {
  return (
    <div>
      <Modal>
        <Modal.Open opens="new-fonction">
          <Button>Ajouter un menu</Button>
        </Modal.Open>
        <Modal.Window name="new-fonction" title="Ajouter un menu">
          <CreateUpdateMenuForm />
        </Modal.Window>
      </Modal>
    </div>
  );
}

export default AddMenu;
