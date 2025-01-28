import { FC } from "react";

import Logo from "../assets/logo.webp";
import { crmMenu } from "../routes";
import NavbarLink from "./NavbarLink";
import ExitIcon from "./icons/ExitIcon";
import useAuthStore from "../store/useAuthStore";

const Navbar: FC = (): JSX.Element => {
  const { userLogout } = useAuthStore();
  return (
    <div className="w-full shadow">
      <nav className="border-gray-800 bg-white dark:bg-gray-900">
        <div className="mx-auto flex max-w-screen-xl flex-wrap items-center justify-between p-4">
          <a href="/" className="flex flex-row items-center space-x-3">
            <img
              src={Logo}
              className="h-12 w-12 rounded-full"
              alt="Denatl HUB"
            />
            <h2 className="m-0 p-0 text-center text-2xl text-gray-800">
              <span className="font-medium">Dental</span>
              <span className="font-bold text-primary">HUB</span>
            </h2>
          </a>

          <div className="hidden w-full md:block md:w-auto" id="navbar-default">
            <ul className="flex flex-row items-center rounded-lg border border-gray-100 bg-gray-50 p-4 font-medium md:mt-0 md:flex-row md:space-x-8 md:border-0 md:bg-white md:p-0">
              {crmMenu.map((item) => (
                <li key={item.path}>
                  <NavbarLink to={item.path} aria-current="page">
                    {item.label}
                  </NavbarLink>
                </li>
              ))}
              <li>
                <button
                  type="button"
                  className="flex items-center rounded-lg bg-secondary px-4 py-2 text-white transition-colors hover:bg-secondary-dark"
                  onClick={() => userLogout()}
                >
                  <ExitIcon />
                  <span className="ml-2"> Вийти</span>
                </button>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </div>
  );
};

export default Navbar;
