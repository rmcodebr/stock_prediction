import React, { useState, useContext } from "react";
import Button from "./Button";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../AuthProvider";

const Header = () => {
  const { isLoggedIn, setIsLoggedIn } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("access_token");
    localStorage.removeItem("refresh_token");
    setIsLoggedIn(false);
    navigate("/");
  };

  return (
    <>
      <nav className="bg-white border-b border-gray-200 px-4 py-4 text-slate-900">
        <div className="flex items-center justify-between max-w-7xl mx-auto">
          <Link to="/">
            <img className="h-10 w-auto" src="/images/rmclogo.png" alt="" />
          </Link>
          <div className="text-xl text-center font-semibold text-gray-800">
            Stock Prediction
          </div>

          {isLoggedIn ? (
            <>
              <div className="flex flex-col text-xs text-center space-y-1">
                <button
                  onClick={handleLogout}
                  className="border p-1 rounded cursor-pointer bg-slate-400"
                >
                  Logout
                </button>
                <Button
                  text="Dashboard"
                  class="bg-slate-500"
                  url="/dashboard"
                />
              </div>
            </>
          ) : (
            <>
              <div className="flex flex-col text-xs text-center space-y-1">
                <Button text="Register" class="bg-slate-500" url="/register" />
                <Button text="Login" class="bg-slate-400" url="/login" />
              </div>
            </>
          )}
        </div>
      </nav>
    </>
  );
};

export default Header;
