import React from "react";
import styled from "styled-components";

const StyledSelect = styled.select`
  border: 1px solid var(--color-grey-300);
  background-color: var(--color-grey-0);
  border-radius: var(--border-radius-sm);
  padding: 0.8rem 1.2rem;
  box-shadow: var(--shadow-sm);
`;

interface Option {
  value: string;
  label: string;
}

interface Props extends React.SelectHTMLAttributes<HTMLSelectElement> {
  options: Option[];
}

const Select = React.forwardRef<HTMLSelectElement, Props>(
  ({ id, options, ...props }, ref) => {
    return (
      <StyledSelect id={id} ref={ref} {...props}>
        <option value="">Sélectionnez une option</option>
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label.toUpperCase()}
          </option>
        ))}
      </StyledSelect>
    );
  },
);

Select.displayName = "Select";

export default Select;
