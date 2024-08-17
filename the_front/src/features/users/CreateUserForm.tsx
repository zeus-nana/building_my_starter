import Input from "../../ui/Input";
import Form from "../../ui/Form";
import { useForm } from "react-hook-form";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import AdminService from "../../services/adminService.ts";
import toast from "react-hot-toast";
import FormRow from "../../ui/FormRow.tsx";
import { UserCreationAttributes } from "../../types/User.ts";
import Button from "../../ui/Button.tsx";
import axios, { AxiosError } from "axios";
import Select from "../../ui/Select.tsx";

interface ErrorResponse {
  status: string;
  message: string;
}

const departmentOptions = [
  { value: "IT_SUPPORT", label: "IT Support" },
  { value: "PROJECT", label: "Project" },
  { value: "FINANCE", label: "Finance" },
  { value: "AUDIT", label: "Audit" },
];

const localisationOptions = [
  { value: "CENTRE", label: "CENTRE" },
  { value: "OUEST", label: "OUEST" },
  { value: "SIEGE", label: "SIEGE" },
  { value: "SUD", label: "SUD" },
];

function CreateUserForm({ onCloseModal }) {
  const { register, handleSubmit, reset, formState } =
    useForm<UserCreationAttributes>({
      defaultValues: {
        department: "",
        localisation: "",
      },
    });

  const { errors } = formState;

  const queryClient = useQueryClient();

  const { mutate, isLoading: isCreating } = useMutation({
    mutationFn: AdminService.createUser,
    onSuccess: () => {
      toast.success(`Nouvel utilisateur créé avec succès.`);
      queryClient.invalidateQueries({
        queryKey: ["users"],
      });
      reset();
      onCloseModal?.();
    },

    onError: (error: Error | AxiosError<ErrorResponse>) => {
      if (axios.isAxiosError(error) && error.response?.data) {
        toast.error(`Erreur: ${error.response.data.message}`);
      } else {
        toast.error(`Erreur lors de la création de l'utilisateur.`);
      }
    },
  });

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  function onSubmit(data: UserCreationAttributes) {
    mutate(data);
  }

  function onError(errors: typeof formState.errors) {
    {
      console.log(errors.login);
    }
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

      <FormRow label="Département" error={errors?.department?.message}>
        <Select
          options={departmentOptions}
          id="department"
          disabled={isCreating}
          {...register("department", {
            required: "Ce champ est obligatoire.",
          })}
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
        {/* type is an HTML attribute! */}
        <Button
          $variation="secondary"
          type="reset"
          onClick={() => onCloseModal?.()}
          disabled={isCreating}
        >
          Annuler
        </Button>
        <Button disabled={isCreating}>Enregistrer</Button>
      </FormRow>
    </Form>
  );
}

export default CreateUserForm;
