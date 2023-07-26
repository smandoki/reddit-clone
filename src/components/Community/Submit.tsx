import { useSearchParams } from "react-router-dom";

type Props = {};

function Submit({}: Props) {
  const [urlSearchParams] = useSearchParams();
  console.log(urlSearchParams);

  return <div>submit</div>;
}

export default Submit;
