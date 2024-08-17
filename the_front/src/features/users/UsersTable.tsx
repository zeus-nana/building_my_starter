import React, { useState, useMemo } from "react";
import styled from "styled-components";
import { useQuery } from "@tanstack/react-query";
import AdminService from "../../services/adminService";
import Spinner from "../../ui/Spinner";
import UsersRow from "./UsersRow";
import { User } from "../../types/User";
import Table from "../../ui/Table.tsx";
import Menus from "../../ui/Menus.tsx";

const TableHeader = styled.header`
  display: grid;
  grid-template-columns: 0.4fr 1fr 0.8fr 0.4fr 0.5fr 0.5fr 0.3fr 0.2fr;
  column-gap: 2.4rem;
  align-items: center;
  background-color: var(--color-grey-50);
  border-bottom: 1px solid var(--color-grey-100);
  text-transform: uppercase;
  letter-spacing: 0.4px;
  font-weight: 600;
  color: var(--color-grey-600);
  padding: 1.6rem 2.4rem;
`;

const FilterInput = styled.input`
  width: 100%;
  padding: 0.5rem;
  margin-top: 0.5rem;
  border: 1px solid var(--color-grey-200);
  border-radius: 8px;
  font-size: 1.2rem;
`;

const HeaderCell = styled.div`
  display: flex;
  flex-direction: column;
`;

function UsersTable() {
  const [filters, setFilters] = useState({
    login: "",
    username: "",
    email: "",
    phone: "",
    department: "",
    localisation: "",
    active: "",
  });

  const {
    isLoading,
    data: response,
    error,
  } = useQuery({
    queryKey: ["users"],
    queryFn: AdminService.getAllUsers,
  });

  const users = response?.data.data.users ?? [];

  const filteredUsers = useMemo(() => {
    return users.filter((user: User) =>
      Object.entries(filters).every(([key, value]) => {
        if (value === "") return true;
        const userValue =
          user[key as keyof User]?.toString().toLowerCase() || "";
        return userValue.includes(value.toLowerCase());
      }),
    );
  }, [users, filters]);

  const handleFilterChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFilters((prev) => ({ ...prev, [name]: value }));
  };

  if (error) return <div>Error: {(error as Error).message}</div>;
  if (isLoading) return <Spinner />;

  return (
    <Menus>
      <Table columns="0.4fr 1fr 0.8fr 0.4fr 0.5fr 0.5fr 0.3fr 0.1fr;">
        <Table.Header>
          <HeaderCell>
            <div>Login</div>
            <FilterInput
              type="text"
              name="login"
              value={filters.login}
              onChange={handleFilterChange}
            />
          </HeaderCell>
          <HeaderCell>
            <div>Nom</div>
            <FilterInput
              type="text"
              name="username"
              value={filters.username}
              onChange={handleFilterChange}
            />
          </HeaderCell>
          <HeaderCell>
            <div>Email</div>
            <FilterInput
              type="text"
              name="email"
              value={filters.email}
              onChange={handleFilterChange}
            />
          </HeaderCell>
          <HeaderCell>
            <div>Téléphone</div>
            <FilterInput
              type="text"
              name="phone"
              value={filters.phone}
              onChange={handleFilterChange}
            />
          </HeaderCell>
          <HeaderCell>
            <div>Département</div>
            <FilterInput
              type="text"
              name="department"
              value={filters.department}
              onChange={handleFilterChange}
            />
          </HeaderCell>
          <HeaderCell>
            <div>Localisation</div>
            <FilterInput
              type="text"
              name="localisation"
              value={filters.localisation}
              onChange={handleFilterChange}
            />
          </HeaderCell>
          <HeaderCell>
            <div>Statut</div>
            <FilterInput
              type="text"
              name="active"
              value={filters.active}
              onChange={handleFilterChange}
            />
          </HeaderCell>
        </Table.Header>

        <Table.Body
          data={filteredUsers}
          render={(user: User) => <UsersRow key={user.id} user={user} />}
        />
      </Table>
    </Menus>
  );
}

export default UsersTable;
