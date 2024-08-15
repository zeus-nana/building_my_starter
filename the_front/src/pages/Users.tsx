import Heading from "../ui/Heading.tsx";
import Row from "../ui/Row.tsx";
import UsersTable from "../features/users/UsersTable.tsx";

function Users() {
  return (
    <>
      <Row type="horizontal">
        <Heading type="h1">USERS</Heading>
      </Row>
      <Row>
        <UsersTable />
      </Row>
    </>
  );
}

export default Users;
