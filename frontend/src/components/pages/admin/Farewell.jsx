import { MdOutlineArrowBack } from "react-icons/md";
import { FaFaceSadTear } from "react-icons/fa6";
import { RiDeleteBin6Line } from "react-icons/ri";
import { Link, useNavigate } from "react-router-dom";
import useDeleteAccount from "../../../hooks/useDeleteAccount";
const Farewell = () => {
  const navigate = useNavigate()
  const { loading, deleteAccount } = useDeleteAccount();
  const onClickHandler = async () => {
    const isDeleted = await deleteAccount();
    if (isDeleted) {
      navigate("/");
    }
  };
  return (
    <div className=" flex justify-center items-center ">
      <div className=" p-5 rounded-2xl space-y-4 shadow-mauve-950 shadow-xl flex flex-col  items-center ">
        <div className="text-yellow-400 text-6xl ">
          <FaFaceSadTear />
        </div>
        <h1 className="text-center font-bold text-2xl">
          Are You sure
          <br />
          to delete your account?
        </h1>
        <div className="flex justify-between px-3 w-full">
          <button className="bg-green-600 px-3 py-1 rounded-2xl text-primary-foreground cursor-pointer hover:bg-green-700  ">
            <Link to="/" className="items-center flex">
              {<MdOutlineArrowBack />}Go to Home
            </Link>
          </button>
          <button
            onClick={onClickHandler}
            className="bg-red-600 px-3 py-1 rounded-2xl text-primary-foreground cursor-pointer hover:bg-red-700  "
            disabled={loading}
          >
            {loading ? (
              <span className="loading loading-spinner" />
            ) : (
              <span className="items-center flex">
                {<RiDeleteBin6Line />}Delete
              </span>
            )}
          </button>
        </div>
      </div>
    </div>
  );
};

export default Farewell;
