import { NavLink, NavLinkProps } from "react-router";
import { twMerge } from "tailwind-merge";

const NavbarLink = (props: NavLinkProps) => {
  return (
    <NavLink
      {...props}
      className={({ isActive }) =>
        twMerge(
          "text-gray-500 transition-colors hover:text-blue-500",
          isActive && "font-bold text-blue-600",
        )
      }
    >
      {props.children}
    </NavLink>
  );
};

export default NavbarLink;
