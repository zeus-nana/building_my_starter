import styled from "styled-components";
import Button from "./Button";
import Heading from "./Heading";
import PropTypes from "prop-types";

const StyledConfirmAction = styled.div`
  width: 40rem;
  display: flex;
  flex-direction: column;
  gap: 1.2rem;

  & p {
    color: var(--color-grey-500);
    margin-bottom: 1.2rem;
  }

  & div {
    display: flex;
    justify-content: flex-end;
    gap: 1.2rem;
  }
`;

function ConfirmAction({ onConfirm, disabled, onCloseModal }) {
  const handleConfirm = async () => {
    try {
      await onConfirm();
      // onCloseModal();
    } catch (error) {
      // Gérer l'erreur si nécessaire
    }
  };
  return (
    <StyledConfirmAction>
      <Heading as="h3">Confirmation</Heading>
      <p>Voulez vous vraiment confirmer ?</p>

      <div>
        <Button
          $variation="secondary"
          disabled={disabled}
          onClick={onCloseModal}
        >
          Annuler
        </Button>
        <Button $variation="danger" disabled={disabled} onClick={handleConfirm}>
          Continuer
        </Button>
      </div>
    </StyledConfirmAction>
  );
}

ConfirmAction.propTypes = {
  resourceName: PropTypes.string,
  onConfirm: PropTypes.func,
  disabled: PropTypes.bool,
  onCloseModal: PropTypes.func,
};

export default ConfirmAction;
