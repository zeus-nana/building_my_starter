import Modal from "../../ui/Modal.jsx";
import Button from "../../ui/Button.jsx";
import UploadFileForm from "./UploadFileForm.jsx";

function UploadFile() {
  return (
    <div>
      <Modal>
        <Modal.Open opens="newUser-form">
          <Button>Charger un état</Button>
        </Modal.Open>
        <Modal.Window name="newUser-form">
          <UploadFileForm />
        </Modal.Window>
      </Modal>
    </div>
  );
}

export default UploadFile;
