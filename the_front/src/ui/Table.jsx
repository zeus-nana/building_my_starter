// import React, { createContext, useContext, useMemo, useState } from "react";
// import styled from "styled-components";
// import PropTypes from "prop-types";
//
// const StyledTable = styled.div`
//   border: 1px solid var(--color-grey-200);
//
//   font-size: 1.4rem;
//   background-color: var(--color-grey-0);
//   border-radius: 7px;
//   overflow: hidden;
// `;
//
// const CommonRow = styled.div`
//   display: grid;
//   grid-template-columns: ${(props) => props.$columns};
//   column-gap: 1.4rem;
//   align-items: start;
//   transition: none;
// `;
//
// const StyledHeader = styled(CommonRow)`
//   padding: 0.8rem 2.4rem;
//
//   background-color: var(--color-grey-50);
//   border-bottom: 1px solid var(--color-grey-100);
//   text-transform: uppercase;
//   letter-spacing: 0.4px;
//   font-weight: 600;
//   color: var(--color-grey-600);
// `;
//
// const StyledRow = styled(CommonRow)`
//   padding: 0.4rem 2.4rem;
//
//   &:not(:last-child) {
//     border-bottom: 1px solid var(--color-grey-100);
//   }
// `;
//
// const StyledBody = styled.section`
//   margin: 0.4rem 0;
// `;
//
// const Footer = styled.footer`
//   background-color: var(--color-grey-50);
//   display: flex;
//   justify-content: center;
//   padding: 1.2rem;
//
//   /* This will hide the footer when it contains no child elements. Possible thanks to the parent selector :has 🎉 */
//   &:not(:has(*)) {
//     display: none;
//   }
// `;
//
// const Empty = styled.p`
//   font-size: 1.6rem;
//   font-weight: 500;
//   text-align: center;
//   margin: 2.4rem;
// `;
//
// const StyledCell = styled.div`
//   word-wrap: break-word;
//   overflow-wrap: break-word;
//   hyphens: auto;
//   min-width: 0;
//   padding: 0.2rem 0;
//
//   @media (max-width: 1366px) {
//     font-size: 1.2rem;
// `;
//
// const StyledHeaderCell = styled(StyledCell)`
//   font-size: 1.4rem; /* Taille de police de base */
//   white-space: nowrap;
//   overflow: hidden;
//   text-overflow: ellipsis;
//
//   @media (max-width: 1366px) {
//     font-size: 1.2rem;
//   }
// `;
//
// const HeaderCell = styled.div`
//   display: flex;
//   flex-direction: column;
// `;
//
// const FilterInput = styled.input`
//   width: 100%;
//   padding: 0.5rem;
//   margin-top: 0.5rem;
//   border: 1px solid var(--color-grey-200);
//   border-radius: 8px;
//   font-size: 1.2rem;
// `;
//
// const TableContext = createContext();
//
// function Table({ columns, data, children, filterableColumns, onFilterChange }) {
//   const [filters, setFilters] = useState({});
//
//   const handleFilterChange = (name, value) => {
//     setFilters((prev) => ({ ...prev, [name]: value }));
//     if (onFilterChange) {
//       onFilterChange(name, value);
//     }
//   };
//
//   const filteredData = useMemo(() => {
//     return data.filter((item) =>
//       Object.entries(filters).every(([key, value]) => {
//         if (value === "") return true;
//         const itemValue = item[key]?.toString().toLowerCase() ?? "";
//         return itemValue.includes(value.toLowerCase());
//       }),
//     );
//   }, [data, filters]);
//
//   const contextValue = {
//     columns,
//     filteredData,
//     handleFilterChange,
//     filters,
//     filterableColumns,
//   };
//
//   return (
//     <TableContext.Provider value={contextValue}>
//       <StyledTable role="table">{children}</StyledTable>
//     </TableContext.Provider>
//   );
// }
//
// Table.propTypes = {
//   columns: PropTypes.string,
//   onFilterChange: PropTypes.func,
//   data: PropTypes.array.isRequired,
//   children: PropTypes.node.isRequired,
//   filterableColumns: PropTypes.arrayOf(PropTypes.string),
// };
//
// function Header({ children }) {
//   const { columns, handleFilterChange, filters, filterableColumns } =
//     useContext(TableContext);
//   return (
//     <StyledHeader role="row" $columns={columns} as="header">
//       {React.Children.map(children, (child) => (
//         <HeaderCell>
//           <StyledHeaderCell>{child}</StyledHeaderCell>
//           {filterableColumns.includes(child.props.name) && (
//             <FilterInput
//               type="text"
//               name={child.props.name}
//               value={filters[child.props.name] || ""}
//               onChange={(e) =>
//                 handleFilterChange(child.props.name, e.target.value)
//               }
//             />
//           )}
//         </HeaderCell>
//       ))}
//     </StyledHeader>
//   );
// }
//
// Header.propTypes = {
//   children: PropTypes.node.isRequired,
// };
//
// function Row({ children }) {
//   const { columns } = useContext(TableContext);
//   return (
//     <StyledRow role="row" $columns={columns}>
//       {React.Children.map(children, (child) => (
//         <StyledCell>{child}</StyledCell>
//       ))}
//     </StyledRow>
//   );
// }
//
// Row.propTypes = {
//   children: PropTypes.node.isRequired,
// };
//
// function Body({ render }) {
//   const { filteredData } = useContext(TableContext);
//   if (!filteredData.length) return <Empty>Aucun élément à afficher</Empty>;
//   return <StyledBody>{filteredData.map(render)}</StyledBody>;
// }
//
// Body.propTypes = {
//   render: PropTypes.func.isRequired,
// };
//
// Table.Header = Header;
// Table.Body = Body;
// Table.Row = Row;
// Table.Footer = Footer;
//
// export default Table;

