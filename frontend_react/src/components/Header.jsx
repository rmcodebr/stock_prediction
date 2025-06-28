import React, { useState } from "react";
import Button from "./Button";
import { Link } from "react-router-dom";

const Header = () => {
  const [menuOpen, setMenuOpen] = useState(false);
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
          <div className="flex flex-col text-xs text-center space-y-1">
            <Button text="Register" class="bg-slate-500" url="/register" />
            <Button text="Login" class="bg-slate-400" url="/login" />
          </div>
        </div>
      </nav>
    </>
  );
};

export default Header;
