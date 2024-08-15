import React from "react";
import styled from "styled-components";
import { NavLink } from "react-router-dom";
import {
  HiOutlineCog6Tooth,
  HiOutlineHome,
  HiOutlineLockOpen,
  HiOutlineUsers,
} from "react-icons/hi2";
import SubNav from "./SubNav";

const NavList = styled.ul`
  display: flex;
  flex-direction: column;
  gap: 0.8rem;
`;

const StyledNavItem = styled.li`
  list-style: none;
`;

const StyledNavLink = styled(NavLink)`
  display: flex;
  align-items: center;
  gap: 1.2rem;
  color: var(--color-grey-600);
  font-size: 1.6rem;
  font-weight: 500;
  padding: 1.2rem 2.4rem;
  text-decoration: none;
  transition: all 0.3s;

  &:hover,
  &.active {
    color: var(--color-grey-800);
    background-color: var(--color-grey-100);
    border-radius: 12px;
  }

  svg {
    width: 2.4rem;
    height: 2.4rem;
    color: var(--color-grey-400);
    transition: all 0.3s;
  }

  &:hover svg,
  &.active svg {
    color: var(--color-brand-600);
  }
`;

interface NavItemProps {
  icon: React.ReactNode;
  text: string;
  to?: string;
  subItems?: SubNavItem[];
}

interface SubNavItem {
  to: string;
  icon: React.ReactNode;
  text: string;
}

function NavItem({ icon, text, to, subItems }: NavItemProps) {
  if (subItems) {
    return (
      <StyledNavItem>
        <SubNav mainIcon={icon} mainText={text} items={subItems} />
      </StyledNavItem>
    );
  }

  return (
    <StyledNavItem>
      <StyledNavLink to={to!}>
        {icon}
        <span>{text}</span>
      </StyledNavLink>
    </StyledNavItem>
  );
}

function MainNav() {
  const navItems: NavItemProps[] = [
    { icon: <HiOutlineHome />, text: "Home", to: "/" },
    { icon: <HiOutlineUsers />, text: "Users", to: "/users" },
    {
      icon: <HiOutlineCog6Tooth />,
      text: "Settings",
      subItems: [
        {
          to: "/settings/settings-permissions",
          icon: <HiOutlineLockOpen />,
          text: "Permissions",
        },
      ],
    },
  ];

  return (
    <nav>
      <NavList>
        {navItems.map((item, index) => (
          <NavItem key={index} {...item} />
        ))}
      </NavList>
    </nav>
  );
}

export default MainNav;
