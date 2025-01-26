import { FC } from "react";

import Logo from "../assets/logo.webp";
import { crmMenu } from "../routes";
import { Link } from "react-router";
import NavbarLink from "./NavbarLink";

const Navbar: FC = (): JSX.Element => {
  return (
    <div className="w-full">
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
          <button
            data-collapse-toggle="navbar-default"
            type="button"
            className="inline-flex h-10 w-10 items-center justify-center rounded-lg p-2 text-sm text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 md:hidden dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
            aria-controls="navbar-default"
            aria-expanded="false"
          >
            <span className="sr-only">Open main menu</span>
            <svg
              className="h-5 w-5"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 17 14"
            >
              <path
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M1 1h15M1 7h15M1 13h15"
              />
            </svg>
          </button>
          <div className="hidden w-full md:block md:w-auto" id="navbar-default">
            <ul className="mt-4 flex flex-col rounded-lg border border-gray-100 bg-gray-50 p-4 font-medium md:mt-0 md:flex-row md:space-x-8 md:border-0 md:bg-white md:p-0 rtl:space-x-reverse dark:border-gray-700 dark:bg-gray-800 md:dark:bg-gray-900">
              {crmMenu.map((item) => (
                <li key={item.path}>
                  <NavbarLink to={item.path} aria-current="page">
                    {item.label}
                  </NavbarLink>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </nav>
    </div>
  );
};

export default Navbar;
