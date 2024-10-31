/* eslint-disable react/no-unknown-property */
import PropTypes from 'prop-types';
import { HiPencil } from 'react-icons/hi';
import Modal from '../../../ui/Modal';
import ConfigFonctionForm from './ConfigFonctionForm.jsx';
import Menus from '../../../ui/Menus';
import Table from '../../../ui/Table';

function ConfigFonctionRow({ config }) {
  const { id, fonction, menu, permission, created_by } = config;

  return (
    <Table.Row>
      <span name="fonction">{fonction}</span>
      <span name="menu">{menu}</span>
      <span name="permission">{permission}</span>
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

            <Modal.Window name="edit" title="Editer une configuration">
              <ConfigFonctionForm key={config.id} configToEdit={config} />
            </Modal.Window>
          </Menus.Menu>
        </Modal>
      </span>
    </Table.Row>
  );
}

ConfigFonctionRow.propTypes = {
  config: PropTypes.shape({
    id: PropTypes.number,
    fonction: PropTypes.string,
    permission: PropTypes.string,
    created_by: PropTypes.string,
    menu: PropTypes.string,
  }).isRequired,
};

export default ConfigFonctionRow;
