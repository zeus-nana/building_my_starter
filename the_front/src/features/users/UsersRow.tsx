import styled from "styled-components";
import { User as Users } from "../../types/User.ts";

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const TableRow = styled.div`
  display: grid;
  grid-template-columns: 0.4fr 1fr 0.8fr 0.4fr 0.5fr 0.5fr 0.3fr 0.2fr;
  column-gap: 2.4rem;
  align-items: center;
  padding: 1.4rem 2.4rem;

  &:not(:last-child) {
    border-bottom: 1px solid var(--color-grey-100);
  }
`;

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const Img = styled.img`
  display: block;
  width: 6.4rem;
  aspect-ratio: 3 / 2;
  object-fit: cover;
  object-position: center;
  transform: scale(1.5) translateX(-7px);
`;

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const User = styled.div`
  font-size: 1.6rem;
  font-weight: 600;
  color: var(--color-grey-600);
  font-family: "Sono";
`;

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const Price = styled.div`
  font-family: "Sono";
  font-weight: 600;
`;

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const Discount = styled.div`
  font-family: "Sono";
  font-weight: 500;
  color: var(--color-green-700);
`;

function UsersRow({ user }: { user: Users }) {
  return (
    <TableRow role="row">
      <div>{user.login}</div>
      <div>{user.username}</div>
      <div>{user.email}</div>
      <div>{user.phone}</div>
      <div>{user.department.toUpperCase()}</div>
      <div>{user.localisation.toUpperCase()}</div>
      <div>{user.active ? "Actif" : "Inactif"}</div>
      <div></div>
    </TableRow>
  );
}

export default UsersRow;
