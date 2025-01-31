import { FC } from "react";
import Navbar from "../../components/Navbar";
import { Outlet } from "react-router";

const CRM: FC = () => {
  return (
    <div>
      <Navbar />
      <div className="container mx-auto py-8">
        <Outlet />
      </div>
    </div>
  );
};

export default CRM;
