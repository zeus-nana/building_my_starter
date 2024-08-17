import Heading from "../ui/Heading.tsx";
import Row from "../ui/Row.tsx";
import UsersTable from "../features/users/UsersTable.tsx";
import AddUser from "../features/users/AddUser.tsx";

function Users() {
  return (
    <>
      <Row type="horizontal">
        <Heading type="h1">Utilisateurs</Heading>
      </Row>
      <Row>
        <UsersTable />
        <AddUser />
      </Row>
    </>
  );
}

export default Users;
