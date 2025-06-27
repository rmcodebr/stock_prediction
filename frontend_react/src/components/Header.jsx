import React, { useState } from "react";
import Button from "./Button";

const Header = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  return (
    <>
      <nav className="bg-white border-b border-gray-200 px-4 py-4 text-slate-900">
        <div className="flex items-center justify-between max-w-7xl mx-auto">
          <img className="h-10 w-auto" src="/images/rmclogo.png" alt="" />
          <div className="text-xl text-center font-semibold text-gray-800">
            Stock Prediction
          </div>
          <div className="flex flex-col text-xs text-center space-y-1">
            <Button text="Register" class="bg-slate-500" />
            <Button text="Login" class="bg-slate-400" />
          </div>
        </div>
      </nav>
    </>
  );
};

export default Header;