import React, { createContext, useContext, useMemo, useState } from "react";
import styled from "styled-components";
import PropTypes from "prop-types";

const TableContainer = styled.div`
  display: flex;
  flex-direction: column;
  height: 100%;
  width: 100%;
`;

const StyledTable = styled.div`
  border: 1px solid var(--color-grey-200);
  font-size: 1.4rem;
  background-color: var(--color-grey-0);
  border-radius: 7px;
  overflow: hidden;
  flex-grow: 1;
`;

const TableWrapper = styled.div`
  overflow-x: auto;
  max-height: 100%;
`;

const TableContent = styled.div`
  min-width: 100%;
  width: max-content;
`;

const StyledHeader = styled.div`
  background-color: var(--color-grey-50);
  border-bottom: 1px solid var(--color-grey-200);
  position: sticky;
  top: 0;
  z-index: 1;
`;

const HeaderRow = styled.div`
  display: flex;
`;

const HeaderCell = styled.div`
  padding: 0.8rem 1.2rem 0.4rem; // Réduit le padding en bas
  text-transform: uppercase;
  letter-spacing: 0.4px;
  font-weight: 600;
  color: var(--color-grey-600);
  width: ${(props) => props.$width || "200px"};
  flex-shrink: 0;
  text-align: center;
  display: flex;
  flex-direction: column;
  align-items: center;
  border-right: 1px solid var(--color-grey-200);

  &:last-child {
    border-right: none;
  }
`;

const FilterInput = styled.input`
  width: calc(100% - 0.5rem);
  padding: 0.4rem; // Réduit le padding
  margin: 0.2rem 0.25rem 0.4rem; // Ajuste les marges
  border: 1px solid var(--color-grey-200);
  border-radius: 8px;
  font-size: 1.2rem;
`;

const StyledRow = styled.div`
  display: flex;
  &:not(:last-child) {
    border-bottom: 1px solid var(--color-grey-100);
  }
`;

const StyledCell = styled.div`
  padding: 0.4rem 1.2rem;
  word-wrap: break-word;
  overflow-wrap: break-word;
  hyphens: auto;
  width: ${(props) => props.$width || "200px"};
  flex-shrink: 0;
  text-align: ${(props) => props.$alignment || "left"};
  border-right: 1px solid var(--color-grey-100);

  &:last-child {
    border-right: none;
  }
`;

const StyledBody = styled.div`
  margin: 0.4rem 0;
`;

const StyledFooter = styled.div`
  background-color: var(--color-grey-50);
  padding: 1.2rem;
  border-top: 1px solid var(--color-grey-200);
  border-radius: 7px;
`;

const Empty = styled.p`
  font-size: 1.6rem;
  font-weight: 500;
  text-align: start;
  margin: 2.4rem;
`;

const TableContext = createContext();

function Table({ columns, data, children, onFilterChange, footer }) {
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
  };

  return (
    <TableContext.Provider value={contextValue}>
      <TableContainer>
        <StyledTable role="table">
          <TableWrapper>
            <TableContent>{children}</TableContent>
          </TableWrapper>
        </StyledTable>
        {footer && <StyledFooter>{footer}</StyledFooter>}
      </TableContainer>
    </TableContext.Provider>
  );
}

Table.propTypes = {
  columns: PropTypes.arrayOf(
    PropTypes.shape({
      name: PropTypes.string.isRequired,
      width: PropTypes.string,
    }),
  ).isRequired,
  onFilterChange: PropTypes.func,
  data: PropTypes.array.isRequired,
  children: PropTypes.node.isRequired,
  footer: PropTypes.node,
};

function Header({ children }) {
  const { columns, handleFilterChange, filters } = useContext(TableContext);
  return (
    <StyledHeader role="row" as="header">
      <HeaderRow>
        {columns.map((column) => (
          <HeaderCell key={column.name} $width={column.width}>
            {React.Children.toArray(children).find(
              (child) => child.props.name === column.name,
            )}
            <FilterInput
              type="text"
              name={column.name}
              value={filters[column.name] || ""}
              onChange={(e) => handleFilterChange(column.name, e.target.value)}
              // placeholder={`Filtre ${column.name}`}
            />
          </HeaderCell>
        ))}
      </HeaderRow>
    </StyledHeader>
  );
}

Header.propTypes = {
  children: PropTypes.node.isRequired,
};

function Row({ children }) {
  const { columns } = useContext(TableContext);
  return (
    <StyledRow role="row">
      {columns.map((column) => {
        const child = React.Children.toArray(children).find(
          (child) => child.props.name === column.name,
        );
        return (
          <StyledCell
            key={column.name}
            $width={column.width}
            $alignment={child.props.alignment || "left"}
          >
            {child}
          </StyledCell>
        );
      })}
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

export default Table;
