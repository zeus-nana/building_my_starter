import Menus from "../../ui/Menus.tsx";
import Table from "../../ui/Table.tsx";

function UserTable() {
  return (
    <Menus>
      <Table columns="0.6fr 1.8fr 2.2fr 1fr 1fr 1fr 1fr">
        <Table.Header>
          <div>Département</div>
          <div>Nom</div>
          <div>Email</div>
          <div>Téléphone</div>
          <div>Role</div>
          <div>Status</div>
          <div></div>
        </Table.Header>
      </Table>
    </Menus>
  );
}

export default UserTable;
