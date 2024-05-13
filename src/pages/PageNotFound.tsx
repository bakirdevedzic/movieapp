import { useNavigate } from "react-router-dom";
import Header from "../ui/Header";
import Button from "../ui/Button";

function PageNotFound() {
  const navigate = useNavigate();
  return (
    <div>
      <Header />
      <div className="flex flex-col gap-3 justify-center items-center h-screen">
        <div className="text-3xl font-bold font-outfit text-primary-black">
          Page Not Found
        </div>
        <Button text="Home" onClick={() => navigate("/")} />
      </div>
    </div>
  );
}

export default PageNotFound;
