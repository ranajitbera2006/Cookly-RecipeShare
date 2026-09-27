import React, { useState } from "react";
import { FaUserCircle } from "react-icons/fa";
import { RiLockPasswordFill } from "react-icons/ri";
import { MdEmail } from "react-icons/md";
import { Link, useNavigate } from "react-router-dom";
import useSignUp from "../../hooks/useSignUp";
import toast from "react-hot-toast";

const SignUp = () => {
  const { loading, signUp } = useSignUp();
  const [fullname, setFullname] = useState("");
  const [email, setEmail] = useState("");
  const [gender, setGender] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [openMenu, setOpenMenu] = useState(false);
  const navigate = useNavigate();

  const handleGenderChange = (selectedGender) => {
    setGender(selectedGender);
    setOpenMenu(false);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const success = await signUp({
      fullname,
      email,
      gender,
      password,
      confirmPassword,
    });
    if (success) {
      setFullname("")
      setEmail("");
      setGender("");
      setPassword("");
      setConfirmPassword("");
      toast.success("You account created successfully!");
      navigate("/login");
    }
  };

  return (
    <div className="gradient-background min-h-screen ">
      <div className="min-h-screen flex justify-center items-center">
        <form onSubmit={handleSubmit}>
          <div className=" p-5 rounded-2xl space-y-4 shadow-mauve-950 shadow-xl">
            <div className="pt-7">
              <h1 className="text-center font-bold text-2xl">
                Welcome to InkOrbit
              </h1>
              <h1 className="text-center font-bold text-2xl text-primary-dark">
                Sign Up
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
                placeholder="Enter fullname..."
                required
                className="w-full px-2 focus:outline-none"
              />
            </div>
            <div className="border w-full max-w-md flex justify-between rounded-xl">
              <button
                disabled
                className="bg-primary-dark text-white px-3 py-2 rounded-l-xl "
              >
                <MdEmail className="w-5 h-5" />
              </button>
              <input
                onChange={(e) => setEmail(e.target.value)}
                value={email}
                name="email"
                id="email"
                type="email"
                placeholder="Enter username or email..."
                required
                className="w-full px-2 focus:outline-none"
              />
            </div>
            <div className="border w-full max-w-md flex justify-between  rounded-xl relative items-center px-2">
              <span className="text-gray-500 text-sm">
                Gender:{" "}
                <span className="text-white capitalize">
                  {gender || "Not selected"}
                </span>
              </span>

              <button
                type="button"
                className="btn btn-sm m-1"
                onClick={() => setOpenMenu((prev) => !prev)}
              >
                {gender ? gender.toUpperCase() : "Select"} ⬇️
              </button>
              {openMenu && (
                <ul className="absolute right-0 top-full mt-1 w-36 rounded-box bg-base-100 p-2 shadow-lg border z-50">
                  <li>
                    <button
                      type="button"
                      className="w-full text-left px-3 py-2 hover:bg-background rounded"
                      onClick={() => handleGenderChange("male")}
                    >
                      Male
                    </button>
                  </li>

                  <li>
                    <button
                      type="button"
                      className="w-full text-left px-3 py-2 hover:bg-background rounded"
                      onClick={() => handleGenderChange("female")}
                    >
                      Female
                    </button>
                  </li>

                  <li>
                    <button
                      type="button"
                      className="w-full text-left px-3 py-2 hover:bg-background rounded"
                      onClick={() => handleGenderChange("other")}
                    >
                      Others
                    </button>
                  </li>
                </ul>
              )}
            </div>
            <div className="border w-full max-w-md flex justify-between rounded-xl">
              <button
                disabled
                className="bg-primary-dark text-white px-3 py-2 rounded-l-xl "
              >
                <RiLockPasswordFill className="w-5 h-5" />
              </button>
              <input
                onChange={(e) => setPassword(e.target.value)}
                value={password}
                type="password"
                name="password"
                id="password"
                placeholder="Create a new password..."
                required
                className="w-full px-2 focus:outline-none"
              />
            </div>
            <div className="border w-full max-w-md flex justify-between rounded-xl">
              <button
                disabled
                className="bg-primary-dark text-white px-3 py-2 rounded-l-xl "
              >
                <RiLockPasswordFill className="w-5 h-5" />
              </button>
              <input
                onChange={(e) => setConfirmPassword(e.target.value)}
                value={confirmPassword}
                type="password"
                name="confirmPassword"
                id="confirmPassword"
                placeholder="Confirm Your password..."
                required
                className="w-full px-2 focus:outline-none"
              />
            </div>
            <div className="text-center">
              <button type="submit" className="btn btn-success">
                {loading ? (
                  <span className="loading loading-spinner" />
                ) : (
                  "Signup"
                )}
              </button>
            </div>
            <div>
              <p>
                Already have an account ?{" "}
                <Link to="/login" className="hover:underline text-primary">
                  Log in
                </Link>
              </p>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default SignUp;
