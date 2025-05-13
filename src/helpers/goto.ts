import { useNavigate } from "react-router";

const useLogout = () => {
  const navigate = useNavigate();

  const goTo = (location: string) => {
    navigate(location);
  };

  return goTo;
};

export default useLogout;
