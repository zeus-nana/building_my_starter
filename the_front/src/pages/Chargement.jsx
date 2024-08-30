import Row from "../ui/Row.jsx";
import Heading from "../ui/Heading.jsx";
import UsersTable from "../features/users/UsersTable.jsx";
import UploadFile from "../features/chargement/UploadFile.jsx";

function Chargement() {
  return (
    <>
      <Row type="horizontal">
        <Heading type="h1">Changements</Heading>
      </Row>
      <Row>
        <UsersTable />
        <UploadFile />
      </Row>
    </>
  );
}

export default Chargement;
