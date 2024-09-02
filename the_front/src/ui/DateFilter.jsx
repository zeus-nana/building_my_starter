import styled from "styled-components";
import PropTypes from "prop-types";

const StyledDateFilter = styled.div`
  padding: 0.8rem;
  display: flex;
  gap: 1rem;
  align-items: center;
`;

const StyledInput = styled.input`
  border: 1px solid var(--color-grey-300);
  background-color: var(--color-grey-0);
  border-radius: var(--border-radius-sm);
  padding: 0.4rem 0.8rem;
  font-size: 1.4rem;
`;

const Label = styled.label`
  font-weight: 500;
  font-size: 1.4rem;
`;

function DateFilter({
  startDate,
  endDate,
  onStartDateChange,
  onEndDateChange,
}) {
  return (
    <StyledDateFilter>
      <Label htmlFor="startDate">du:</Label>
      <StyledInput
        type="date"
        id="startDate"
        value={startDate}
        onChange={(e) => onStartDateChange(e.target.value)}
      />

      <Label htmlFor="endDate">au:</Label>
      <StyledInput
        type="date"
        id="endDate"
        value={endDate}
        onChange={(e) => onEndDateChange(e.target.value)}
      />
    </StyledDateFilter>
  );
}

DateFilter.propTypes = {
  startDate: PropTypes.string.isRequired,
  endDate: PropTypes.string.isRequired,
  onStartDateChange: PropTypes.func.isRequired,
  onEndDateChange: PropTypes.func.isRequired,
};

export default DateFilter;
