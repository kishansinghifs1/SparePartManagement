import { useState } from "react";

// Helper: Format date as YYYY-MM-DD
const formatDate = (date) =>
  date.toISOString().split("T")[0];

// Helper: Convert array of objects to CSV string
const toCSV = (data) => {
  if (!data.length) return "";

  const headers = Object.keys(data[0]);
  const rows = data.map((row) =>
    headers.map((field) => `"${row[field]}"`).join(",")
  );
  return [headers.join(","), ...rows].join("\n");
};

// Dummy data for spare part usage logs
// Each item has: productId, description, timestamp (ISO string)
const usageData = [
  { productId: "P001", description: "Used in machine A", timestamp: "2025-05-20T10:00:00Z" },
  { productId: "P002", description: "Used in machine B", timestamp: "2025-05-18T15:30:00Z" },
  { productId: "P001", description: "Used in machine C", timestamp: "2025-05-10T08:45:00Z" },
  { productId: "P003", description: "Maintenance", timestamp: "2025-04-22T11:00:00Z" },
  { productId: "P001", description: "Used in machine A", timestamp: "2025-03-05T09:00:00Z" },
  { productId: "P002", description: "Used in machine B", timestamp: "2024-12-30T16:00:00Z" },
];

// Group usage by time period
function groupUsage(data, period) {
  const grouped = {};

  data.forEach(({ productId, description, timestamp }) => {
    const date = new Date(timestamp);

    let key;
    if (period === "weekly") {
      // Get year and ISO week number
      const onejan = new Date(date.getFullYear(), 0, 1);
      const dayOfYear = Math.floor((date - onejan) / (24 * 60 * 60 * 1000)) + 1;
      const weekNum = Math.ceil(dayOfYear / 7);
      key = `${date.getFullYear()}-W${weekNum.toString().padStart(2, "0")}`;
    } else if (period === "monthly") {
      key = `${date.getFullYear()}-${(date.getMonth() + 1).toString().padStart(2, "0")}`;
    } else if (period === "yearly") {
      key = `${date.getFullYear()}`;
    }

    if (!grouped[key]) grouped[key] = [];

    grouped[key].push({
      productId,
      description,
      timestamp: formatDate(date),
    });
  });

  return grouped;
}

const AllParts = () => {
  const [period, setPeriod] = useState("monthly"); // default period

  const groupedData = groupUsage(usageData, period);

  // Flatten grouped data for CSV export (include group key)
  const flattenedForCSV = Object.entries(groupedData).flatMap(
    ([group, entries]) =>
      entries.map((entry) => ({
        period: group,
        ...entry,
      }))
  );

  // Download CSV helper
  const downloadCSV = () => {
    const csv = toCSV(flattenedForCSV);
    const blob = new Blob([csv], { type: "text/csv" });
    const url = URL.createObjectURL(blob);

    const a = document.createElement("a");
    a.href = url;
    a.download = `spare_parts_usage_${period}.csv`;
    a.click();

    URL.revokeObjectURL(url);
  };

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <h1 className="text-3xl font-bold mb-6">View Spare Parts Usage</h1>

      <div className="mb-6 flex gap-4">
        <button
          className={`px-4 py-2 rounded ${
            period === "weekly" ? "bg-blue-600 text-white" : "bg-gray-300"
          }`}
          onClick={() => setPeriod("weekly")}
        >
          Weekly
        </button>
        <button
          className={`px-4 py-2 rounded ${
            period === "monthly" ? "bg-blue-600 text-white" : "bg-gray-300"
          }`}
          onClick={() => setPeriod("monthly")}
        >
          Monthly
        </button>
        <button
          className={`px-4 py-2 rounded ${
            period === "yearly" ? "bg-blue-600 text-white" : "bg-gray-300"
          }`}
          onClick={() => setPeriod("yearly")}
        >
          Yearly
        </button>
      </div>

      <button
        onClick={downloadCSV}
        className="mb-6 bg-green-600 text-white px-4 py-2 rounded hover:bg-green-500"
      >
        Export CSV
      </button>

      {/* Display grouped data */}
      {Object.entries(groupedData).map(([group, entries]) => (
        <div key={group} className="mb-8">
          <h2 className="text-xl font-semibold mb-2">{group}</h2>
          <table className="w-full border-collapse border border-gray-300">
            <thead>
              <tr className="bg-gray-200">
                <th className="border border-gray-300 px-3 py-1 text-left">Product ID</th>
                <th className="border border-gray-300 px-3 py-1 text-left">Description</th>
                <th className="border border-gray-300 px-3 py-1 text-left">Date</th>
              </tr>
            </thead>
            <tbody>
              {entries.map(({ productId, description, timestamp }, idx) => (
                <tr key={idx} className="odd:bg-white even:bg-gray-50">
                  <td className="border border-gray-300 px-3 py-1">{productId}</td>
                  <td className="border border-gray-300 px-3 py-1">{description}</td>
                  <td className="border border-gray-300 px-3 py-1">{timestamp}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ))}
    </div>
  );
};

export default AllParts;
