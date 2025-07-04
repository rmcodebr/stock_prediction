import React, { useState } from "react";
import axios from "axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSpinner } from "@fortawesome/free-solid-svg-icons";

const Register = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [errors, setErrors] = useState({});
  const [success, setSuccess] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleRegistration = async (e) => {
    e.preventDefault();
    setLoading(true);

    const userData = {
      username,
      email,
      password,
      confirmPassword,
    };

    try {
      const response = await axios.post(
        "http://localhost:8000/api/v1/register/",
        userData
      );
      setErrors({});
      setSuccess(true);
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
            <div className="flex justify-center mb-4">Create an Account</div>
            <form
              onSubmit={handleRegistration}
              className="p-4 space-y-2"
              action=""
            >
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
                {errors.username && (
                  <div className="text-red-600 bg-slate-500 mt-1 mb-2 rounded inline-block">
                    <div className="mx-1">{errors.username}</div>
                  </div>
                )}
              </div>

              {/* Email */}
              <div className="flex flex-col">
                <input
                  className="p-1 bg-slate-100 text-black placeholder-gray-500 rounded"
                  type="email"
                  placeholder="Enter Email"
                  autoComplete="off"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
                {errors.email && (
                  <div className="text-red-600 bg-slate-500 mt-1 mb-2 rounded inline-block">
                    <div className="mx-1">{errors.email}</div>
                  </div>
                )}
              </div>

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
                {errors.password && (
                  <div className="text-red-600 bg-slate-500 mt-1 mb-2 rounded inline-block">
                    <div className="mx-1">{errors.password}</div>
                  </div>
                )}
              </div>

              {/* Confirm Password */}
              {/* <div className="flex flex-col">
                <input
                  className="p-1 bg-slate-100 text-black placeholder-gray-500 rounded"
                  type="password"
                  placeholder="Confirm Password"
                  autoComplete="off"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                />
              </div> */}

              {/* Success message */}
              {success && (
                <div className="text-blue-500 bg-slate-100 rounded inline-block">
                  <div className="mx-1">User registered successfully</div>
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
                      Please Wait
                    </>
                  ) : (
                    "Register"
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

export default Register;

Register;
