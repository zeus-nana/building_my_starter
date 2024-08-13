import Heading from "../ui/Heading";
import Row from "../ui/Row.tsx";
import UserTable from "../features/users/UserTable.tsx";

function Users() {
  return (
    <>
      <Row>
        <Heading as="h1">Users list</Heading>
      </Row>
      <Row>
        <UserTable />
      </Row>
    </>
  );
}

export default Users;
