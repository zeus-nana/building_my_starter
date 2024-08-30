import styled from "styled-components";
import React from "react";
import PropTypes from "prop-types";

const StyledFileInput = styled.input`
  font-size: 1.4rem;
  border-radius: var(--border-radius-sm);

  &::file-selector-button {
    font: inherit;
    font-weight: 500;
    padding: 0.8rem 1.2rem;
    margin-right: 1.2rem;
    border-radius: var(--border-radius-sm);
    border: none;
    color: var(--color-brand-50);
    background-color: var(--color-brand-600);
    cursor: pointer;
    transition:
      color 0.2s,
      background-color 0.2s;

    &:hover {
      background-color: var(--color-brand-700);
    }
  }
`;

// eslint-disable-next-line react/display-name
const FileInput = React.forwardRef((props, ref) => {
  const { extensions, ...rest } = props;
  const accept = extensions && extensions.map((ext) => `.${ext}`).join(", ");

  return (
    <StyledFileInput type="file" multiple accept={accept} ref={ref} {...rest} />
  );
});

FileInput.propTypes = {
  extensions: PropTypes.arrayOf(PropTypes.string).isRequired,
};

export default FileInput;
