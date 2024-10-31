import { useState, useEffect } from 'react';
import { useForm, Controller } from 'react-hook-form';
import { useCreateConfigFonction } from './useCreateConfigFonction';
import { useGetFonctions } from '../fonction/useGetFonctions.js';
import { useGetMenus } from '../menu/useGetMenus.js';
import { useGetPermissions } from '../permission/useGetPermissions.js';
import Spinner from '../../../ui/Spinner';
import Button from '../../../ui/Button.jsx';
import Form from '../../../ui/Form.jsx';
import FormRowNew from '../../../ui/FormRowNew.jsx';
import SpinnerMini from '../../../ui/SpinnerMini.jsx';
import Select from '../../../ui/Select.jsx';
import FormRow from '../../../ui/FormRow.jsx';
// import SelectManyMenu from '../../../ui/SelectManyMenu';
import PropTypes from 'prop-types';

function ConfigFonctionForm({ onCloseModal }) {
  const { control, handleSubmit, watch, formState } = useForm();
  const [selectedMenuId, setSelectedMenuId] = useState('');
  const { isCreating, createConfigFonction } = useCreateConfigFonction(onCloseModal);

  const { isLoading: isLoadingFonctions, data: fonctionsData } = useGetFonctions();
  const { isLoading: isLoadingMenus, data: menusData } = useGetMenus();
  const { isLoading: isLoadingPermissions, data: permissionsData } = useGetPermissions();

  const { errors } = formState;

  const fonctions = fonctionsData?.data?.data?.fonctions || [];
  const menus = menusData?.data?.data?.menus || [];
  const allPermissions = permissionsData?.data?.data?.permissions || [];

  const [filteredPermissions, setFilteredPermissions] = useState([]);

  const selectedMenu = watch('menu_id');

  useEffect(() => {
    if (selectedMenu) {
      setSelectedMenuId(selectedMenu);
      const menuPermissions = allPermissions.filter((permission) => permission.menu_id === parseInt(selectedMenu));
      setFilteredPermissions(menuPermissions);
    }
  }, [selectedMenu, allPermissions]);

  const onSubmit = (data) => {
    const configData = {
      fonction_id: parseInt(data.fonction_id),
      menu_id: parseInt(data.menu_id),
      permission_ids: data.permissions.map((id) => parseInt(id)),
    };

    createConfigFonction(configData);
  };

  function onError(errors) {
    console.log(errors);
  }

  if (isLoadingFonctions || isLoadingMenus || isLoadingPermissions) return <Spinner />;

  const fonctionOptions = fonctions.map((fonction) => ({
    value: fonction.id,
    label: fonction.nom,
  }));

  const menuOptions = menus.map((menu) => ({
    value: menu.id,
    label: menu.nom,
  }));

  const permissionOptions = filteredPermissions.map((permission) => ({
    value: permission.id.toString(),
    label: permission.nom,
  }));

  return (
    <Form onSubmit={handleSubmit(onSubmit, onError)} type={onCloseModal ? 'modal' : 'regular'}>
      <FormRowNew label="Fonction" error={errors?.fonction_id?.message}>
        <Controller
          name="fonction_id"
          control={control}
          rules={{ required: 'Ce champ est obligatoire.' }}
          render={({ field }) => <Select options={fonctionOptions} id="fonction_id" disabled={isCreating} {...field} />}
        />
      </FormRowNew>

      <FormRowNew label="Menu" error={errors?.menu_id?.message}>
        <Controller
          name="menu_id"
          control={control}
          rules={{ required: 'Ce champ est obligatoire.' }}
          render={({ field }) => <Select options={menuOptions} id="menu_id" disabled={isCreating} {...field} />}
        />
      </FormRowNew>

      {/*{selectedMenuId && (*/}
      {/*  <FormRowNew label="Permissions" error={errors?.permissions?.message}>*/}
      {/*    <Controller*/}
      {/*      name="permissions"*/}
      {/*      control={control}*/}
      {/*      rules={{ required: 'Veuillez sélectionner au moins une permission.' }}*/}
      {/*      render={({ field }) => (*/}
      {/*        // <SelectManyMenu*/}
      {/*        //   id="permissions"*/}
      {/*        //   options={permissionOptions}*/}
      {/*        //   onChange={field.onChange}*/}
      {/*        //   value={field.value}*/}
      {/*        //   disabled={isCreating}*/}
      {/*        // />*/}
      {/*      )}*/}
      {/*    />*/}
      {/*  </FormRowNew>*/}
      {/*)}*/}

      {/*<MultiSelectDropdown />*/}
      <FormRow>
        <Button $variation="secondary" type="reset" onClick={() => onCloseModal?.()} disabled={isCreating}>
          Annuler
        </Button>
        <Button disabled={isCreating}>{isCreating ? <SpinnerMini /> : 'Créer'}</Button>
      </FormRow>
    </Form>
  );
}
ConfigFonctionForm.propTypes = {
  onCloseModal: PropTypes.func,
};

export default ConfigFonctionForm;
