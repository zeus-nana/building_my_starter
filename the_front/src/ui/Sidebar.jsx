import styled from 'styled-components';
import Logo from './Logo.jsx';
import { HiOutlineBars4, HiOutlineHome, HiOutlineLockClosed, HiOutlineUsers } from 'react-icons/hi2';
import { HiOutlineChartBar, HiOutlineUpload } from 'react-icons/hi';
import MainNav from './MultiLevelNav.jsx';

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
    { icon: <HiOutlineHome />, text: 'Accueil', to: '/' },
    { icon: <HiOutlineChartBar />, text: 'Dashboard', to: '/dashboard' },
    { icon: <HiOutlineUpload />, text: 'Chargement', to: '/chargement' },
    {
      icon: <HiOutlineBars4 />,
      text: 'Reporting',
      subItems: [
        { text: 'Globale', to: '/reporting/transactions' },
        { text: 'Agrégées', to: '/reporting/transactions-agrege' },
      ],
    },
    { icon: <HiOutlineUsers />, text: 'Utilisateurs', to: '/users' },
    {
      icon: <HiOutlineLockClosed />,
      text: 'Habilitation',
      subItems: [
        { text: 'Fonctions', to: '/habilitation/fonctions' },
        { text: 'Menus', to: '/habilitation/menus' },
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
