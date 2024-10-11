import PropTypes from 'prop-types';
import { useForm } from 'react-hook-form';
import { useCreateFonction } from './useCreateFonction.js';
import FormRow from '../../../ui/FormRow.jsx';
import Input from '../../../ui/Input.jsx';
import Textarea from '../../../ui/Textarea.jsx';
import Button from '../../../ui/Button.jsx';
import SpinnerMini from '../../../ui/SpinnerMini.jsx';
import Form from '../../../ui/Form.jsx';

function CreateFonctionForm({ onCloseModal, fonctionToEdit = {} }) {
  const { id: fonctionId, ...editValues } = fonctionToEdit;
  const isEditing = !!fonctionId;

  const { register, handleSubmit, reset, formState } = useForm({
    defaultValues: isEditing ? editValues : {},
  });

  const { errors } = formState;

  const { isCreating, createFonction } = useCreateFonction(onCloseModal);

  function onSubmit(data) {
    if (isEditing) {
      // Implement update logic here
    } else {
      createFonction(data);
    }
  }

  function onError(errors) {
    console.log(errors);
  }

  return (
    <Form onSubmit={handleSubmit(onSubmit, onError)} type={onCloseModal ? 'modal' : 'regular'}>
      <FormRow label="Nom" error={errors?.nom?.message}>
        <Input
          type="text"
          id="nom"
          disabled={isCreating}
          {...register('nom', {
            required: 'Ce champ est obligatoire.',
          })}
        />
      </FormRow>

      <FormRow label="Description" error={errors?.description?.message}>
        <Textarea
          id="description"
          disabled={isCreating}
          {...register('description', {
            required: 'Ce champ est obligatoire.',
          })}
        />
      </FormRow>

      <FormRow>
        <Button $variation="secondary" type="reset" onClick={() => onCloseModal?.()} disabled={isCreating}>
          Annuler
        </Button>
        <Button disabled={isCreating}>{isCreating ? <SpinnerMini /> : 'Enregistrer'}</Button>
      </FormRow>
    </Form>
  );
}

CreateFonctionForm.propTypes = {
  onCloseModal: PropTypes.func,
  fonctionToEdit: PropTypes.object,
};

export default CreateFonctionForm;
