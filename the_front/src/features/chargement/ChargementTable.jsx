import { useMemo, useState } from "react";
import Spinner from "../../ui/Spinner";
import Table from "../../ui/Table";
import { useSearchParams } from "react-router-dom";
import { PAGE_SIZE } from "../../constants.js";
import PropTypes from "prop-types";
import ChargementRow from "./ChargementRow.jsx";
import Pagination from "../../ui/Pagination.jsx";

function ChargementTable({ data, isLoading, error }) {
  const [searchParams, setSearchParams] = useSearchParams();
  const currentPage = parseInt(searchParams.get("page") || "1", 10);
  const [filters, setFilters] = useState({});

  const allChargements = useMemo(() => {
    if (data && data.data.data && Array.isArray(data.data.data.chargements)) {
      return data.data.data.chargements;
    }
    return [];
  }, [data]);

  console.log("all ::", allChargements);

  const filteredChargements = useMemo(() => {
    return allChargements.filter((chargement) =>
      Object.entries(filters).every(([key, value]) => {
        if (!value) return true;
        return chargement[key]
          ?.toString()
          .toLowerCase()
          .includes(value.toLowerCase());
      }),
    );
  }, [allChargements, filters]);

  const paginatedChargements = useMemo(() => {
    const startIndex = (currentPage - 1) * PAGE_SIZE;
    const endIndex = startIndex + PAGE_SIZE;
    return filteredChargements.slice(startIndex, endIndex);
  }, [filteredChargements, currentPage]);

  console.log("page", paginatedChargements);

  const totalCount = filteredChargements.length;
  const pageCount = Math.ceil(totalCount / PAGE_SIZE);

  const handleFilterChange = (columnName, value) => {
    setFilters((prev) => ({
      ...prev,
      [columnName]: value,
    }));
    setSearchParams({ page: "1" });
  };

  if (error) return <div>Error: {error.message}</div>;
  if (isLoading) return <Spinner />;

  const columns = [
    { name: "etat", width: "200px" },
    { name: "type", width: "170px" },
    { name: "nombre_succes", width: "170px" },
    { name: "nombre_echec", width: "170px" },
    { name: "date_creation", width: "170px" },
    { name: "charge_par", width: "200px" },
    { name: "statut", width: "200px" },
  ];

  const footer = (
    <Pagination
      count={totalCount}
      pageSize={PAGE_SIZE}
      currentPage={currentPage}
      pageCount={pageCount}
      onPageChange={(page) => setSearchParams({ page: page.toString() })}
    />
  );

  return (
    <Table
      columns={columns}
      data={paginatedChargements}
      onFilterChange={handleFilterChange}
      footer={footer}
    >
      <Table.Header>
        {columns.map((column) => (
          <div key={column.name} name={column.name}>
            {column.name}
          </div>
        ))}
      </Table.Header>
      <Table.Body
        render={(chargement) => (
          <ChargementRow key={`${chargement.id}`} chargement={chargement} />
        )}
      />
    </Table>
  );
}

ChargementTable.propTypes = {
  data: PropTypes.object,
  isLoading: PropTypes.bool.isRequired,
  error: PropTypes.object,
};

export default ChargementTable;
