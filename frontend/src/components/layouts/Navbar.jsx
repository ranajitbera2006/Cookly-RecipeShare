import { useNavigate } from "react-router-dom";
import { useAuthContext } from "../../context/authContext";
import LogoutBtn from "../parts/LogoutBtn";
import LoginBtn from "../parts/LoginBtn";
import AdminBtn from "../parts/AdminBtn";
const Navbar = () => {
  const { authUser } = useAuthContext();
  const navigate = useNavigate();
  return (
    <header className="mb-25">
      <div
        className={`w-full fixed top-0 right-0 left-0 bg-background  z-20 py-5 `}
      >
        <div className="flex items-center justify-between px-2">
          <div
            className="flex items-center mr-2.5 cursor-pointer"
            onClick={() => navigate("/")}
          >
            <img
              src="/webLogo.png"
              alt="wedsitelogo"
              className="h-15 w-15"
            />
          </div>
          <div className="mr-2.5 flex space-x-2 sm:space-x-5">
            {authUser && <AdminBtn/>}
            {authUser ? <LogoutBtn /> : <LoginBtn />}

          </div>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
