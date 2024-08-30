import PropTypes from "prop-types";
import FormRow from "../../ui/FormRow";
import Button from "../../ui/Button";
import FileInput from "../../ui/FileInput.jsx";
import styled from "styled-components";

const Form = styled.form`
  width: 50rem;
  overflow: hidden;
  font-size: 1.4rem;
`;

const StyledHeader = styled.header`
  display: flex;
  gap: 1rem;
  padding-bottom: 3rem;
  font-size: 2.5rem;
  font-weight: 600;
  text-align: center;
  line-height: 1.4;
`;

function UploadFileForm({ onCloseModal }) {
  return (
    <Form
      // onSubmit={handleSubmit(onSubmit, onError)}
      type={onCloseModal ? "modal" : "default"}
    >
      <StyledHeader>Charger un état</StyledHeader>

      <FileInput type="file" extensions={["csv", "xls", "xlsx"]} />

      <FormRow>
        <Button
          $variation="secondary"
          type="reset"
          onClick={() => onCloseModal?.()}
          // disabled={isCreating}
        >
          Annuler
        </Button>
        <Button size="medium">Charger</Button>
      </FormRow>
    </Form>
  );
}

UploadFileForm.propTypes = {
  onCloseModal: PropTypes.func,
};

export default UploadFileForm;
