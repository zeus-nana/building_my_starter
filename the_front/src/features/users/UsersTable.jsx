import { useMemo, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import AdminService from "../../services/adminService";
import Spinner from "../../ui/Spinner";
import UsersRow from "./UsersRow";
import Table from "../../ui/Table";
import Menus from "../../ui/Menus";
import Pagination from "../../ui/Pagination.jsx";
import { useSearchParams } from "react-router-dom";
import { PAGE_SIZE } from "../../constants.js";

function UsersTable() {
  const [searchParams, setSearchParams] = useSearchParams();
  const currentPage = parseInt(searchParams.get("page") || "1", 10);
  const [filters, setFilters] = useState({});

  const {
    isLoading,
    data: response,
    error,
  } = useQuery({
    queryKey: ["users"],
    queryFn: AdminService.getAllUsers,
  });

  const allUsers = response?.data?.data?.users ?? [];

  const filteredUsers = useMemo(() => {
    return allUsers.filter((user) =>
      Object.entries(filters).every(([key, value]) => {
        if (!value) return true;
        return user[key]
          ?.toString()
          .toLowerCase()
          .includes(value.toLowerCase());
      }),
    );
  }, [allUsers, filters]);

  const paginatedUsers = useMemo(() => {
    const startIndex = (currentPage - 1) * PAGE_SIZE;
    const endIndex = startIndex + PAGE_SIZE;
    return filteredUsers.slice(startIndex, endIndex);
  }, [filteredUsers, currentPage]);

  const totalCount = filteredUsers.length;
  const pageCount = Math.ceil(totalCount / PAGE_SIZE);

  const filterableColumns = [
    "login",
    "username",
    "email",
    "phone",
    "profile",
    "department",
    "localisation",
    "active",
  ];

  const handleFilterChange = (columnName, value) => {
    setFilters((prev) => ({
      ...prev,
      [columnName]: value,
    }));
    setSearchParams({ page: "1" }); // Reset to first page when filter changes
  };

  if (error) return <div>Error: {error.message}</div>;
  if (isLoading) return <Spinner />;

  return (
    <Menus>
      <Table
        columns="0.1fr 0.4fr 0.8fr 0.8fr 0.4fr 0.5fr 0.5fr 0.5fr 0.4fr 0.1fr"
        data={paginatedUsers}
        filterableColumns={filterableColumns}
        onFilterChange={handleFilterChange}
      >
        <Table.Header>
          <div></div>
          <div name="login">Login</div>
          <div name="username">Nom</div>
          <div name="email">Email</div>
          <div name="phone">Téléphone</div>
          <div name="profile">Profile</div>
          <div name="department">Département</div>
          <div name="localisation">Localisation</div>
          <div name="active">Statut</div>
          <div></div>
        </Table.Header>

        <Table.Body render={(user) => <UsersRow key={user.id} user={user} />} />

        <Table.Footer>
          <Pagination
            count={totalCount}
            pageSize={PAGE_SIZE}
            currentPage={currentPage}
            pageCount={pageCount}
            onPageChange={(page) => setSearchParams({ page: page.toString() })}
          />
        </Table.Footer>
      </Table>
    </Menus>
  );
}

export default UsersTable;
