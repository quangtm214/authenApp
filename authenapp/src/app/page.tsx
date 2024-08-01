import Link from "next/link";

export default function Home() {
  return (
    <main className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="flex flex-col items-center justify-center p-6 bg-white shadow-md rounded-lg w-full max-w-md">
        <div className="text-center">
          <h1 className="text-4xl font-extrabold text-gray-900 mb-4">
            Welcome to AuthenApp
          </h1>
        </div>

        <div className="w-full">
          <ul className="space-y-4">
            <li>
              <Link
                href="/login"
                className="block text-center px-4 py-2 text-lg font-medium text-white bg-blue-500 rounded-md shadow hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
              >
                Login
              </Link>
            </li>
            <li>
              <Link
                href="/register"
                className="block text-center px-4 py-2 text-lg font-medium text-white bg-blue-500 rounded-md shadow hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
              >
                Register
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </main>
  );
}
