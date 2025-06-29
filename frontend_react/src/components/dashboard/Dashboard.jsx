import React, { useEffect } from "react";
import axios from "axios";
import axiosInstance from "../../axiosInstance";

const Dashboard = () => {
  useEffect(() => {
    const fetchProtectedData = async () => {
      try {
        const response = await axiosInstance.get("/protected-view/");
      } catch (error) {}
    };
    fetchProtectedData();
  }, []);
  return (
    <>
      <div className="bg-slate-500">Dashboard</div>
    </>
  );
};

export default Dashboard;
