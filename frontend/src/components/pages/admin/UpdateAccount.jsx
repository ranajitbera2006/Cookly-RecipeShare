import React, { useState } from "react";
import { FaUserCircle } from "react-icons/fa";
import useUpdateAccount from "../../../hooks/useUpdateAccount";

const UpdateAccount = () => {
  const { loading, updateAccount } = useUpdateAccount();
  const [fullname, setFullname] = useState("");
  const handleSubmit = async (e) => {
    e.preventDefault();
    await updateAccount({ fullname });
    setFullname("")
  };
  return (
    <div className=" flex justify-center items-center">
      <form onSubmit={handleSubmit}>
        <div className=" p-5 rounded-2xl space-y-4 shadow-mauve-950 shadow-xl">
          <div className="pt-7">
            <h1 className="text-center font-bold text-2xl">
              Hello<span className="text-4xl">👋</span>
            </h1>
            <h1 className="text-center font-bold text-2xl text-primary-dark">
              Update Your Name
            </h1>
          </div>

          <div className="border w-full max-w-md flex justify-between rounded-xl">
            <button
              disabled
              className="bg-primary-dark text-white px-3 py-2 rounded-l-xl "
            >
              <FaUserCircle className="w-5 h-5" />
            </button>
            <input
              onChange={(e) => setFullname(e.target.value)}
              value={fullname}
              name="fullname"
              id="fullname"
              type="text"
              placeholder="Update Your fullname..."
              required
              className="w-full px-2 focus:outline-none"
            />
          </div>
          <div className="text-center">
            <button type="submit" className="btn btn-primary">
              {loading ? (
                <span className="loading loading-spinner" />
              ) : (
                "Update"
              )}
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default UpdateAccount;
