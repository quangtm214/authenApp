"use client";

import React, { useEffect, useState } from "react";
import { getPersonalData } from "@/service/authApi";
import Forbidden from "@/components/Forbidden ";

export default function Dashboard() {
  const [user, setUser] = useState({ fullName: "", username: "" });
  const [loading, setLoading] = useState(true);
  const [forbidden, setForbidden] = useState(false);

  const getInformation = async () => {
    const token = localStorage.getItem("jwt");
    if (!token) {
      setForbidden(true);
    } else {
      const response = await getPersonalData();
      console.log("response", response);
      if (response.status === "success") {
        setUser(response.data);
      }
    }
    setLoading(false);
  };

  useEffect(() => {
    getInformation();
  }, []);

  if (forbidden) {
    return <Forbidden />;
  }
  return (
    <main className="flex items-center justify-center min-h-screen bg-gray-50">
      <div className="flex flex-col items-center justify-center p-8 bg-white shadow-lg rounded-xl w-full max-w-md">
        <h2 className="text-4xl font-bold text-gray-800 mb-6 text-center">
          User Information
        </h2>
        <div className="w-full space-y-4">
          <div className="flex items-center justify-start">
            <h3 className="text-lg font-medium text-gray-700">Full Name:</h3>
            <span className="text-lg font-semibold text-gray-900  ml-10">
              {loading ? (
                <span className="block w-48 h-6 bg-gradient-to-br from-purple-600 to-blue-500 animate-pulse rounded"></span>
              ) : (
                user.fullName || "N/A"
              )}
            </span>
          </div>
          <div className="flex items-center justify-start">
            <h3 className="text-lg font-medium text-gray-700">Username:</h3>
            <span className="text-lg font-semibold text-gray-900 ml-10">
              {loading ? (
                <span className="block w-48 h-6 bg-gradient-to-r from-purple-500 to-pink-500   animate-pulse rounded"></span>
              ) : (
                user.username || "N/A"
              )}
            </span>
          </div>
        </div>
      </div>
    </main>
  );
}
