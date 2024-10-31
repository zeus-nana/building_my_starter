/* eslint-disable react/no-unknown-property */
import PropTypes from 'prop-types';
import { HiPencil } from 'react-icons/hi';
import Modal from '../../../ui/Modal';
import ConfigFonctionForm from './ConfigFonctionForm.jsx';
import Menus from '../../../ui/Menus';
import Table from '../../../ui/Table';

function ConfigFonctionRow({ permission }) {
  const { id, nom, description, created_by, menu } = permission;

  return (
    <Table.Row>
      <span name="fonction">{nom}</span>
      <span name="menu">{description}</span>
      <span name="permission">{menu}</span>
      <span name="create_by">{created_by}</span>
      <span name="actions" alignment="center">
        <Modal>
          <Menus.Menu>
            <Menus.Toggle id={id.toString()} />
            <Menus.List id={id.toString()}>
              <Modal.Open opens="edit">
                <Menus.Button icon={<HiPencil />}>Éditer</Menus.Button>
              </Modal.Open>
            </Menus.List>

            <Modal.Window name="edit" title="Editer une permission">
              <ConfigFonctionForm permissionToEdit={permission} />
            </Modal.Window>
          </Menus.Menu>
        </Modal>
      </span>
    </Table.Row>
  );
}

ConfigFonctionRow.propTypes = {
  permission: PropTypes.shape({
    id: PropTypes.number.isRequired,
    nom: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    created_by: PropTypes.string.isRequired,
    menu: PropTypes.string.isRequired,
  }).isRequired,
};

export default ConfigFonctionRow;
