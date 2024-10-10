import styled from "styled-components";
import Logo from "./Logo.jsx";
import {
  HiOutlineBars2,
  HiOutlineBars4,
  HiOutlineHome,
  HiOutlineUsers,
} from "react-icons/hi2";
import { HiOutlineChartBar, HiOutlineUpload } from "react-icons/hi";
import MainNav from "./MultiLevelNav.jsx";

const StyledSidebar = styled.aside`
  background-color: var(--color-grey-0);
  padding: 3.2rem 2.4rem;
  border-right: 1px solde var(--color-grey-100);

  grid-row: 1 / -1;
  display: flex;
  flex-direction: column;
  gap: 3.2rem;
`;

function Sidebar() {
  const navItems = [
    { icon: <HiOutlineHome />, text: "Accueil", to: "/" },
    { icon: <HiOutlineChartBar />, text: "Dashboard", to: "/dashboard" },
    { icon: <HiOutlineUpload />, text: "Chargement", to: "/chargement" },
    { icon: <HiOutlineUsers />, text: "Utilisateurs", to: "/users" },
    {
      icon: <HiOutlineBars4 />,
      text: "Reporting",
      subItems: [
        {
          icon: <HiOutlineBars2 />,
          text: "Globale",
          to: "/reporting/transactions",
        },
        {
          icon: <HiOutlineBars2 />,
          text: "Agrégées",
          to: "/reporting/transactions-agrege",
        },
        {
          icon: <HiOutlineBars2 />,
          text: "Détaillé",
          subItems: [
            {
              icon: <HiOutlineBars2 />,
              text: "Par région",
              to: "/reporting/detail/region",
            },
            {
              icon: <HiOutlineBars2 />,

              text: "Par produit",
              to: "/reporting/detail/produit",
            },
          ],
        },
      ],
    },
  ];

  return (
    <StyledSidebar>
      <Logo />
      <MainNav items={navItems} />
    </StyledSidebar>
  );
}

export default Sidebar;
