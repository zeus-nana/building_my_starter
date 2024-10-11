import CreateFonctionForm from './CreateFonctionForm';
import Modal from '../../../ui/Modal.jsx';
import Button from '../../../ui/Button.jsx';

function AddFonction() {
  return (
    <div>
      <Modal>
        <Modal.Open opens="new-fonction">
          <Button>Ajouter une fonction</Button>
        </Modal.Open>
        <Modal.Window name="new-fonction" title="Ajouter une fonction">
          <CreateFonctionForm />
        </Modal.Window>
      </Modal>
    </div>
  );
}

export default AddFonction;
