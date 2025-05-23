import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { FaUserCircle } from "react-icons/fa"; // Avatar icon

const Hero = () => {
  const navigate = useNavigate();

  const [user] = useState({
    name: "John Doe",
    email: "john@example.com",
    role: "admin",
  });

  const [showDropdown, setShowDropdown] = useState(false);
  const [showAddForm, setShowAddForm] = useState(false);
  const [showUseForm, setShowUseForm] = useState(false);

  const [addForm, setAddForm] = useState({
    title: "",
    description: "",
    category: "",
    productId: "",
  });

  const [useForm, setUseForm] = useState({
    productId: "",
    description: "",
    timestamp: new Date().toLocaleString(),
  });

  const handleAddSubmit = (e) => {
    e.preventDefault();
    console.log("Add Spare Part:", addForm);
    setShowAddForm(false);
  };

  const handleUseSubmit = (e) => {
    e.preventDefault();
    console.log("Use Spare Part:", useForm);
    setShowUseForm(false);
  };

  return (
    <div className="min-h-screen bg-gray-50 text-gray-900">
      {/* Header */}
      <header className="flex justify-between items-center px-8 py-6 bg-gradient-to-r from-gray-800 via-gray-900 to-black text-white shadow-lg relative z-50">
        <h2 className="text-2xl font-bold">Hi, {user.name} 👋</h2>

        <div className="relative">
          <div
            onClick={() => setShowDropdown(!showDropdown)}
            className="cursor-pointer text-white text-4xl"
          >
            <FaUserCircle />
          </div>

          {showDropdown && (
            <div className="absolute right-0 mt-2 w-56 bg-white text-gray-800 rounded shadow-lg p-4 text-sm">
              <p><strong>Name:</strong> {user.name}</p>
              <p><strong>Email:</strong> {user.email}</p>
              <p><strong>Role:</strong> {user.role}</p>
              <button
                className="mt-3 w-full bg-red-600 text-white py-1 rounded hover:bg-red-500 transition"
                onClick={() => navigate("/")}
              >
                Logout
              </button>
            </div>
          )}
        </div>
      </header>

      {/* Main Buttons */}
      <main className="flex flex-col items-center justify-center px-4 py-16 space-y-6 text-center">
        <h1 className="text-4xl font-extrabold mb-6">Spare Part Actions</h1>
        <div className="flex flex-col sm:flex-row gap-4">
          <button
            className="bg-green-600 hover:bg-green-500 text-white px-6 py-3 rounded-lg text-lg transition"
            onClick={() => setShowAddForm(true)}
          >
            ➕ Add Spare Part
          </button>
          <button
            className="bg-blue-600 hover:bg-blue-500 text-white px-6 py-3 rounded-lg text-lg transition"
            onClick={() => {
              setUseForm((prev) => ({ ...prev, timestamp: new Date().toLocaleString() }));
              setShowUseForm(true);
            }}
          >
            🛠️ Use Spare Part
          </button>
          <button
            className="bg-gray-800 hover:bg-gray-700 text-white px-6 py-3 rounded-lg text-lg transition"
            onClick={() => navigate("/all-parts")}
          >
            📋 View All Parts
          </button>
        </div>
      </main>

      {/* Add Spare Part Modal */}
      {showAddForm && (
        <div className="fixed inset-0 bg-black/20 backdrop-blur-sm flex justify-center items-center z-50">
          <div className="bg-white p-6 rounded shadow-lg w-[90%] max-w-md space-y-4">
            <h3 className="text-xl font-semibold text-center">Add Spare Part</h3>
            <form onSubmit={handleAddSubmit} className="space-y-3">
              <input
                type="text"
                placeholder="Title"
                value={addForm.title}
                onChange={(e) => setAddForm({ ...addForm, title: e.target.value })}
                required
                className="w-full border px-3 py-2 rounded"
              />
              <input
                type="text"
                placeholder="Category"
                value={addForm.category}
                onChange={(e) => setAddForm({ ...addForm, category: e.target.value })}
                required
                className="w-full border px-3 py-2 rounded"
              />
              <textarea
                placeholder="Description"
                value={addForm.description}
                onChange={(e) => setAddForm({ ...addForm, description: e.target.value })}
                required
                className="w-full border px-3 py-2 rounded"
              />
              <input
                type="text"
                placeholder="Product ID"
                value={addForm.productId}
                onChange={(e) => setAddForm({ ...addForm, productId: e.target.value })}
                required
                className="w-full border px-3 py-2 rounded"
              />
              <div className="flex justify-between pt-2">
                <button type="submit" className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-500">Submit</button>
                <button onClick={() => setShowAddForm(false)} type="button" className="bg-gray-300 text-gray-800 px-4 py-2 rounded">Cancel</button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Use Spare Part Modal */}
      {showUseForm && (
        <div className="fixed inset-0 bg-black/20 backdrop-blur-sm flex justify-center items-center z-50">
          <div className="bg-white p-6 rounded shadow-lg w-[90%] max-w-md space-y-4">
            <h3 className="text-xl font-semibold text-center">Use Spare Part</h3>
            <form onSubmit={handleUseSubmit} className="space-y-3">
              <input
                type="text"
                placeholder="Product ID"
                value={useForm.productId}
                onChange={(e) => setUseForm({ ...useForm, productId: e.target.value })}
                required
                className="w-full border px-3 py-2 rounded"
              />
              <textarea
                placeholder="Usage Description"
                value={useForm.description}
                onChange={(e) => setUseForm({ ...useForm, description: e.target.value })}
                required
                className="w-full border px-3 py-2 rounded"
              />
              <p className="text-xs text-gray-500">Time: {useForm.timestamp}</p>
              <div className="flex justify-between pt-2">
                <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-500">Submit</button>
                <button onClick={() => setShowUseForm(false)} type="button" className="bg-gray-300 text-gray-800 px-4 py-2 rounded">Cancel</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default Hero;
