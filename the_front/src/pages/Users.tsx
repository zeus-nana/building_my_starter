import Heading from "../ui/Heading.tsx";
import Row from "../ui/Row.tsx";
import UsersTable from "../features/users/UsersTable.tsx";
import Button from "../ui/Button.tsx";
import { useState } from "react";
import CreateUserForm from "../features/users/CreateUserForm.tsx";

function Users() {
  const [showForm, setShowForm] = useState(false);

  return (
    <>
      <Row type="horizontal">
        <Heading type="h1">Utilisateurs</Heading>
      </Row>
      <Row>
        <UsersTable />

        <Button onClick={() => setShowForm(!showForm)}>Add a User</Button>

        {showForm && <CreateUserForm />}
      </Row>
    </>
  );
}

export default Users;
