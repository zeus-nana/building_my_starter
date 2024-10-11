import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

const StyledSelect = styled.select`
  border: 1px solid var(--color-grey-300);
  background-color: var(--color-grey-0);
  border-radius: var(--border-radius-sm);
  padding: 0.8rem 1.2rem;
  box-shadow: var(--shadow-sm);
  font-size: 1.4rem;
  width: 100%;

  @media (max-width: 1366px) {
    font-size: 1.26rem;
    padding: 0.72rem 1.08rem;
  }

  @media (max-width: 768px) {
    font-size: 1.2rem;
    padding: 0.64rem 0.96rem;
  }

  &:focus {
    outline: none;
    border-color: var(--color-brand-600);
    box-shadow: 0 0 0 2px rgba(var(--color-brand-600-rgb), 0.1);
  }
`;

const Select = React.forwardRef(({ id, options, ...props }, ref) => {
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
});

Select.propTypes = {
  id: PropTypes.string,
  options: PropTypes.arrayOf(
    PropTypes.shape({
      value: PropTypes.string.isRequired,
      label: PropTypes.string.isRequired,
    })
  ).isRequired,
};

Select.displayName = 'Select';

export default Select;
