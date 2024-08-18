import Input from "../../ui/Input";
import Form from "../../ui/Form";
import { useForm } from "react-hook-form";
import { CreateUserResponse } from "../../services/adminService.ts";
import FormRow from "../../ui/FormRow.tsx";
import {
  UserCreationAttributes,
  UserProfile,
  UserLocalisation,
} from "../../types/User.ts";
import Button from "../../ui/Button.tsx";
import Select from "../../ui/Select.tsx";
import { ApiResponse } from "../../services/apiService.ts";
import { useCreateUser } from "./useCreateUser.ts";
import SpinnerMini from "../../ui/SpinnerMini.tsx";

const localisationOptions: { value: UserLocalisation; label: string }[] =
  Object.values(UserLocalisation).map((value) => ({
    value,
    label: value.charAt(0).toUpperCase() + value.slice(1).replace("_", " "),
  }));

const profileOptions: { value: UserProfile; label: string }[] = Object.values(
  UserProfile,
).map((value) => ({
  value,
  label: value.charAt(0).toUpperCase() + value.slice(1),
}));

function CreateUserForm({ userToEdit = {}, onCloseModal }) {
  const { register, handleSubmit, reset, formState } =
    useForm<UserCreationAttributes>({
      defaultValues: {
        localisation: null,
        profil: null,
      },
    });

  const { errors } = formState;

  const { isCreating, creatingUser } = useCreateUser(onCloseModal);

  function onSubmit(data: UserCreationAttributes) {
    creatingUser(
      { ...data },
      {
        onSuccess: async (data: ApiResponse<CreateUserResponse>) => {
          reset();
        },
      },
    );
  }

  function onError(errors: typeof formState.errors) {
    console.log(errors);
  }

  return (
    <Form
      onSubmit={handleSubmit(onSubmit, onError)}
      type={onCloseModal ? "modal" : "default"}
    >
      <FormRow label="Login" error={errors?.login?.message}>
        <Input
          type="text"
          id="login"
          disabled={isCreating}
          {...register("login", {
            required: "Ce champ est obligatoire.",
          })}
        />
      </FormRow>
      <FormRow label="Nom" error={errors?.username?.message}>
        <Input
          type="text"
          id="username"
          disabled={isCreating}
          {...register("username", {
            required: "Ce champ est obligatoire.",
          })}
        />
      </FormRow>
      <FormRow label="Email" error={errors?.email?.message}>
        <Input
          type="email"
          id="email"
          disabled={isCreating}
          {...register("email", {
            required: "Ce champ est obligatoire.",
            pattern: {
              value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
              message: "Adresse email invalide.",
            },
          })}
        />
      </FormRow>
      <FormRow label="Téléphone" error={errors?.phone?.message}>
        <Input
          type="tel"
          id="phone"
          disabled={isCreating}
          {...register("phone", {
            required: "Ce champ est obligatoire.",
            pattern: {
              value: /^[0-9]+$/,
              message: "Le numéro ne doit contenir que des chiffres.",
            },
          })}
        />
      </FormRow>

      <FormRow label="Profil" error={errors?.profil?.message}>
        <Select
          options={profileOptions}
          id="profil"
          disabled={isCreating}
          {...register("profil", {
            required: "Ce champ est obligatoire.",
          })}
        />
      </FormRow>

      <FormRow label="Département" error={errors?.department?.message}>
        <Input
          type="text"
          id="department"
          disabled={isCreating}
          {...register("department")}
        />
      </FormRow>

      <FormRow label="Localisation" error={errors?.localisation?.message}>
        <Select
          options={localisationOptions}
          id="localisation"
          disabled={isCreating}
          {...register("localisation", {
            required: "Ce champ est obligatoire.",
          })}
        />
      </FormRow>

      <FormRow>
        <Button
          $variation="secondary"
          type="reset"
          onClick={() => onCloseModal?.()}
          disabled={isCreating}
        >
          Annuler
        </Button>
        <Button disabled={isCreating}>
          {!isCreating ? "Enregistrer" : <SpinnerMini />}
        </Button>
      </FormRow>
    </Form>
  );
}

export default CreateUserForm;
