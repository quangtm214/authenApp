import React from "react";

export default function Forbidden() {
  return (
    <main className="flex items-center justify-center min-h-screen bg-gray-50">
      <div className="flex flex-col items-center justify-center p-8 bg-white  rounded-xl w-full max-w-md">
        <h2 className="text-4xl font-bold text-orange-600 mb-6 text-center">
          Sory!!! You Do not have permission to do this
        </h2>
      </div>
    </main>
  );
}
