import PropTypes from 'prop-types';
import { useForm } from 'react-hook-form';
import { useCreateUpdatePermission } from './useCreateUpdatePermission';
import FormRow from '../../../ui/FormRow';
import Input from '../../../ui/Input';
import Textarea from '../../../ui/Textarea';
import Button from '../../../ui/Button';
import SpinnerMini from '../../../ui/SpinnerMini';
import Form from '../../../ui/Form';
import FormRowNew from '../../../ui/FormRowNew';
import Select from '../../../ui/Select';
import { useGetMenus } from '../menu/useGetMenus.js';

function CreateUpdatePermissionForm({ onCloseModal, permissionToEdit = {} }) {
  const { id: permissionId, ...editValues } = permissionToEdit;
  const isEditing = Boolean(permissionId);

  const { register, handleSubmit, formState } = useForm({
    defaultValues: isEditing ? editValues : {},
  });

  const { errors } = formState;

  const { isCreatingOrUpdating, createUpdatePermission } = useCreateUpdatePermission(onCloseModal);
  const { data: menusData, isLoading: isLoadingMenus } = useGetMenus();

  const menuOptions =
    menusData?.data?.data?.menus.map((menu) => ({
      value: menu.id.toString(),
      label: menu.nom,
    })) || [];

  function onSubmit(data) {
    createUpdatePermission(isEditing ? { id: permissionId, ...data } : data);
  }

  function onError(errors) {
    console.log(errors);
  }

  if (isLoadingMenus) return <SpinnerMini />;

  return (
    <Form onSubmit={handleSubmit(onSubmit, onError)} type={onCloseModal ? 'modal' : 'regular'}>
      <FormRowNew label="Nom" error={errors?.nom?.message}>
        <Input
          type="text"
          id="nom"
          disabled={isCreatingOrUpdating}
          {...register('nom', {
            required: 'Ce champ est obligatoire.',
          })}
        />
      </FormRowNew>

      <FormRowNew label="Description" error={errors?.description?.message}>
        <Textarea
          id="description"
          disabled={isCreatingOrUpdating}
          {...register('description', {
            required: 'Ce champ est obligatoire.',
          })}
        />
      </FormRowNew>

      <FormRowNew label="Menu" error={errors?.menu_id?.message}>
        <Select
          options={menuOptions}
          id="menu_id"
          disabled={isCreatingOrUpdating}
          {...register('menu_id', {
            required: 'Ce champ est obligatoire.',
          })}
        />
      </FormRowNew>

      <FormRow>
        <Button $variation="secondary" type="reset" onClick={() => onCloseModal?.()} disabled={isCreatingOrUpdating}>
          Annuler
        </Button>
        <Button disabled={isCreatingOrUpdating}>
          {isCreatingOrUpdating ? <SpinnerMini /> : isEditing ? 'Mettre à jour' : 'Créer'}
        </Button>
      </FormRow>
    </Form>
  );
}

CreateUpdatePermissionForm.propTypes = {
  onCloseModal: PropTypes.func,
  permissionToEdit: PropTypes.object,
};

export default CreateUpdatePermissionForm;
