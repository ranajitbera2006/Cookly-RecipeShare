import React, { useState } from "react";
import { FaUserCircle } from "react-icons/fa";
import { RiLockPasswordFill } from "react-icons/ri";
import { Link, useNavigate } from "react-router-dom";
import useLogin from "../../hooks/useLogin";
import toast from "react-hot-toast";
const Login = () => {
  const { loading, logIn } = useLogin();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const handleSubmit = async (e) => {
    e.preventDefault();
    const success = await logIn({ email, password });
    if (success) {
      setEmail("");
      setPassword("");
      toast.success("Login successfully!");
      navigate("/blog/:id");
    }
  };
  return (
    <div className="gradient-background min-h-screen ">
      <div className="min-h-screen flex justify-center items-center">
        <form onSubmit={handleSubmit}>
          <div className=" p-5 rounded-2xl space-y-4 shadow-mauve-950 shadow-xl">
            <div className="pt-7">
              <h1 className="text-center font-bold text-2xl">Welcome back</h1>
              <h1 className="text-center font-bold text-2xl text-primary-dark">
                Log In
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
                onChange={(e) => setEmail(e.target.value)}
                value={email}
                name="email"
                id="email"
                type="text"
                placeholder="Enter username or email..."
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
                onChange={(e) => setPassword(e.target.value)}
                value={password}
                type="password"
                name="password"
                id="password"
                placeholder="Enter Your password..."
                required
                className="w-full px-2 focus:outline-none"
              />
            </div>
            <div className="text-center">
              <button
                type="submit"
                className="btn btn-primary"
              >
                {loading ? (
                  <span className="loading loading-spinner" />
                ) : (
                  "Login"
                )}
              </button>
            </div>
            <div>
              <p>
                New here ?{" "}
                <Link to="/signup" className="hover:underline text-primary">
                  Sign up
                </Link>
              </p>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
