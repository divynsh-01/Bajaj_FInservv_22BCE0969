// App.jsx
import React, { useState } from "react";

function App() {
  const [input, setInput] = useState("");
  const [result, setResult] = useState(null);
  const [error, setError] = useState(null);

  const handleSubmit = async () => {
    try {
      setError(null);
      setResult(null);

      // Convert user input string -> array
      let dataArray;
      try {
        dataArray = JSON.parse(input);
        if (!Array.isArray(dataArray)) throw new Error();
      } catch {
        setError("Input must be a valid JSON array.");
        return;
      }

      const response = await fetch("http://localhost:3000/bfhl", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ data: dataArray }),
      });

      const json = await response.json();

      if (!response.ok) throw new Error(json.error?.message || "API error");

      setResult(json);
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center bg-gray-100 p-6">
      <h1 className="text-3xl font-bold mb-4 text-blue-600">
        Data Processing App 🚀
      </h1>

      <textarea
        className="w-96 h-24 border rounded-lg p-2 shadow-sm focus:ring-2 focus:ring-blue-400"
        placeholder='Enter array like ["A", "b", "3", "7", "$"]'
        value={input}
        onChange={(e) => setInput(e.target.value)}
      />

      <button
        className="mt-4 px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 shadow-md"
        onClick={handleSubmit}
      >
        Submit
      </button>

      {error && (
        <p className="mt-4 text-red-600 font-medium bg-red-100 px-4 py-2 rounded">
          {error}
        </p>
      )}

      {result && (
        <div className="mt-6 w-full max-w-xl bg-white shadow-lg rounded-2xl p-6">
          <h2 className="text-xl font-semibold mb-3 text-gray-700">
            ✅ Processed Data
          </h2>
          <div className="grid grid-cols-2 gap-4 text-sm">
            <div>
              <p className="font-medium">Odd Numbers:</p>
              <p className="text-gray-600">{result.odd_numbers.join(", ") || "-"}</p>
            </div>
            <div>
              <p className="font-medium">Even Numbers:</p>
              <p className="text-gray-600">{result.even_numbers.join(", ") || "-"}</p>
            </div>
            <div>
              <p className="font-medium">Alphabets:</p>
              <p className="text-gray-600">{result.alphabets.join(", ") || "-"}</p>
            </div>
            <div>
              <p className="font-medium">Special Chars:</p>
              <p className="text-gray-600">{result.special_characters.join(", ") || "-"}</p>
            </div>
            <div>
              <p className="font-medium">Sum:</p>
              <p className="text-gray-600">{result.sum}</p>
            </div>
            <div>
              <p className="font-medium">Concat String:</p>
              <p className="text-gray-600">{result.concat_string}</p>
            </div>
          </div>

          <div className="mt-4 text-xs text-gray-500">
            <p>User ID: {result.user_id}</p>
            <p>Email: {result.email}</p>
            <p>Roll: {result.roll_number}</p>
          </div>
        </div>
      )}
    </div>
  );
}

export default App;
