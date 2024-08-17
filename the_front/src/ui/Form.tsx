import styled, { css } from "styled-components";

// Définissez une interface pour les props de Form
interface FormProps {
  type?: "modal" | "default"; // ou tout autre type que vous souhaitez utiliser
}

const Form = styled.form<FormProps>`
  ${(props) =>
    props.type === "default" &&
    css`
      padding: 2.4rem 4rem;

      /* Box */
      background-color: var(--color-grey-0);
      border: 1px solid var(--color-grey-100);
      border-radius: var(--border-radius-md);
    `}

  ${(props) =>
    props.type === "modal" &&
    css`
      width: 80rem;
    `}
    
  overflow: hidden;
  font-size: 1.4rem;
`;

Form.defaultProps = {
  type: "default",
};

export default Form;
