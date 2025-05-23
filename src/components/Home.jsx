import { useNavigate } from "react-router-dom";
import { Wrench } from "lucide-react";

const Home = () => {
  const navigate = useNavigate();

  return (
    <div className="relative min-h-screen bg-gray-50 text-gray-900">
      {/* Header */}
      <header className="fixed top-0 left-0 w-full bg-gradient-to-r from-gray-800 via-gray-900 to-black text-white py-6 px-10 shadow-lg z-50">
        <div className="flex items-center space-x-4">
          <Wrench className="w-8 h-8 text-yellow-400" />
          <h1 className="text-2xl font-bold tracking-wide">
            Spare Part Management
          </h1>
        </div>
      </header>

      {/* Main Content */}
      <main className="pt-28 px-4 flex flex-col items-center justify-center h-[calc(100vh-112px-96px)] text-center">
        <h1 className="text-4xl font-extrabold mb-3 text-gray-800">
          Welcome to Spare Part Management
        </h1>
        <p className="text-lg max-w-xl mb-8 text-gray-600">
          Efficiently manage your inventory, track parts, and streamline operations <br/> all in one place.
        </p>
        <div className="flex space-x-4">
          <button
            onClick={() => navigate("/signin")}
            className="bg-gray-900 text-white px-6 py-3 rounded-lg hover:bg-gray-700 transition text-base font-medium"
          >
            Sign In
          </button>
          <button
            onClick={() => navigate("/signup")}
            className="bg-gray-900 text-white px-6 py-3 rounded-lg hover:bg-gray-700 transition text-base font-medium"
          >
            Sign Up
          </button>
        </div>
      </main>

      {/* Footer */}
      <footer className="fixed bottom-0 left-0 w-full bg-gray-900 text-gray-300 py-6 shadow-inner z-50 border-t border-gray-700">
        <div className="text-center">
          <p className="text-sm uppercase tracking-widest text-gray-400 mb-1">
            Built and Produced By
          </p>
          <h2 className="text-xl font-bold text-white">CodeKnightxDevs 🚀</h2>
        </div>
      </footer>
    </div>
  );
};

export default Home;
