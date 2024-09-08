/* eslint-disable react/no-unknown-property */
import Table from "../../ui/Table";
import PropTypes from "prop-types";
import Menus from "../../ui/Menus";
import { HiEye } from "react-icons/hi2";
import { useNavigate } from "react-router-dom";

function ChargementRow({ chargement }) {
  const navigate = useNavigate();

  const {
    id,
    charge_par,
    etat,
    type,
    nombre_succes,
    nombre_echec,
    statut,
    date_chargement,
  } = chargement;

  // Formater la date en dd/mm/aaaa
  const formattedDate = new Date(date_chargement).toLocaleDateString("fr-FR");

  const handleDetailsClick = () => {
    navigate(`/chargements/${id}`); // Assurez-vous que cette route existe dans votre application
  };

  return (
    <Table.Row>
      <span name="charge_par" alignment="center">
        {charge_par}
      </span>
      <span name="etat">{etat}</span>
      <span name="type">{type}</span>
      <span name="nombre_succes" alignment="right">
        {nombre_succes}
      </span>
      <span name="nombre_echec" alignment="right">
        {nombre_echec}
      </span>
      <span name="statut" alignment="center">
        {statut}
      </span>
      <span name="date_chargement" alignment="center">
        {formattedDate}
      </span>
      <span name="actions" alignment="center">
        <Menus.Menu>
          <Menus.Toggle id={id.toString()} />
          <Menus.List id={id.toString()}>
            <Menus.Button icon={<HiEye />} onClick={handleDetailsClick}>
              Détails
            </Menus.Button>
          </Menus.List>
        </Menus.Menu>
      </span>
    </Table.Row>
  );
}

ChargementRow.propTypes = {
  chargement: PropTypes.shape({
    id: PropTypes.number.isRequired,
    charge_par: PropTypes.string,
    etat: PropTypes.string,
    type: PropTypes.string,
    nombre_succes: PropTypes.number,
    nombre_echec: PropTypes.number,
    statut: PropTypes.string,
    date_chargement: PropTypes.string,
  }).isRequired,
};

export default ChargementRow;
