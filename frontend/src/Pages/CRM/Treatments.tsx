import useFetch from "@/hooks/useFetch";
import { ResponseData } from "@/types/Common";
import { Treatment } from "@/types/Treatments";
import { FC } from "react";

const Treatments: FC = (): JSX.Element => {
  const { data: treatments } =
    useFetch<ResponseData<Treatment[]>>("/treatments");

  return (
    <div>
      <pre>{JSON.stringify(treatments?.data, null, 2)}</pre>
    </div>
  );
};

export default Treatments;
