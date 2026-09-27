import React from "react";
import { IoIosLogOut } from "react-icons/io";
import useLogout from "../../hooks/useLogout";
const LogoutBtn = () => {
  const { loading, logOut } = useLogout();
  return (
    <button
      className="flex items-center sm:btn btn-primary "
      onClick={() => logOut()}
    >
      {loading ? (
        <span className="loading loading-spinner"/>
      ) : (
        <>
          <h3 className="font-bold text-white hidden sm:inline">Logout</h3>
          <IoIosLogOut className="ml-1 text-white text-2xl" />
        </>
      )}
    </button>
  );
};

export default LogoutBtn;
