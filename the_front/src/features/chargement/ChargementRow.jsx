import Table from "../../ui/Table";
import PropTypes from "prop-types";

function ChargementRow({ chargement }) {
  const {
    charge_par,
    etat,
    type,
    nombre_succes,
    nombre_echec,
    statut,
    date_creation,
  } = chargement;

  // Formater la date en dd/mm/aaaa
  const formattedDate = new Date(date_creation).toLocaleDateString("fr-FR");

  /* eslint-disable react/no-unknown-property */

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
      <span name="date_creation" alignment="center">
        {formattedDate}
      </span>
    </Table.Row>
  );
}

ChargementRow.propTypes = {
  chargement: PropTypes.shape({
    charge_par: PropTypes.string,
    etat: PropTypes.string,
    type: PropTypes.string,
    nombre_succes: PropTypes.number,
    nombre_echec: PropTypes.number,
    statut: PropTypes.string,
    date_creation: PropTypes.string,
  }).isRequired,
};

export default ChargementRow;
