import React, { useContext, useState } from "react";
import axios from "axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSpinner } from "@fortawesome/free-solid-svg-icons";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../AuthProvider";

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { isLoggedIn, setIsLoggedIn } = useContext(AuthContext);

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    const userData = { username, password };

    try {
      const response = await axios.post(
        "http://localhost:8000/api/v1/token/",
        userData
      );
      setErrors({});
      localStorage.setItem("access_token", response.data.access);
      localStorage.setItem("refresh_token", response.data.refresh);
      setIsLoggedIn(true);
      navigate("/dashboard");
    } catch (error) {
      setErrors(error.response.data);
    } finally {
      setLoading(false);
    }
  };
  return (
    <>
      <div className="">
        <div className="flex flex-row justify-center">
          <div className="flex flex-col bg-slate-800 m-4 rounded p-2">
            <div className="flex justify-center mb-4">Login</div>
            <form onSubmit={handleLogin} className="p-4 space-y-2" action="">
              {/* Username */}
              <div className="flex flex-col">
                <input
                  className="p-1 bg-slate-100 text-black placeholder-gray-500 rounded"
                  type="text"
                  placeholder="Enter Username"
                  autoComplete="off"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                />
              </div>
              {errors.username && (
                <div className="text-red-600 bg-slate-500 mt-1 mb-2 rounded inline-block">
                  <div className="mx-1">{errors.username}</div>
                </div>
              )}

              {/* Password */}
              <div className="flex flex-col">
                <input
                  className="p-1 bg-slate-100 text-black placeholder-gray-500 rounded"
                  type="password"
                  placeholder="Enter Password"
                  autoComplete="off"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>
              {errors.password && (
                <div className="text-red-600 bg-slate-500 mt-1 mb-2 rounded inline-block">
                  <div className="mx-1">{errors.password}</div>
                </div>
              )}
              {errors.detail && (
                <div className="text-red-600 bg-slate-500 mt-1 mb-2 rounded inline-block">
                  <div className="mx-1">{errors.detail}</div>
                </div>
              )}

              {/* Submit button */}
              <div className="flex justify-center items-center mt-2">
                <button
                  className="bg-slate-500 px-4 py-1 rounded"
                  type="submit"
                >
                  {loading ? (
                    <>
                      <FontAwesomeIcon icon={faSpinner} spin className="mx-2" />
                      Logging in
                    </>
                  ) : (
                    "Login"
                  )}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default Login;
