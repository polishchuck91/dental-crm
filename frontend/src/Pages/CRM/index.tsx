import { FC } from "react";
import useAuthStore from "../../store/useAuthStore";

const CRM: FC = () => {
  const state = useAuthStore((state) => state);

  return (
    <div className="container">
      <pre>{JSON.stringify(state, null, 2)}</pre>
    </div>
  );
};

export default CRM;
