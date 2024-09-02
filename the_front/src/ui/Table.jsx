import React, { createContext, useContext, useMemo, useState } from "react";
import styled from "styled-components";
import PropTypes from "prop-types";

const StyledTable = styled.div`
  border: 1px solid var(--color-grey-200);

  font-size: 1.4rem;
  background-color: var(--color-grey-0);
  border-radius: 7px;
  overflow: hidden;
`;

const CommonRow = styled.div`
  display: grid;
  grid-template-columns: ${(props) => props.$columns};
  column-gap: 1.4rem;
  align-items: start;
  transition: none;
`;

const StyledHeader = styled(CommonRow)`
  padding: 0.8rem 2.4rem;

  background-color: var(--color-grey-50);
  border-bottom: 1px solid var(--color-grey-100);
  text-transform: uppercase;
  letter-spacing: 0.4px;
  font-weight: 600;
  color: var(--color-grey-600);
`;

const StyledRow = styled(CommonRow)`
  padding: 0.4rem 2.4rem;

  &:not(:last-child) {
    border-bottom: 1px solid var(--color-grey-100);
  }
`;

const StyledBody = styled.section`
  margin: 0.4rem 0;
`;

const Footer = styled.footer`
  background-color: var(--color-grey-50);
  display: flex;
  justify-content: center;
  padding: 1.2rem;

  /* This will hide the footer when it contains no child elements. Possible thanks to the parent selector :has 🎉 */
  &:not(:has(*)) {
    display: none;
  }
`;

const Empty = styled.p`
  font-size: 1.6rem;
  font-weight: 500;
  text-align: center;
  margin: 2.4rem;
`;

const StyledCell = styled.div`
  word-wrap: break-word;
  overflow-wrap: break-word;
  hyphens: auto;
  min-width: 0;
  padding: 0.2rem 0;

  @media (max-width: 1366px) {
    font-size: 1.2rem;
`;

const StyledHeaderCell = styled(StyledCell)`
  font-size: 1.4rem; /* Taille de police de base */
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;

  @media (max-width: 1366px) {
    font-size: 1.2rem;
  }
`;

const HeaderCell = styled.div`
  display: flex;
  flex-direction: column;
`;

const FilterInput = styled.input`
  width: 100%;
  padding: 0.5rem;
  margin-top: 0.5rem;
  border: 1px solid var(--color-grey-200);
  border-radius: 8px;
  font-size: 1.2rem;
`;

const TableContext = createContext();

function Table({ columns, data, children, filterableColumns, onFilterChange }) {
  const [filters, setFilters] = useState({});

  const handleFilterChange = (name, value) => {
    setFilters((prev) => ({ ...prev, [name]: value }));
    if (onFilterChange) {
      onFilterChange(name, value);
    }
  };

  const filteredData = useMemo(() => {
    return data.filter((item) =>
      Object.entries(filters).every(([key, value]) => {
        if (value === "") return true;
        const itemValue = item[key]?.toString().toLowerCase() ?? "";
        return itemValue.includes(value.toLowerCase());
      }),
    );
  }, [data, filters]);

  const contextValue = {
    columns,
    filteredData,
    handleFilterChange,
    filters,
    filterableColumns,
  };

  return (
    <TableContext.Provider value={contextValue}>
      <StyledTable role="table">{children}</StyledTable>
    </TableContext.Provider>
  );
}

Table.propTypes = {
  columns: PropTypes.string,
  onFilterChange: PropTypes.func,
  data: PropTypes.array.isRequired,
  children: PropTypes.node.isRequired,
  filterableColumns: PropTypes.arrayOf(PropTypes.string),
};

function Header({ children }) {
  const { columns, handleFilterChange, filters, filterableColumns } =
    useContext(TableContext);
  return (
    <StyledHeader role="row" $columns={columns} as="header">
      {React.Children.map(children, (child) => (
        <HeaderCell>
          <StyledHeaderCell>{child}</StyledHeaderCell>
          {filterableColumns.includes(child.props.name) && (
            <FilterInput
              type="text"
              name={child.props.name}
              value={filters[child.props.name] || ""}
              onChange={(e) =>
                handleFilterChange(child.props.name, e.target.value)
              }
            />
          )}
        </HeaderCell>
      ))}
    </StyledHeader>
  );
}

Header.propTypes = {
  children: PropTypes.node.isRequired,
};

function Row({ children }) {
  const { columns } = useContext(TableContext);
  return (
    <StyledRow role="row" $columns={columns}>
      {React.Children.map(children, (child) => (
        <StyledCell>{child}</StyledCell>
      ))}
    </StyledRow>
  );
}

Row.propTypes = {
  children: PropTypes.node.isRequired,
};

function Body({ render }) {
  const { filteredData } = useContext(TableContext);
  if (!filteredData.length) return <Empty>Aucun élément à afficher</Empty>;
  return <StyledBody>{filteredData.map(render)}</StyledBody>;
}

Body.propTypes = {
  render: PropTypes.func.isRequired,
};

Table.Header = Header;
Table.Body = Body;
Table.Row = Row;
Table.Footer = Footer;

export default Table;
